import type { NextApiRequest, NextApiResponse } from "next";

import carsData from "@/mockData/carsData.json";

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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Car[]>
) {
  const {
    page: rawPage = "1",
    pageSize: rawPageSize = "6",
    searchQuery = "",
  } = req.query;

  const page = parseInt(rawPage as string, 10) || 1;
  const pageSize = parseInt(rawPageSize as string, 10) || 6;

  console.log("searchQuery", searchQuery);
  console.log("page", page);

  const normalizedSearchQuery = (searchQuery ?? "").toString();

  let filteredCars = carsData;
  if (normalizedSearchQuery !== "") {
    filteredCars = carsData.filter((car) =>
      car.car_name.toLowerCase().includes(normalizedSearchQuery.toLowerCase())
    );
  }

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedFilteredData = filteredCars.slice(startIndex, endIndex);

  res.status(200).json(paginatedFilteredData);
}
