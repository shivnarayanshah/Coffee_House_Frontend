import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router";
import FooterMap from "./FooterMap.jsx";

const Footer = () => {
  return (
    <div className="mt-24 px-4 sm:px-10 lg:px-20 xl:px-32 space-y-12 sm:space-y-16 pb-8 font-Poppins text-sm sm:text-base">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between  gap-10">
        <div className="flex flex-col gap-3 sm:gap-4 text-[#050706]">
          <Link to="/">Home</Link>
          <Link to="/aboutUs">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/teams">Team</Link>
          <Link to="/faqs">FAQs</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/contactUs">Contact Us</Link>
        </div>

        <div className="flex flex-col gap-2 text-[#050706] md:pl-10 lg:pl-0">
          <span className="text-xl font-bold">Contact</span>
          <span>Tridevi Marg, Thamel</span>
          <span>Kathmandu, Nepal</span>
          <span>#info@himalayanjava.com</span>
          <span>+977-[0]1-4435171</span>
        </div>

        {/* Map */}
        <FooterMap />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 text-center sm:text-left text-[#050706]">
        <div>© 2021 Himalayan Java</div>
        <div className="flex gap-4 text-xl">
          <FaFacebookF color="#1877F2" />
          <IoLogoYoutube color="#FF0000" />
          <FaInstagram color="#C13584" />
        </div>
        <div>Created by Brandbuilder</div>
      </div>
    </div>
  );
};

export default Footer;
