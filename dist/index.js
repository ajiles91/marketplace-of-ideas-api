"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const ideasRouter = require('./ideas-router');
const errorHandler = require('./error-handler');
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(ideasRouter);
app.use(errorHandler);
app.get('/ping', (_req, res) => {
    return res.send('pong 🏓');
});
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
module.exports = app;
//# sourceMappingURL=index.js.map