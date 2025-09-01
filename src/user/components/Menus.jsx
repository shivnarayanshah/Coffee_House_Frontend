import React from "react";
import { Link } from "react-router";

const menuItems = [
  { name: "Americano", price: "Rs 150", img: "americano.jpg" },
  { name: "Blended Mocha", price: "Rs 315", img: "blended-mocha.jpg" },
  {
    name: "Blended Frappe",
    price: "Rs 280",
    img: "blended-frappe.jpg",
  },
  { name: "Cappuccino", price: "Rs 185", img: "cappuccino.jpg" },
  { name: "Caffe Latte", price: "Rs 180", img: "caffe-latte.jpg" },
  { name: "Milk tea", price: "Rs 80", img: "milk-tea.jpg" },
  {
    name: "Cafe latte with Cookie",
    price: "Rs 365",
    img: "latte-cookie.jpg",
  },
  { name: "Croissant", price: "Rs 120", img: "croissant.jpg" },
  { name: "Baguette", price: "Rs 120", img: "baguette.jpg" },
  { name: "Rolls", price: "Rs 150", img: "rolls.jpg" },
  { name: "Cheese cake", price: "Rs 300", img: "cheesecake.jpg" },
  {
    name: "Brownie with Icecream",
    price: "Rs 280",
    img: "brownie.jpg",
  },
  {
    name: "Iced Americano",
    price: "Rs 195",
    img: "iced-americano.jpg",
  },
  { name: "Flat white", price: "Rs 195", img: "flat-white.jpg" },
  { name: "Matcha Latte", price: "Rs 350", img: "matcha.jpg" },
];
const Menus = () => {
  return (
    <section className="mt-8 md:mt-16 lg:mt-24">
      <div className="text-center mb-10 relative">
        <h2 className="text-3xl font-bold font-Poppins mb-2">Menu</h2>
        <p className="text-gray-600 font-Poppins max-w-2xl mx-auto text-sm md:text-base">
          While most of the food in our menu changes from kitchen to kitchen and
          from cook to cook, what remains the same is our product from the
          bakery.
        </p>
        <div className=" absolute  right-[45%]  -bottom-8 md:right-0 md:bottom-0 lg:right-0 lg:bottom-0   text-right pr-2     ">
          <Link
            to="/menuPage"
            className=" text-sm font-medium underline text-black hover:text-gray-700"
          >
            View All
          </Link>
        </div>
      </div>

      <div className="bg-[#F6EDE0] py-8 px-16 rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-between  ">
        {menuItems.map((item, idx) => (
          <div key={idx} className="flex items-start gap-4 ">
            <img
              src={item.img}
              alt={item.name}
              className="w-[115px] h-[120px] rounded-lg object-cover"
            />
            <div className="flex flex-col justify-center h-full">
              <h4 className="text-md font-semibold font-Poppins text-[#050706]">
                {item.name}
              </h4>
              <p className="text-[#68737F] text-sm font-Poppins">
                {item.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menus;
