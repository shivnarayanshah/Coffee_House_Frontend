import { useGetAllTeamQuery } from "../api/teamApi.jsx";
import Footer from "./components/Footer.jsx";
import { Typography } from "@material-tailwind/react";
import { BASE_URL } from "../api/mainApi.jsx";

const TeamPage = () => {
  const { data, isLoading } = useGetAllTeamQuery();

  return (
    <div className=" min-h-screen flex-grow px-4 sm:px-6 md:px-16 lg:px-32 py-10">
      <Typography
        variant="h4"
        className="text-center font-bold text-[#6F4E37] mb-10"
      >
        Meet Our Team Members
      </Typography>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading team members...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {data?.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white rounded-2xl shadow-md p-6 transition-transform duration-300 hover:scale-105"
            >
              <div className="w-28 h-28 mb-4">
                <img
                  src={`${BASE_URL}${member.image}`}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full border-4 border-[#6F4E37]"
                />
              </div>

              <h3 className="text-xl font-semibold text-[#6F4E37] text-center">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600 text-center mt-2">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default TeamPage;
