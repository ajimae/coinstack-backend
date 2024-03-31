import UseCase from "app/UseCase";
import InternalServerError from "interfaces/http/errors/InternalServerError";

class Market extends UseCase {
  constructor({ coinRepository }) {
    super();
    this.coinRepository = coinRepository;
  }

  /**
   *  get coin market data
   */
  async execute() {
    const marketData = await this.coinRepository.getMarketData({});
    if (!marketData) {
      throw new InternalServerError("Something went wrong.");
    }

    return marketData;
  }
}

export default Market;
