import { useState } from "react";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="align-center flex h-14 w-full items-center justify-start">
      <div className="relative w-1/6 w-full flex-row"></div>
      <div className="px-auto relative flex w-full flex-row justify-start">
        <div className="relative w-1/6 w-full flex-row"></div>
        <input
          type="text"
          onChange={handleSearchChange}
          className="w-1/2 rounded-lg border-2 border-blue-400 py-2 pl-4 pr-10 text-sm text-black focus:border-blue-500 focus:outline-none"
          placeholder="Search Acme Inc"
        />
        <button
          className="absolute right-2 top-0 mr-2 mt-2"
          onClick={() => console.log(`Searching for: ${searchTerm}`)}
        ></button>
      </div>
    </div>
  );
};
