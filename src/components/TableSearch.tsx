'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
const TableSearch = () => {
  const [isActive, setIsActive] = useState(false);
  const [query, setQuery] = useState("");
  
  const router = useRouter()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = (e.currentTarget[0] as HTMLInputElement).value;
    const params = new URLSearchParams(window.location.search);
    params.set("search",value);
    router.push(`${window.location.pathname}?${params}`);
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
          className={`absolute right-1 py-3 pr-20 pl-3 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${
            isActive ? "w-50 opacity-100" : "w-0 opacity-0"
          }`}
        />

        <button
          type="button"
          onClick={() => setIsActive(!isActive)}
          className="relative z-10 p-4  bg-forthEle rounded-full shadow-md hover:shadow-xl transition-colors"
        >
          <Image alt="" src="/search.png" className="grayscale brightness-0" width={15} height={15} />
        </button>
      </form>
    </div>
  );
};

export default TableSearch;


