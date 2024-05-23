const Vendor = require('../models/vendor')
const router = require('express').Router()


router.post("/", async (req, res) => {
    const newVendor = new Vendor(req.body);
    try {

        const savedCategory = await newVendor.save();
        res.status(200).json(savedCategory._doc);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get("/", async (req, res) => {
    try {
        const vendors = await Vendor.find().sort({ createdAt: -1 });
        res.status(200).json(vendors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/find/:id", async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        res.status(200).json(vendor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.put("/:id",async (req, res) => {
    try {
        const updateVendor = await Vendor.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json(updateVendor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {

        await Vendor.findByIdAndDelete(req.params.id);

        res.status(200).json("Vendor has been deleted...");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router