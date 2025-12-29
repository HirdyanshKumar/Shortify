const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const { createShortUrl } = require("../controllers/url.controller");
const {
  createShortUrl,
  getMyUrls,
  getUrlDetails,
  deleteUrl,
  toggleUrlStatus,
  updateAlias,
  updatePrivacy
} = require("../controllers/url.controller");


router.post("/create", auth, createShortUrl);
router.get("/mine", auth, getMyUrls);
router.get("/:id", auth, getUrlDetails);
router.delete("/:id", auth, deleteUrl);
router.patch("/:id/toggle", auth, toggleUrlStatus);
router.patch("/:id/alias", auth, updateAlias);
router.patch("/:id/privacy", auth, updatePrivacy);


module.exports = router;
