import carsData from "@/mockData/carsData.json";
import CarCard from "@/components/CarCard";
import Pagination from "@/components/Pagination";
import { type GetServerSideProps } from "next";
import { useTheme } from "@/contexts/ThemeContext";

type Car = {
  carId: number;
  car_img: string;
  car_name: string;
  car_year: string;
  car_people: number;
  car_fuelType: string;
  car_Mileage: number;
  car_gearType: string;
  car_rent: number;
};
type Props = {
  cars: Car[];
};

type QueryParameters = {
  page?: string;
  pageSize?: string;
  searchQuery?: string;
};

export default function Home({ cars }: Props) {
  const { theme, toggleTheme } = useTheme();
  return (
    <main
      className={`${
        theme == "dark" ? "bg-[#111827]" : "bg-[#F2F5FC]"
      } flex flex-col items-center justify-center`}
    >
      <div className=" p-4 grid grid-cols-3 grid-rows-2 gap-8">
        {cars.map((car) => {
          return <CarCard car={car} key={car.carId} />;
        })}
      </div>
      {cars.length === 0 && (
        <div className="font-bold text-gray-300 text-5xl">no cars found</div>
      )}
      <Pagination />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<
  Props,
  QueryParameters
> = async ({ query }) => {
  const { page = 1, pageSize = 6, searchQuery = "" } = query;
  const response = await fetch(
    `http://localhost:3000/api/cars?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}`
  );
  const cars = await response.json();

  return {
    props: {
      cars,
    },
  };
};
