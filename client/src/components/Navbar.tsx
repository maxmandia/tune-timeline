import { useState } from "react";
import { PersonIcon } from "@radix-ui/react-icons";
import { ArtistInterface } from "../interfaces/ArtistInterface";
import debounce from "lodash.debounce";

function Navbar() {
  const [artists, setArtists] = useState<ArtistInterface[] | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  function handleSearch() {
    return async function (search: string) {
      if (search === "") {
        setArtists(null);
        return;
      }
      try {
        let resp = await fetch(
          `http://localhost:3001/search-artists?artist=${search}`
        );
        let data = await resp.json();
        setArtists(data.artists.items);
        setShowModal(true);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
  }

  let debounceSearch = debounce(handleSearch(), 500);

  return (
    <div>
      <nav className="py-8 px-4 flex gap-3 items-center justify-between">
        <input
          onBlur={() => setShowModal(false)}
          onFocus={() => setShowModal(true)}
          className="bg-[#252525] w-full pt-3 pb-3 pl-2 rounded-[6px] border-[.5px] border-input-txt"
          placeholder="Search for artists"
          type="text"
          onChange={(e) => debounceSearch(e.target.value)}
        />
        <div className="p-2 bg-input-bg border-[.5px] border-input-txt rounded-[6px]">
          <PersonIcon width={30} height={30} color="#676767" />
        </div>
      </nav>
      {artists && showModal && (
        <div className="flex flex-col bg-input-bg mx-4 rounded-[6px] py-4 gap-8 border-[.5px] border-input-txt max-h-[50vh] overflow-scroll">
          {artists.map((artist) => (
            <div
              className="flex items-center justify-between px-3"
              key={artist.id}
            >
              <div className="flex items-center gap-3">
                {artist.images[0]?.url ? (
                  <img
                    className="w-[50px] h-[50px] rounded-[100px] bg-slate-600"
                    src={artist.images[0]?.url}
                    alt="artist image"
                  />
                ) : (
                  <div className="flex items-center justify-center w-[50px] h-[50px] rounded-[100px] bg-slate-600">
                    <p>?</p>
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-[17px]">{artist.name}</h4>
                  <h6>{artist.genres[0]}</h6>
                </div>
              </div>
              <button className="bg-slate-600 px-5 py-1 font-medium rounded-[4px] text-[14px]">
                follow
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Navbar;
