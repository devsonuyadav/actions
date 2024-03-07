"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({
    path: './env/.env.dev',
});
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const socket_1 = require("./socket");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ['http://localhost:3000'], // Allow your Next.js app domain
        methods: ['GET', 'POST'], // Allowable methods
        credentials: true, // Allow credentials
    },
});
const puppeteer_1 = __importDefault(require("puppeteer"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Launch the browser and open a new blank page
    const browser = yield puppeteer_1.default.launch({
        executablePath: '/usr/bin/google-chrome-stable',
    });
    const page = yield browser.newPage();
    // Navigate the page to a URL
    yield page.goto('https://developer.chrome.com/');
    // Set screen size
    yield page.setViewport({ width: 1080, height: 1024 });
    // Type into search box
    yield page.type('.devsite-search-field', 'automate beyond recorder');
    // Wait and click on first result
    const searchResultSelector = '.devsite-result-item-link';
    yield page.waitForSelector(searchResultSelector);
    yield page.click(searchResultSelector);
    // Locate the full title with a unique string
    const textSelector = yield page.waitForSelector('text/Customize and automate');
    const fullTitle = yield (textSelector === null || textSelector === void 0 ? void 0 : textSelector.evaluate((el) => el.textContent));
    // Print the full title
    console.log('The title of this blog post is "%s".', fullTitle);
    yield browser.close();
}))();
const userNameSpace = io.of('/user');
const partnerNameSpace = io.of('/partner');
(0, socket_1.user)(userNameSpace);
(0, socket_1.user)(partnerNameSpace);
app.get('/', (req, res) => {
    res.send('Hello World! from v2 🚀');
});
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});
const PORT = 4121;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=index.js.map