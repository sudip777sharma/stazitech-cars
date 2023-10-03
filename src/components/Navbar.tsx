import SearchCar from "./SearchCar";
import { MdDarkMode } from "react-icons/md";
import { BsSunFill } from "react-icons/bs";
import { useTheme } from "@/contexts/ThemeContext";

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <main
      className={`
      ${theme == "dark" ? "bg-[#111827]" : ""} 
        backdrop-blur-sm sticky top-0 z-50 pt-6 pl-4 pr-4`}
    >
      <div
        className={`flex items-center gap-4 ${
          theme == "dark"
            ? "bg-[#1F2937] text-white"
            : "bg-[#F2F5FC] border-[1px] border-white"
        } drop-shadow-xl rounded-2xl p-4 text-[#5e5f69]`}
      >
        <SearchCar />
        <select id="relevance" className="bg-transparent font-bold">
          <option value="option1">Relevance</option>
          <option value="option2">Option 1</option>
          <option value="option3">Option 2</option>
        </select>
        <select id="relevance" className="bg-transparent font-bold">
          <option value="option1">All Brand</option>
          <option value="option2">Option 1</option>
          <option value="option3">Option 2</option>
        </select>
        {theme == "dark" ? (
          <button
            className={`bg-[#3b4a60] text-white p-2 rounded-full`}
            onClick={toggleTheme}
          >
            <BsSunFill />
          </button>
        ) : (
          <button
            className={`bg-blue-300 text-white p-2 rounded-full`}
            onClick={toggleTheme}
          >
            <MdDarkMode />
          </button>
        )}
      </div>
    </main>
  );
};

export default Navbar;
