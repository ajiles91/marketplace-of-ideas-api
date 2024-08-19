"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ideas_router_1 = __importDefault(require("./routes/ideas-router"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json()); // Enable JSON parsing in the request body
app.use('/ideas', ideas_router_1.default); // Add this line to mount the Task API routes
app.get('/', (req, res) => {
    res.send('Hello, TypeScript Express!');
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
