import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import xss from "xss-clean";
import compression from "compression";
import apiRoutes from "./routes/api.js";
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
process.env.APP_ROOT = path.dirname(__filename);
process.env.STATIC_DIR = path.join(process.env.APP_ROOT, '..', 'static');

const app = express();

app.use(express.static(process.env.STATIC_DIR));

const corsOptions = {
    origin: '*',
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());  // data sanitization aganist xss
app.use(compression())

app.get('/', function (req, res) {
    return res.sendFile(process.env.STATIC_DIR + '/views/welcome.html');
});

app.use("/api", apiRoutes);

app.all("*", (req, res, next) => {
    return res.status(404).sendFile(process.env.STATIC_DIR + '/views/404.html');
});

export default app;