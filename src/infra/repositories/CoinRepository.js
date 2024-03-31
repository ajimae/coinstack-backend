import BaseRepository from "./BaseRepository";

class CoinRepository extends BaseRepository {
  constructor({
    request, models: { User }, httpServer, logger,
  }) {
    super({ Model: User });
    this.User = User;
    this.request = request;
    this.httpServer = httpServer;
    this.logger = logger;
  }

  async getMarketData({
    currency = "usd",
    orderBy = "marget_cap_desc",
    sparkline = false,
    priceChangePerc = "7d",
    perPage = 10,
    page = 1,
  }) {
    // eslint-disable-next-line max-len
    const url = `/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`;
    const data = await this.request.get(url);

    return data;
  }
}

export default CoinRepository;
