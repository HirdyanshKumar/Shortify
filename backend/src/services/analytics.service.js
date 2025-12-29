const Analytics = require("../models/analytics.model");
const UAParser = require("ua-parser-js");
const geoip = require("geoip-lite");

exports.logAnalytics = async (req, urlDoc) => {
  try {
    const ua = UAParser(req.headers["user-agent"]);
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const geo = geoip.lookup(ip);

    await Analytics.create({
      url: urlDoc._id,
      ip,
      userAgent: req.headers["user-agent"],
      referrer: req.headers.referer || null,
      country: geo?.country || null,
      device: ua.device?.type || "desktop",
      os: ua.os?.name,
      browser: ua.browser?.name,
    });
  } catch (err) {
    console.error("Analytics log failed", err);
  }
};
