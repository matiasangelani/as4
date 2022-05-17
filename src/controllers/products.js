const { Product, Image } = require('../db');
const { Op } = require('sequelize');

const postProduct = async (req, res) => {
  const { barcode, name, description, price, img } = req.body;

  try {
    const [product, created] = await Product.findOrCreate({
      where: { [Op.or]: [{ barcode }, { name }] },
      defaults: {
        barcode,
        name,
        description,
        price,
      },
    });

    if (!created) return res.json({ msg: 'Product already exists' });

    await Image.create({ img, productId: product.id });

    res.json({ msg: `Product '${name}' has been created successfully` });
  } catch (error) {
    res.json({ msg: 'Post product error' });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id, { include: [{ model: Image }] });

    if (!product) return res.json({ msg: 'Product not found' });

    res.json(product);
  } catch (error) {
    res.json({ msg: 'Get product error' });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: [{ model: Image }] });

    if (!products.length) return res.json({ msg: 'Products empty' });

    res.json(products);
  } catch (error) {
    res.json({ msg: 'Get products error' });
  }
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const { barcode, name, description, price, images } = req.body;

  try {
    const product = await Product.findByPk(id);
    console.log(product.toJSON());
    if (!product) return res.json({ msg: 'Product not found' });

    await product.update({ barcode, name, description, price });

    //const imagesDb = await Image

    res.json({
      msg: `Product '${product.name}' with barcode ${product.barcode} edited successfully`,
    });
  } catch (error) {
    res.json({ msg: 'Edit product error' });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) return res.json({ msg: 'Product not found' });

    await product.update({ active: false });

    res.json({
      msg: `Product '${product.name}' with barcode ${product.barcode} deleted successfully`,
    });
  } catch (error) {
    res.json({ msg: 'Delete product error' });
  }
};

module.exports = {
  postProduct,
  getProduct,
  getAllProducts,
  editProduct,
  deleteProduct,
};
