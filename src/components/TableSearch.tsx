'use client';
import Image from "next/image";
import { useState } from "react";
const TableSearch = () => {
  const [isActive, setIsActive] = useState(false);
  const [query, setQuery] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle your search logic here
    console.log("Search query:", query);
  };
  return (
    <div className=" md:flex items-center gap-2 text-xs px-4">
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center group"
      >
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`absolute right-0 py-3 pr-20 pl-4 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${
            isActive ? "w-45 opacity-100" : "w-0 opacity-0"
          }`}
        />

        <button
          type="button"
          onClick={() => setIsActive(!isActive)}
          className="relative z-10 p-4 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
        >
          <Image alt="" src="/search.png" width={15} height={15} />
        </button>
      </form>
    </div>
  );
};

export default TableSearch;


