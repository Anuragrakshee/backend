const express = require("express");
const Request = require("../models/Request");

const router = express.Router();

/* CREATE SERVICE REQUEST */
router.post("/", async (req, res) => {
  try {
    const { category_id, title, description } = req.body;

    if (!category_id || !title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const request = await Request.create({
      category: category_id,
      title,
      description
    });

    res.status(201).json({
      message: "Request created successfully",
      request
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* LIST OWN REQUESTS */
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find()
      .populate("category")
      .populate("assignedTo");

    res.json({ requests });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* VIEW REQUEST DETAILS */
router.get("/:id", async (req, res) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate("category")
      .populate("assignedTo");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json({ request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ASSIGN REQUEST TO STAFF */
router.put("/:id/assign", async (req, res) => {
  try {
    const { staffId } = req.body;

    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { assignedTo: staffId, status: "assigned" },
      { new: true }
    );

    res.json({
      message: "Request assigned",
      request
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* UPDATE REQUEST STATUS */
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      message: "Status updated",
      request
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* CANCEL REQUEST */
router.put("/:id/cancel", async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );

    res.json({
      message: "Request cancelled",
      request
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
