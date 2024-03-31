import axios from "axios";
import logger from "infra/logger";
import BadGatewayError from "interfaces/http/errors/BadGatewayError";
import InvalidPayloadError from "interfaces/http/errors/InvalidPayloadError";

class Request {
  constructor({ config }) {
    const coingeckoBaseUrl = config.get("coingecko.coingeckoBaseUrl");
    // const coingeckoKey = config.get("coingecko.coingeckoKey");
    const httpClient = axios.create({
      baseURL: coingeckoBaseUrl,
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${coingeckoBaseUrl}`,
      },
    });

    this.httpClient = httpClient;
  }

  async get(url) {
    try {
      const response = await this.httpClient.get(`${url}`);
      return response.data;
    } catch (error) {
      logger.error("An error occurred while fetching data.", { error: error.toString() });
      if (error.response && error.response.status === 400) {
        throw new InvalidPayloadError(error.response.data.message);
      }
      throw new BadGatewayError("Could not complete your request at the moment. Please try again later.");
    }
  }

  async post(url, data, config = {}) {
    try {
      const response = await this.httpClient.post(`${url}`, data, config);
      return response.data;
    } catch (error) {
      logger.error("An error occurred while fetching data.", { error: error.toString() });
      if (error.response && error.response.status === 400) {
        throw new InvalidPayloadError(error.response.data.message);
      }
      throw new BadGatewayError("Could not complete your request at the moment. Please try again later.");
    }
  }

  async executeRequest(url, method, data, options = {}) {
    try {
      const body = method === "get" || !data ? {} : { data };
      const requestObject = {
        method,
        url,
        params: options.query,
        ...body,
      };

      const response = await this.httpClient.request(requestObject);
      return response.data;
    } catch (error) {
      logger.error("An error occurred while fetching data.", { error: error.toString() });
      if (error.response && error.response.status === 400) {
        throw new InvalidPayloadError(error.response.data.message);
      }
      throw new BadGatewayError("Could not complete your request at the moment. Please try again later.");
    }
  }
}

export default Request;
