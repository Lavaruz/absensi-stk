"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const response_1 = __importDefault(require("../../controllers/response"));
const JWT_1 = require("../../utils/JWT");
const RateLimiter_1 = __importDefault(require("../../utils/RateLimiter"));
const router = express_1.default.Router();
router.post("/login", RateLimiter_1.default, function (req, res) {
    let megaData = req.body;
    try {
        if (megaData.credentials == "mega") {
            let megaToken = (0, JWT_1.generateMegaAccessToken)(megaData);
            res.cookie("mega-token", megaToken, {
                httpOnly: true
            });
            return (0, response_1.default)(200, "success login", [], res);
        }
        else {
            return (0, response_1.default)(400, "Wrong Credentials", [], res);
        }
    }
    catch (error) {
        res.json(error);
    }
});
exports.default = router;
//# sourceMappingURL=megaRouter.js.map