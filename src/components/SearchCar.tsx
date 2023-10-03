import { usePagination } from "@/contexts/PaginationContext";
import { useSearch } from "@/contexts/SearchContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "next/router";
import React, { useState } from "react";

const SearchCar: React.FC = () => {
  const {theme, toggleTheme} = useTheme();
  const { searchQuery, setSearchQuery } = useSearch();
  const { state, dispatch } = usePagination();
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    const newTimer = setTimeout(() => {
      router.push(`/?searchQuery=${inputValue}&page=${state.page}`);
    }, 500); // Debounce for 500 milliseconds

    setDebounceTimer(newTimer);
  };

  return (
    <div className="flex">
      <input
        id="searchCar"
        className={`${
          theme == "dark"
            ? "bg-[#3b4a60] text-white"
            : "bg-[#fff] border-[1px] border-white"
        } rounded-lg py-1 px-4 outline-none w-[20rem]`}
        type="text"
        placeholder="search..."
        value={searchInput}
        onChange={handleSearchInputChange}
      />
    </div>
  );
};

export default SearchCar;
