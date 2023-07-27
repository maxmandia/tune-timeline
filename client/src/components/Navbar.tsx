import React from "react";
import { PersonIcon } from "@radix-ui/react-icons";
function Navbar() {
  return (
    <nav className="py-8 px-4 flex gap-3 items-center justify-between">
      <input
        className="bg-[#252525] w-full pt-3 pb-3 pl-2 rounded-[6px] border-[1px] border-input-txt"
        placeholder="Search for artists"
        type="text"
      />
      <div className="p-2 bg-input-bg border-[1px] border-input-txt rounded-[6px]">
        <PersonIcon width={30} height={30} color="#676767" />
      </div>
    </nav>
  );
}

export default Navbar;
