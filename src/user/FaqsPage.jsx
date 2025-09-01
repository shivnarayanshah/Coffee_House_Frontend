import { useGetAllFaqQuery } from "../api/faqApi.jsx";
import Footer from "./components/Footer.jsx";
import { Typography } from "@material-tailwind/react";
import { useState } from "react";

const FaqsPage = () => {
  const { data, isLoading } = useGetAllFaqQuery();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" min-h-screen flex-grow px-4 sm:px-8 md:px-20 lg:px-40 py-10 bg-[#fdfaf7]">
      <Typography
        variant="h4"
        className="text-center font-bold text-[#6F4E37] mb-8"
      >
        Frequently Asked Questions
      </Typography>

      {isLoading ? (
        <p className="text-center">Loading FAQs...</p>
      ) : (
        <div className="space-y-4">
          {data?.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-sm transition-all duration-200"
            >
              <button
                className="w-full text-left px-5 py-4 flex justify-between items-center hover:bg-gray-50"
                onClick={() => toggleAnswer(index)}
              >
                <span className="font-medium text-[#333]">{faq.title}</span>
                <span className="text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-5 pb-4 text-[#555] text-sm">
                  {faq.description}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default FaqsPage;
