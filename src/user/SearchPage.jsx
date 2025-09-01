import { useSearchParams } from "react-router-dom";
import { useSearchAllQuery } from "../api/searchApi.jsx";
import Footer from "./components/Footer.jsx";
import { BASE_URL } from "../api/mainApi";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  const { data, isLoading, isError } = useSearchAllQuery(keyword);

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (isError || !data)
    return <div className="p-8 text-center">Something went wrong.</div>;

  const { menuResults, serviceResults, trainingResults, findUsResult } = data;

  const isAllEmpty =
    menuResults.length === 0 &&
    serviceResults.length === 0 &&
    trainingResults.length === 0 &&
    findUsResult.length === 0;

  const Section = ({ title, items }) =>
    items.length > 0 && (
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-[#6F4E37]">{title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg  shadow-md hover:shadow-2xl transition-all"
            >
              {item.image && (
                <img
                  src={`${BASE_URL}${item.image}`}
                  alt={item.title}
                  className="h-20 w-full object-contain rounded-t-lg"
                />
              )}
              <div className="p-4">
                <h4 className="text-lg font-semibold text-[#6F4E37]">
                  {item.title}
                </h4>
                {item.description && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-4">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <div>
      <div className=" min-h-screen p-6 sm:p-10 max-w-6xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-center mb-10">
          Search Results for:{" "}
          <span className="text-[#6F4E37]">"{keyword}"</span>
        </h2>

        {isAllEmpty ? (
          <div className="text-center text-gray-500 text-lg">
            No matches found for{" "}
            <span className="text-[#6F4E37]">"{keyword}"</span>
          </div>
        ) : (
          <>
            <Section title="Menu Items" items={menuResults} />
            <Section title="Services" items={serviceResults} />
            <Section title="Trainings" items={trainingResults} />
            <Section title="Find Us" items={findUsResult} />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
