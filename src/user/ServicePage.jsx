import React from "react";
import Footer from "./components/Footer.jsx";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { useGetAllServiceQuery } from "../api/serviceApi.jsx";
import { BASE_URL } from "../api/mainApi.jsx";

const ServicePage = () => {
  const { data: services = [], isLoading } = useGetAllServiceQuery();
  return (
    <div className=" px-6 py-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto text-center mb-12 space-y-4">
        <Typography className="text-gray-700">
          Himalayan Java offers its customers the best-tasting coffee beverages
          in the country. We have achieved this by using high-quality
          ingredients and strictly following preparation guidelines.
        </Typography>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {isLoading ? (
          <Typography>Loading services...</Typography>
        ) : services.length === 0 ? (
          <Typography>No services available.</Typography>
        ) : (
          services.map((service, index) => (
            <Card
              key={index}
              className=" flex flex-col items-center justify-center gap-4 shadow-xl p-4 my-4"
            >
              <img src={`${BASE_URL}${service.image}`} alt="" />
              <Typography className="font-Poppins" variant="h5">
                {service.title}
              </Typography>
              <Typography className="text-[#68737F] text-center  font-Poppins">
                {service.description}
              </Typography>
            </Card>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ServicePage;
