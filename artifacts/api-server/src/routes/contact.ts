import { Router } from "express";

const router = Router();

router.post("/contact", async (req, res) => {
  try {
    const { name, company, email, country, message } = req.body;

    if (!name || !company || !email || !country || !message) {
      res.status(400).json({ success: false, error: "All fields are required" });
      return;
    }

    req.log.info({ name, company, email, country }, "Contact inquiry received");

    res.json({
      success: true,
      message: "Inquiry received. Our export team will contact you within 24 hours.",
    });
  } catch (err) {
    req.log.error({ err }, "Failed to process contact inquiry");
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export default router;
