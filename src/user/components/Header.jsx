import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { HiMenuAlt3 } from "react-icons/hi";

const searchSchema = Yup.object().shape({
  keyword: Yup.string().required("Please enter a search term"),
});

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchSubmit = (values, { resetForm }) => {
    if (values.keyword.trim() !== "") {
      navigate(`/search?keyword=${values.keyword.trim()}`);
      resetForm();
    }
  };

  useEffect(() => {
    setSearchVisible(false);
  }, [location.pathname]);

  return (
    <>
      <header className="relative flex justify-center items-center gap-10 lg:gap-20 mt-6 h-auto lg:h-[83px] font-Poppins px-4 sm:px-6 lg:ml-32">
        <div className="absolute left-4 top-4 block lg:hidden z-50">
          <button
            onClick={() => (
              setMobileMenuOpen(!isMobileMenuOpen), setSearchVisible(false)
            )}
          >
            <HiMenuAlt3 size={28} className="text-[#6A3D2A]" />
          </button>
        </div>

        <div className="hidden md:gap-8 lg:flex gap-16 justify-center items-center text-[#747474]">
          <Link
            to="/aboutUs"
            className={
              location.pathname === "/aboutUs"
                ? "border-b-2 border-[#747474]"
                : ""
            }
          >
            About
          </Link>
          <Link
            to="/services"
            className={
              location.pathname === "/services"
                ? "border-b-2 border-[#747474]"
                : ""
            }
          >
            Services
          </Link>
        </div>

        <div className="text-[#747474] md:px-3 px-6">
          <Link to="/" className="font-Satisfy">
            <div className="flex flex-col justify-center items-center text-center">
              <img src="menuIconCoffeeHouse.png" alt="Logo" className="w-10" />
              Coffee House
            </div>
          </Link>
        </div>

        <div
          className={`hidden md:gap-8 lg:flex gap-16 justify-center items-center ${
            location.pathname === "/" ? "text-[#FFFDF8]" : "text-[#747474]"
          }`}
        >
          <Link
            to="/trainings"
            className={
              location.pathname === "/trainings"
                ? "border-b-2 border-[#747474]"
                : ""
            }
          >
            Trainings
          </Link>
          <Link
            to="/contactUs"
            className={
              location.pathname === "/contactUs"
                ? "border-b-2 border-[#747474]"
                : ""
            }
          >
            Contact
          </Link>
          <FaMagnifyingGlass
            size={21}
            className="cursor-pointer"
            onClick={() => (
              setSearchVisible(!isSearchVisible), setMobileMenuOpen(false)
            )}
          />
        </div>
      </header>

      {isSearchVisible && !isMobileMenuOpen && (
        <div className="w-full px-4 mt-2 flex justify-center">
          <Formik
            initialValues={{ keyword: "" }}
            validationSchema={searchSchema}
            onSubmit={handleSearchSubmit}
          >
            <Form className="flex gap-2 w-full max-w-md">
              <Field
                name="keyword"
                type="text"
                placeholder="Search..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#6F4E37] text-white px-4 py-2 rounded-md hover:bg-[#5b3d2f]"
              >
                Search
              </button>
            </Form>
          </Formik>
        </div>
      )}

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#F6EDE0] text-[#050706] font-Poppins p-6 space-y-4 z-40 shadow-md min-w-screen">
          <Link
            to="/aboutUs"
            className={
              location.pathname === "/aboutUs"
                ? "bg-brown-400 border-2 rounded-[5px] p-1 block border-[#747474]"
                : " block"
            }
          >
            About
          </Link>
          <Link
            to="/services"
            className={
              location.pathname === "/services"
                ? "bg-brown-400 border-2 rounded-[5px] p-1 block border-[#747474]"
                : " block"
            }
          >
            Services
          </Link>
          <Link
            to="/trainings"
            className={
              location.pathname === "/trainings"
                ? "bg-brown-400 border-2 rounded-[5px] p-1 block border-[#747474]"
                : " block"
            }
          >
            Trainings
          </Link>
          <Link
            to="/contactUs"
            className={
              location.pathname === "/contact"
                ? "bg-brown-400 border-2 rounded-[5px] p-1 block border-[#747474]"
                : " block"
            }
          >
            Contact
          </Link>
          <div className="flex items-center gap-2">
            <FaMagnifyingGlass
              className="cursor-pointer"
              onClick={() => setSearchVisible(!isSearchVisible)}
            />
            <span>Search</span>
          </div>

          {isSearchVisible && isMobileMenuOpen && (
            <Formik
              initialValues={{ keyword: "" }}
              validationSchema={searchSchema}
              onSubmit={handleSearchSubmit}
            >
              <Form className="flex flex-col sm:flex-row gap-2 mt-2 w-full">
                <Field
                  name="keyword"
                  type="text"
                  placeholder="Search..."
                  className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#6F4E37] text-white px-4 py-2 rounded-md hover:bg-[#5b3d2f]"
                >
                  Search
                </button>
              </Form>
            </Formik>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
