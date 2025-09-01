import { Button, Typography } from "@material-tailwind/react";
import React from "react";

const ServiceCard = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row  justify-between  gap-8  mt-8 md:mt-16 lg:mt-24">
        <div className="max-w-[495px]   space-y-4">
          <Typography className="text-[36px] font-Poppins" variant="h3">
            Our Services
          </Typography>
          <Typography className="text-[18px] font-Poppins text-[#68737F]">
            Himalayan Java offers its customers the best-tasting coffee
            beverages in the country. We have achieved this by using
            high-quality ingredients and strictly following preparation
            guidelines.
          </Typography>
          <Button className="rounded-none h-[48px] w-[153px] mt-4 bg-transparent border-[1px] cursor-pointer border-[#000000] text-black font-Poppins">
            Contact us
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 text-center ">
          <div className=" flex flex-col items-center justify-center gap-4">
            <img src="/Scard1.png" alt="" />
            <Typography className="font-Poppins" variant="h5">
              Nepali Coffee Beans
            </Typography>
            <Typography className="text-[#68737F] font-Poppins">
              Himalayan Java offers its customers with locally brewed taste.
            </Typography>
          </div>
          <div className=" flex flex-col items-center justify-center gap-4">
            <img src="/Scard1.png" alt="" />
            <Typography variant="h5" className="font-Poppins">
              Barista Training
            </Typography>
            <Typography className="text-[#68737F] font-Poppins">
              Himalayan Java Barista Coffee School was introduced to promote the
              culture of vocational training in Nepal.
            </Typography>
          </div>
          <div className=" flex flex-col items-center justify-center gap-4">
            <img src="/Scard1.png" alt="" />
            <Typography variant="h5" className="font-Poppins">
              Bakery Equipments
            </Typography>
            <Typography className="text-[#68737F] font-Poppins">
              Himalayan Java is the sole distributor of various coffee equipment
              and products in Nepal.
            </Typography>
          </div>
          <div className=" flex flex-col items-center justify-center gap-4">
            <img src="/Scard1.png" alt="" />
            <Typography variant="h5" className="font-Poppins">
              Fresh Bakery Items
            </Typography>
            <Typography className="text-[#68737F] font-Poppins">
              We provied you a wide variety of fresh bakery items.
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceCard;
