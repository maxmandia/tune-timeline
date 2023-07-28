import express from "express";
import dotenv from "dotenv";
import getSpotAccessToken from "./helpers/spotify/get-spot-access-token";
import searchArtist from "./helpers/spotify/search-artist";
import cors from "cors";
import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import { Webhook } from "svix";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
app.use(cors());
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
    let { access_token } = await getSpotAccessToken();
    let response = await searchArtist(artist as string, access_token);
    res.json(response);
  } catch (error) {
    res.send(error);
  }
});

app.post(
  "/user-created",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const payload = req.body;
    const headers: any = req.headers;

    const wh = new Webhook(CLERK_SECRET);
    let msg;
    try {
      msg = wh.verify(payload, headers);
    } catch (err) {
      res.status(400).json({});
    }

    const { first_name, last_name, email_addresses } = msg.data;
    let email = email_addresses[0].email_address;
  }
);

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
