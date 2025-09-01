import React from "react";
import Footer from "./components/Footer.jsx";
import { useGetAllCareerQuery } from "../api/careerApi.jsx";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { BASE_URL } from "../api/mainApi.jsx";

const calculateDeadline = (createdAt, duration) => {
  const date = new Date(createdAt);
  const [value, unit] = duration.toLowerCase().split(" ");

  let daysToAdd = 0;
  const num = parseInt(value);

  if (unit.includes("day")) daysToAdd = num;
  else if (unit.includes("week")) daysToAdd = num * 7;
  else if (unit.includes("month")) daysToAdd = num * 30;
  else if (unit.includes("year")) daysToAdd = num * 365;

  date.setDate(date.getDate() + daysToAdd);
  return date.toDateString();
};

const CareerPage = () => {
  const { data, isLoading } = useGetAllCareerQuery();
  const navigate = useNavigate();

  return (
    <div className=" min-h-screen flex-grow px-4 sm:px-6 md:px-16 lg:px-32 py-10">
      <Typography
        variant="h4"
        className="text-center font-bold text-[#6F4E37] mb-10"
      >
        Career Opportunities
      </Typography>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading careers...</p>
      ) : data?.length === 0 ? (
        <p className="text-center text-gray-400">No career openings found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {data?.map((career, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <img
                src={`${BASE_URL}${career.image}`}
                alt={career.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-[#6F4E37] mb-2">
                  {career.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 flex-grow">
                  {career.description}
                </p>
                <p className="text-xs text-gray-500 mb-4 italic">
                  Posted: {new Date(career.createdAt).toDateString()}
                </p>
                <p className="text-xs text-gray-500 mb-4 italic">
                  DeadLine:{" "}
                  {calculateDeadline(career.createdAt, career.duration)}
                </p>
                <button
                  onClick={() => navigate("/contactUs")}
                  className="mt-auto bg-[#6F4E37] text-white px-4 py-2 rounded-md hover:bg-[#5b3d2f] transition duration-200"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CareerPage;
