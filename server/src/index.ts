import express from "express";
import dotenv from "dotenv";
import getSpotAccessToken from "./helpers/spotify/get-spot-access-token";
import searchArtist from "./helpers/spotify/search-artist";
dotenv.config();

const app = express();

app.get("/", async (req, res) => {
  res.send("hey");
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
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});