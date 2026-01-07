const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// POST /categories - Create a new category
router.post('/categories', async (req, res) => {
  try {
    const { name, priority } = req.body;

    if (!name || !priority) {
      return res.status(400).json({ success: false, message: 'Name and priority are required' });
    }

    const category = new Category({ name, priority });
    await category.save();  // <-- No callback here

    res.status(201).json({ success: true, message: 'Category created successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// GET /categories - List all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();  // <-- No callback here

    const result = categories.map(cat => ({
      id: cat._id,
      name: cat.name,
      priority: cat.priority
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /categories/:id - Update a category by ID
router.put('/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, priority } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, priority },
      { new: true, runValidators: true }
    );  // <-- No callback here

    if (!updatedCategory) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.json({ success: true, message: 'Category updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
