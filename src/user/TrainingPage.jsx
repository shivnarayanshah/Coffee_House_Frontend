import React from "react";
import Footer from "./components/Footer.jsx";
import { Card, Typography } from "@material-tailwind/react";
import { BASE_URL } from "../api/mainApi.jsx";
import { useGetAllTrainingQuery } from "../api/trainingApi.jsx";

const TrainingPage = () => {
  const { data: trainings = [], isLoading } = useGetAllTrainingQuery();

  return (
    <div className=" min-h-screen px-4 sm:px-6 py-12">
      <div className="max-w-4xl mx-auto text-center mb-12 space-y-4">
        <Typography className="text-gray-700 font-light text-lg">
          Himalayan Java Barista Coffee School was introduced to promote the
          culture of vocational training in Nepal. Our training programs empower
          aspiring baristas with hands-on skills and real-world coffee knowledge
          to help them excel in the café industry.
        </Typography>
      </div>

      <div className="grid grid-cols-1 gap-6 max-w-6xl mx-auto">
        {isLoading ? (
          <Typography className="text-center">Loading trainings...</Typography>
        ) : trainings.length === 0 ? (
          <Typography className="text-center">
            No training programs available.
          </Typography>
        ) : (
          trainings.map((training) => (
            <Card
              key={training._id}
              className="flex flex-col md:flex-row items-center md:items-start gap-6 p-4 bg-white shadow-lg rounded-lg"
            >
              {/* === Image === */}
              {training.image && (
                <img
                  src={`${BASE_URL}${training.image}`}
                  alt={training.title}
                  className="h-32 w-full md:w-40 object-contain rounded-md"
                />
              )}

              {/* === Info Section === */}
              <div className="flex-1 space-y-2">
                <Typography
                  variant="h5"
                  className="text-[#6F4E37] font-semibold"
                >
                  {training.title}
                </Typography>
                <Typography className="text-gray-600 text-sm">
                  {training.description}
                </Typography>

                <div className="flex flex-wrap gap-4 text-sm text-gray-700 mt-2">
                  <span>
                    <strong>Duration:</strong> {training.duration || "N/A"}
                  </span>
                  <span>
                    <strong>Amount:</strong> Rs {training.amount || "0"}
                  </span>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TrainingPage;
