import Navbar from "@/components/Navbar";
import { PaginationProvider } from "@/contexts/PaginationContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={`overflow-auto h-screen flex flex-col bg-[#F2F5FC]`}>
      <ThemeProvider>
        <PaginationProvider>
          <SearchProvider>
            <Navbar />
            <Component {...pageProps} />
          </SearchProvider>
        </PaginationProvider>
      </ThemeProvider>
    </div>
  );
}