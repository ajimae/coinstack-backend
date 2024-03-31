import { Router } from "express";
import { makeInvoker } from "awilix-express";
import CheckAuthentication from "interfaces/http/middleware/checkAuthentication";
import CoinController from "interfaces/http/controllers/CoinController";
import MethodNotAllowedHandler from "middleware/methodNotAllowed";

const router = Router();
const api = makeInvoker(CoinController);
const authPolicy = makeInvoker(CheckAuthentication);

/**
 * @api {post} /auth/signup Creates account for user
 * @apiGroup Auth
 * @apiName Signup
 * @apiDescription Sign up with email and password
 * @apiVersion 1.0.0
 * @apiParam {String} email - User's email
 * @apiParam {String} password - User's password (min 8 characters)
 * @apiParam {String} first_name - User's first name
 * @apiParam {String} last_name - User's last name
 * @apiSuccessExample Success Response:
 * {
 *     "success": true,
 *     "status_code": 200,
 *     "message": "Sign up successful!",
 *     "data": {
 *         "first_name": "jane",
 *         "last_name": "doe",
 *         "email": "jane.doe@mail.com",
 *         "username": "jane3500",
 *         "email_verified": false,
 *         "_id": "6175ce167438dd9854ca2850",
 *         "created_at": "2021-10-24T21:20:22.502Z",
 *         "updated_at": "2021-10-24T21:20:22.502Z"
 *     },
 *    "links": []
 * }
 */

/**
 * @api {post} /auth/login Login
 * @apiGroup Auth
 * @apiName Login
 * @apiDescription Authenticate a user using email and password
 * @apiVersion 1.0.0
 * @apiParam {String} email - User's email
 * @apiParam {String} password - User's password (min 8 characters)
 * @apiSuccessExample Success Response:
 * {
 *     "success": true,
 *     "status_code": 200,
 *     "message": "Sign up successful!",
 *     "data": {
 *     },
 *    "links": []
 * }
 */

router
  .route("/market")
  .get(
    authPolicy("allowAny"),
    // validate.body(signupSchema),
    api("getMarketData"),
  )
  .all(MethodNotAllowedHandler);

export default router;
