"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const get_spot_access_token_1 = __importDefault(require("./helpers/spotify/get-spot-access-token"));
const search_artist_1 = __importDefault(require("./helpers/spotify/search-artist"));
const cors_1 = __importDefault(require("cors"));
const svix_1 = require("svix");
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const CLERK_SECRET = process.env.CLERK_SECRET;
app.get("/", async (req, res) => {
    res.json({
        name: "max",
    });
});
app.get("/search-artists", async (req, res) => {
    const { artist } = req.query;
    if (!artist) {
        res.send("No artist query provided");
        return;
    }
    try {
        let { access_token } = await (0, get_spot_access_token_1.default)();
        let response = await (0, search_artist_1.default)(artist, access_token);
        res.json(response);
    }
    catch (error) {
        res.send(error);
    }
});
app.post("/user-created", body_parser_1.default.raw({ type: "application/json" }), async (req, res) => {
    const payload = req.body;
    const headers = req.headers;
    const wh = new svix_1.Webhook(CLERK_SECRET);
    let msg;
    try {
        msg = wh.verify(payload, headers);
    }
    catch (err) {
        res.status(400).json({});
    }
    const evt = req.body.evt;
    let idk = evt.data;
});
app.listen(3001, () => {
    console.log("Server listening on port 3001");
});
//# sourceMappingURL=index.js.map