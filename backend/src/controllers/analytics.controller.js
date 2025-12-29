const Analytics = require("../models/analytics.model");
const Url = require("../models/url.model");
const { success, error } = require("../utils/response");

// Validate URL ownership
const validateUrlOwnership = async (req, urlId) => {
  return await Url.findOne({ _id: urlId, user: req.user.id });
};

// Total visits summary
exports.getSummary = async (req, res) => {
  try {
    const { id } = req.params;
    const url = await validateUrlOwnership(req, id);
    if (!url) return error(res, "URL not found or unauthorized", 404);
    if (url.isPrivate) return error(res, "Analytics disabled for private URLs", 403);


    const totalClicks = await Analytics.countDocuments({ url: id });
    return success(res, { totalClicks });
  } catch (err) {
    return error(res, err.message, 500);
  }
};

// Daily graph (visits per date)
exports.getDailyChart = async (req, res) => {
  try {
    const { id } = req.params;
    const url = await validateUrlOwnership(req, id);
    if (!url) return error(res, "URL not found or unauthorized", 404);
    if (url.isPrivate) return error(res, "Analytics disabled for private URLs", 403);


    const chart = await Analytics.aggregate([
      { $match: { url: url._id } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          clicks: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    return success(res, chart);
  } catch (err) {
    return error(res, err.message, 500);
  }
};

// Breakdown by device, country, browser
exports.getBreakdown = async (req, res) => {
  try {
    const { id } = req.params;
    const url = await validateUrlOwnership(req, id);
    if (!url) return error(res, "URL not found or unauthorized", 404);
    if (url.isPrivate) return error(res, "Analytics disabled for private URLs", 403);


    const breakdown = {};

    breakdown.byDevice = await Analytics.aggregate([
      { $match: { url: url._id } },
      { $group: { _id: "$device", count: { $sum: 1 } } }
    ]);

    breakdown.byCountry = await Analytics.aggregate([
      { $match: { url: url._id } },
      { $group: { _id: "$country", count: { $sum: 1 } } }
    ]);

    breakdown.byBrowser = await Analytics.aggregate([
      { $match: { url: url._id } },
      { $group: { _id: "$browser", count: { $sum: 1 } } }
    ]);

    return success(res, breakdown);
  } catch (err) {
    return error(res, err.message, 500);
  }
};
