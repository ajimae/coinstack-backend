/* eslint-disable max-len */
/* eslint-disable func-names */
import http from "http";
import axios from "axios";
import express from "express";
import socketIO from "socket.io";
import logger from "infra/logger";
import ticker from "../../../crypto-aggregator/examples/symbols";

(function () {
  const app = express();
  const svr = http.createServer(app);
  const server = svr.listen(process.env.PORT || 8086, () => {
    logger.info("Socket listening for messages");
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  const io = socketIO(server);

  io.on("connection", (socket) => {
    logger.info("Socket connected");
    socket.emit("market", "market data goes here");
    socket.on("disconnect", () => {
      logger.info("Socket disconnected");
    });
  });

  async function request() {
    // const {
    //   currency = "usd", orderBy = "market_cap_desc", sparkline = false, priceChangePerc = "7d", perPage = 10, page = 1,
    // } = {};

    // const url = "https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd";
    // const url = "https://production.api.coindesk.com/v2/tb/price/ticker?assets=all";
    // const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`;

    // await axios({
    //   // url,
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //   },
    // })
    //   .then((response) => {
    //     if (response.status === 200) {
    //       console.log(response.data[0].quotes.USD.price);
    //       io.emit("market", response.data);
    //     } else {
    //       logger.error(JSON.stringify(response.data));
    //     }
    //   })
    //   .catch((e) => {
    //     logger.error(e.message || JSON.stringify(e));
    //   });

    ticker("binance")
      // .then((data) => console.log(data[0].symbol, data[0].price, data[0]["%"], data[0].c))
      .catch(console.error);
  }
  setInterval(request, 5000);
}());
