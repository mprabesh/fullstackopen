"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnosisRouter = express_1.default.Router();
const diagnosis_1 = __importDefault(require("../data/diagnosis"));
diagnosisRouter.get("/", (req, res) => {
    res.status(200).json(diagnosis_1.default);
});
exports.default = diagnosisRouter;
