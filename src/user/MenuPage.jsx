import { useGetAllMenuQuery } from "../api/menuApi.jsx";
import { BASE_URL } from "../api/mainApi.jsx";
import Footer from "./components/Footer.jsx";

const menuItems = [
  { name: "Americano", price: "Rs 150", img: "americano.jpg" },
  { name: "Blended Mocha", price: "Rs 315", img: "blended-mocha.jpg" },
  { name: "Blended Frappe", price: "Rs 280", img: "blended-frappe.jpg" },
  { name: "Cappuccino", price: "Rs 185", img: "cappuccino.jpg" },
  { name: "Caffe Latte", price: "Rs 180", img: "caffe-latte.jpg" },
  { name: "Milk tea", price: "Rs 80", img: "milk-tea.jpg" },
  { name: "Cafe latte with Cookie", price: "Rs 365", img: "latte-cookie.jpg" },
  { name: "Croissant", price: "Rs 120", img: "croissant.jpg" },
  { name: "Baguette", price: "Rs 120", img: "baguette.jpg" },
  { name: "Rolls", price: "Rs 150", img: "rolls.jpg" },
  { name: "Cheese cake", price: "Rs 300", img: "cheesecake.jpg" },
  { name: "Brownie with Icecream", price: "Rs 280", img: "brownie.jpg" },
  { name: "Iced Americano", price: "Rs 195", img: "iced-americano.jpg" },
  { name: "Flat white", price: "Rs 195", img: "flat-white.jpg" },
  { name: "Matcha Latte", price: "Rs 350", img: "matcha.jpg" },
];

const MenuPage = () => {
  const { data } = useGetAllMenuQuery();
  return (
    <div>
      <div className="min-h-screen bg-[#F6EDE0] py-12 px-6 sm:px-12 rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-32">
        {menuItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4  rounded-lg p-4">
            <img
              src={item.img}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div>
              <h4 className="text-md font-semibold font-Poppins text-[#050706]">
                {item.name}
              </h4>
              <p className="text-[#68737F] text-sm font-Poppins mt-1">
                {item.price}
              </p>
            </div>
          </div>
        ))}
        {data &&
          data.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4  rounded-lg p-4">
              <img
                src={`${BASE_URL}${item.image}`}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h4 className="text-md font-semibold font-Poppins text-[#050706]">
                  {item.title}
                </h4>
                <p className="text-[#68737F] text-sm font-Poppins mt-1">
                  {`Rs ${item.price}`}
                </p>
              </div>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default MenuPage;
