import express from "express";
import publicRouter from "../routes/public-api.js";
import errorMiddleware from "../middleware/error-middleware.js";
import adminRouter from "../routes/admin-api.js";
import cors from "cors";
import bodyParser from "body-parser";

const web = express();

web.use(express.json());
// Middleware untuk mem-parsing JSON
web.use(bodyParser.json());
// Middleware untuk mem-parsing form data
web.use(bodyParser.urlencoded({ extended: true }));
web.use(cors());
web.use(express.static('src'));
web.use('/assets', express.static('assets'));
web.use(publicRouter);
web.use(adminRouter);
web.use(errorMiddleware);

export default web;
