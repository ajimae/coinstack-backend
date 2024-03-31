const config = {
  coingeckoBaseUrl: {
    doc: "Coingecko Base Url",
    format: "*",
    default: "https://api.coingecko.com/api/v3",
    env: "COINGECKO_BASE_URL",
    sensitive: false,
  },
  coingeckoKey: {
    doc: "Coingecko Api Key",
    format: "*",
    default: "",
    env: "COINGECKO_API_KEY",
    sensitive: true,
  },
};

exports.coingecko = config;
