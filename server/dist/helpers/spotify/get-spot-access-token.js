"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function getSpotAccessToken() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Cookie", "__Host-device_id=AQBS-KV9hZR0fT4AeqL1QYGmKTahg87tGkRn92Z1KxCfhorJHFyzvG8ncifoZwarGwp2aYAezjT-T6cuBOW3EpmxPtZ04X_5Xvo; sp_tr=false");
    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    urlencoded.append("client_id", process.env.SPOTIFY_CLIENT_ID);
    urlencoded.append("client_secret", process.env.SPOTIFY_CLIENT_SECRET);
    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
    };
    try {
        const response = await fetch("https://accounts.spotify.com/api/token", requestOptions);
        const result = await response.json();
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.default = getSpotAccessToken;
//# sourceMappingURL=get-spot-access-token.js.map