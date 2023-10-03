import { usePagination } from "@/contexts/PaginationContext";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import React, { useEffect } from "react";
import { useSearch } from "@/contexts/SearchContext";
import { useTheme } from "@/contexts/ThemeContext";

const Pagination: React.FC = () => {
  const router = useRouter();
  const { state, dispatch } = usePagination();
  const { searchQuery, setSearchQuery } = useSearch();
  const { theme, toggleTheme } = useTheme();
  return (
    <main className="w-full backdrop-blur-sm p-6">
      <div
        className={`flex items-center justify-between gap-4 ${
          theme == "dark"
            ? "bg-[#1F2937] text-white"
            : "bg-[#F2F5FC] border-[1px] border-white"
        } drop-shadow-xl rounded-2xl p-4 text-[#5e5f69]`}
      >
        <div className="font-bold">
          <h1>{state.page} from 10</h1>
        </div>
        <div className=" flex gap-2">
          <button
            onClick={() => {
              router.push(
                `/?page=${Math.max(
                  1,
                  state.page - 1
                )}&searchQuery=${searchQuery}`
              );
              dispatch({ type: "PREV_PAGE" });
            }}
            className={`${
              theme == "dark"
                ? "bg-[#3b4a60] text-white"
                : "bg-[#fff] border-[1px] border-white"
            } shadow-lg rounded-lg p-2`}
          >
            <AiOutlineArrowLeft />
          </button>
          {state.page > 3 && (
            <>
              <button
                onClick={() => {
                  router.push(`/?page=${1}&searchQuery=${searchQuery}`);
                  dispatch({ type: "SET_PAGE", payload: 1 });
                }}
                className={`${
                  theme == "dark"
                    ? "bg-[#3b4a60] text-white"
                    : "bg-[#fff] border-[1px] border-white"
                } shadow-lg rounded-lg py-1 px-3 
                }`}
              >
                1
              </button>
              <button
                className={`${
                  theme == "dark"
                    ? "bg-[#3b4a60] text-white"
                    : "bg-[#fff] border-[1px] border-white"
                } shadow-lg rounded-lg p-1`}
              >
                ...
              </button>
            </>
          )}
          {[state.page - 1, state.page, state.page + 1].map((page) => {
            if (page < 1 || page > 10) return <></>;
            return (
              <button
                key={page}
                onClick={() => {
                  router.push(`/?page=${page}&searchQuery=${searchQuery}`);
                  dispatch({ type: "SET_PAGE", payload: page });
                }}
                className={`${
                  theme == "dark"
                    ? `${
                        state.page == page ? "bg-blue-900" : "bg-[#3b4a60]"
                      } text-white`
                    : "bg-[#fff] border-[1px] border-white"
                } shadow-lg rounded-lg py-1 px-3 ${
                  state.page == page ? "bg-blue-300 text-white" : ""
                }`}
              >
                {page}
              </button>
            );
          })}
          {state.page < 8 && (
            <>
              <button
                className={`${
                  theme == "dark"
                    ? "bg-[#3b4a60] text-white"
                    : "bg-[#fff] border-[1px] border-white"
                } shadow-lg rounded-lg p-1 `}
              >
                ...
              </button>
              <button
                onClick={() => {
                  router.push(`/?page=${10}&searchQuery=${searchQuery}`);
                  dispatch({ type: "SET_PAGE", payload: 10 });
                }}
                className={`${
                  theme == "dark"
                    ? "bg-[#3b4a60] text-white"
                    : "bg-[#fff] border-[1px] border-white"
                } shadow-lg rounded-lg py-1 px-2 ${
                  state.page == 10 ? "bg-blue-300 text-white" : ""
                }`}
              >
                10
              </button>
            </>
          )}
          <button
            onClick={() => {
              router.push(
                `/?page=${Math.min(
                  10,
                  state.page + 1
                )}&searchQuery=${searchQuery}`
              );
              dispatch({ type: "NEXT_PAGE" });
            }}
            className={`${
              theme == "dark"
                ? "bg-[#3b4a60] text-white"
                : "bg-[#fff] border-[1px] border-white"
            } shadow-lg rounded-lg p-2`}
          >
            <AiOutlineArrowRight />
          </button>
        </div>
      </div>
    </main>
  );
};

export default Pagination;
