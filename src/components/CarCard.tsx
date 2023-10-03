import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";
import { GoPeople } from "react-icons/go";
import { BiGasPump } from "react-icons/bi";
import { BsSpeedometer } from "react-icons/bs";
import { PiSteeringWheel } from "react-icons/pi";
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
type CarCardProps = {
  car: Car;
};
const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div
      className={`${
        theme == "dark"
          ? "bg-[#1F2937] text-white"
          : "bg-[#F2F5FC] border-[1px] border-white"
      } drop-shadow-xl rounded-2xl p-4 text-[#5e5f69]`}
      key={car.carId}
    >
      <Image
        className="rounded-xl"
        src={`/carsimgs/${car.car_img}`}
        height={200}
        width={500}
        alt="car image"
      />
      <div className="p-2">
        <div className="flex justify-between">
          <h1 className="font-bold">{car.car_name}</h1>
          <h1 className="rounded-lg border-dotted border-[#1893ff] border-2 text-sm font-bold px-2">
            {car.car_year}
          </h1>
        </div>
        <div className="border-b-[1px] border-[#ececec] grid grid-cols-2 gap-2 p-2">
          <span className="flex items-center gap-2">
            <GoPeople style={{ color: "#1893ff" }} />
            <h1>{car.car_people} people</h1>
          </span>
          <span className="flex items-center gap-2">
            <BiGasPump style={{ color: "#1893ff" }} />
            <h1>{car.car_fuelType}</h1>
          </span>
          <span className="flex items-center gap-2">
            <BsSpeedometer style={{ color: "#1893ff" }} />
            <h1>{car.car_Mileage} km/1-litre</h1>
          </span>
          <span className="flex items-center gap-2">
            <PiSteeringWheel style={{ color: "#1893ff" }} />
            <h1>{car.car_gearType}</h1>
          </span>
        </div>
        <div className=" flex justify-between px-2 py-4">
          <span className="flex items-center justify-center gap-1">
            <h1 className="text-2xl font-bold">${car.car_rent}</h1>
            <p>/ month</p>
          </span>
          <div className="flex gap-3">
            <button
              className={`${
                theme == "dark"
                  ? "bg-[#3b4a60] text-white"
                  : "bg-[#fff] border-[1px] border-white"
              } p-2 bg-[#DAE9FC] rounded-lg`}
            >
              <AiOutlineHeart style={{ color: "#1893ff" }} />
            </button>
            <button className="bg-blue-500 rounded-lg p-1 text-white">
              Rent now
            </button>
            <h1>{car.carId}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
