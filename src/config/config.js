module.exports = {
  // web server config
  port: process.env.PORT || 4444,
  environment: process.env.NODE_ENV || "development",

  googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
  googleAnalyticsDomain: process.env.GOOGLE_ANALYTICS_DOMAIN,

  wordnikAPIKey: process.env.WORDNIK_API_KEY
};

