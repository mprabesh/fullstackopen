"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const patient_1 = __importDefault(require("./routes/patient"));
const diagnosis_1 = __importDefault(require("./routes/diagnosis"));
const app = (0, express_1.default)();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = 3001;
app.get("/api/ping", (req, res) => {
    res.status(200).send("PONG");
});
app.use("/api/patients", patient_1.default);
app.use("/api/diagnosis", diagnosis_1.default);
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});
