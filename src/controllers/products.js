const { Product, Image } = require('../db');
const { Op } = require('sequelize');

const postProduct = async (req, res) => {
  const { barcode, name, description, price, images } = req.body;

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

    images.map(
      async (img) => await Image.create({ img, productId: product.id })
    );

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
    const oldProduct = await Product.findByPk(id);

    if (!oldProduct) return res.json({ msg: 'Product not found' });

    await oldProduct.update({ barcode, name, description, price });

    const imagesDb = await Image.findAll({
      where: { productId: oldProduct.id },
    });

    await Promise.all(
      imagesDb.map(async (img, i) => {
        const { id } = img;
        const newImg = images[i];
        await Image.update({ img: newImg }, { where: { id } });

        return img;
      })
    );

    const product = await Product.findByPk(id, { include: [{ model: Image }] });

    res.json({
      msg: `Product '${product.name}' with barcode ${product.barcode} edited successfully`,
      product,
    });
  } catch (error) {
    res.json({ msg: 'Edit product error', error });
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
