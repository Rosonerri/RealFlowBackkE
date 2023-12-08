"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const mainError_1 = require("./Error/mainError");
const userRouter_1 = __importDefault(require("./router/userRouter"));
// import {errorHandler} from "./Error/errorHanddler"
const mainApp = (app) => {
    try {
        app.use("/api/v1/auth", userRouter_1.default);
        app.set("view-engine", "ejs");
        app.get("/", (req, res) => {
            try {
                return res.status(200).json({
                    message: "Default page ",
                });
            }
            catch (error) {
                return res.status(404).json({
                    message: "Error ",
                    date: error.message,
                });
            }
        });
        app.all("*", (req, res, next) => {
            next(new mainError_1.mainError({
                name: "Route Error",
                message: `This route ${req.originalUrl} doesn't exist`,
                status: mainError_1.HTTP.BAD,
                success: false,
            }));
            // app.use(errorHandler);
        });
    }
    catch (error) {
        return error;
    }
};
exports.mainApp = mainApp;
