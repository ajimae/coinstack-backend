import HttpStatus from "http-status-codes";
import BaseError from "./BaseError";

class InternalServerError extends BaseError {
  constructor(
    message = "An internal error or server related error occured.",
    status = HttpStatus.FORBIDDEN,
    data,
  ) {
    super(message, status, data);
    this.name = "InternalServerError";
  }
}

export default InternalServerError;
