"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function searchArtist(search, token) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };
    try {
        let response = await fetch(`https://api.spotify.com/v1/search?q=${search}&type=artist`, requestOptions);
        let result = await response.json();
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.default = searchArtist;
//# sourceMappingURL=search-artist.js.map