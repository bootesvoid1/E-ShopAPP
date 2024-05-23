const Product = require('../models/product');
const router = require('express').Router();
const multer = require('multer');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// POST - Create a new product
router.post('/', upload.array('images', 5), async (req, res) => {
  const {
    id,
    category,
    name,
    ratings,
    reviewCount,
    discount,
    oriRate,
    disRate,
    feature,
    specification,
    colorVariant,
    price,
    manufacture_name,
    manufacture_brand,
  } = req.body;

  const images = req.files.map((file) => file.path);

  const newProduct = new Product({
    id,
    category,
    name,
    ratings,
    reviewCount,
    discount,
    oriRate,
    disRate,
    feature,
    specification,
    images,
    colorVariant,
    price,
    manufacture_name,
    manufacture_brand,
  });

  try {
    const savedProduct = await newProduct.save();
    console.log(savedProduct);
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Retrieve all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Retrieve a specific product by ID
router.get('/find/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - Update a product by ID
router.put('/:id', async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updateProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json('Product has been deleted...');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
