"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const JWT_1 = require("../utils/JWT");
const router = express_1.default.Router();
router.get("/", JWT_1.validateTokenWebiste, (req, res) => {
    res.redirect("/dashboard");
});
router.get("/login", (req, res) => {
    if (req.cookies["login-token"]) {
        res.redirect("/");
    }
    else {
        res.render("loginPage");
    }
});
router.get("/mega/login", (req, res) => {
    res.render("MegaLogin");
});
router.get("/mega/dashboard", JWT_1.validateTokenMegaWebiste, (req, res) => {
    res.render("MegaDashboard");
});
router.get("/mega/karyawan", JWT_1.validateTokenMegaWebiste, (req, res) => {
    res.render("MegaKaryawan");
});
router.get("/mega/devisi", JWT_1.validateTokenMegaWebiste, (req, res) => {
    res.render("MegaDevisi");
});
router.get("/mega/absensi", JWT_1.validateTokenMegaWebiste, (req, res) => {
    res.render("MegaAbsensi");
});
router.get("/mega/absensi/:id", JWT_1.validateTokenMegaWebiste, (req, res) => {
    res.render("MegaAbsensiDetail");
});
router.get("/dashboard", JWT_1.validateTokenWebiste, (req, res) => {
    res.render("KaryawanDashboard", { user: req.user });
});
router.get("/profile", JWT_1.validateTokenWebiste, (req, res) => {
    res.render("KaryawanProfile", { user: req.user });
});
router.get("/absensi", JWT_1.validateTokenWebiste, (req, res) => {
    res.render("KaryawanAbsensi", { user: req.user });
});
module.exports = router;
//# sourceMappingURL=webRouter.js.map