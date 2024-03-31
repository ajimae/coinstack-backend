// import { pick } from "lodash";
import BaseController from "./BaseController";

class AuthController extends BaseController {
  constructor({ market }) {
    super();
    this.market = market;
  }

  async getMarketData(req, res) {
    // const payload = pick(req.body, ["first_name", "last_name", "email", "password"]);
    const response = await this.market.execute();
    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess(response, "success");
  }
}

export default AuthController;
