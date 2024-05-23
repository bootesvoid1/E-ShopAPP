const Category = require('../models/category')
const router = require('express').Router()


router.post("/", async (req, res) => {
    const newCategory = new Category(req.body);
    try {

        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory._doc);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/find/:id", async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.put("/:id",async (req, res) => {
    try {
        const updateCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json(updateCategory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {

        await Category.findByIdAndDelete(req.params.id);

        res.status(200).json("Category has been deleted...");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router