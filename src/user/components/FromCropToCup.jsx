import { Button, Typography } from "@material-tailwind/react";
import { FaFacebookF } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";

const FromCropToCup = () => {
  return (
    <div className=" flex flex-col lg:flex-row h-auto lg:h-[696px] gap-8 px-4 md:px-12 lg:ml-32">
      {/* Left Section */}
      <div className="flex flex-col justify-center w-full  mt-28  lg:mt-28 gap-4">
        <div className="flex flex-col max-w-full lg:max-w-[533px] gap-6 lg:gap-8 mx-auto lg:mx-0">
          <div className="flex flex-col gap-4">
            <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-[#6A3D2A]">
              From Crop To Cup
            </h1>
            <p className="text-[16px] sm:text-[18px] text-[#747474]">
              Himalayan Java Coffee Beans are grown locally and are roasted to
              perfection in the ideal Himalayan air. It is then packaged
              immediately and rushed off to our outlets which ensures we deliver
              the best coffee experience possible for all of our customers.
            </p>
          </div>

          <div className="space-y-6">
            <Button className="bg-[#6A3D2A] rounded-none h-[48px] w-[143px] cursor-pointer">
              See More
            </Button>
            <div className="flex gap-4 text-xl text-[#6A3D2A]">
              <FaFacebookF />
              <IoLogoYoutube />
              <FaInstagram />
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative w-full h-[300px] sm:h-[400px] lg:h-full">
        <img
          src="/coffee.jpg"
          alt="Coffee"
          className="h-full w-full object-cover "
        />

        {/* Info Bar at Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 px-6 sm:px-12 md:px-16 bg-[#4D3D2E] absolute bottom-0 w-full h-[auto] sm:h-[70px] py-4 sm:py-0">
          <div className="flex gap-2 items-center font-Poppins">
            <Typography className="text-[18px] font-bold text-[#FFFDF8]">
              7
            </Typography>
            <Typography className="text-[14px] text-[#FFFDF8]">
              Years Experience
            </Typography>
          </div>
          <div className="flex gap-2 items-center">
            <Typography className="text-[18px] font-bold text-[#FFFDF8] font-Poppins">
              25k+
            </Typography>
            <Typography className="text-[14px] text-[#FFFDF8]">
              Cups per Month
            </Typography>
          </div>
          <div className="flex gap-2 items-center">
            <Typography className="text-[18px] font-bold text-[#FFFDF8] font-Poppins">
              35k+
            </Typography>
            <Typography className="text-[14px] text-[#FFFDF8]">
              Customers
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FromCropToCup;
