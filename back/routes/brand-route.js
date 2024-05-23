const Brand = require('../models/brand')
const router = require('express').Router()


router.post("/", async (req, res) => {
    const newBrand = new Brand(req.body);
    try {

        const savedBrand = await newBrand.save();
        res.status(200).json(savedBrand._doc);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get("/", async (req, res) => {
    try {
        const brands = await Brand.find().sort({ createdAt: -1 });
        res.status(200).json(brands);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/find/:id", async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        res.status(200).json(brand);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.put("/:id",async (req, res) => {
    try {
        const updateBrand = await Brand.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json(updateBrand);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {

        await Brand.findByIdAndDelete(req.params.id);

        res.status(200).json("Brand has been deleted...");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router