import { Typography } from "@material-tailwind/react";

const locations = [
  { name: "Patan Durbar Square", image: "patan.jpg" },
  { name: "Lakeside, Pokhara", image: "pokhara.jpg" },
  { name: "Mandala Street", image: "mandala.jpg" },
  { name: "Namche Bazar", image: "namche.jpg" },
  { name: "Boudhanath Stupa", image: "boudha.jpg" },
  { name: "Pashupatinath Marga", image: "pashupati.jpg" },
  { name: "Thamel", image: "thamel.jpg" },
  { name: "Basantapur", image: "basantapur.jpg" },
];

const FindUsCard = () => {
  return (
    <>
      <div className="flex flex-col items-center text-center gap-6 mt-8 md:mt-16 lg:mt-24">
        <Typography variant="" className="text-[36px] font-Poppins font-bold">
          Find Us
        </Typography>
        <Typography className="text-[#68737F] font-Poppins max-w-[474px]">
          Himalayan Java outlets are available with the best coffee throughout
          the major cities of Nepal.
        </Typography>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 px-4">
        {locations.map((location, index) => (
          <div
            key={index}
            className="w-full max-w-[300px] mx-auto rounded-[20px] shadow-lg "
          >
            <img
              src={location.image}
              alt={location.name}
              className="w-full h-[203px] object-cover rounded-[20px]"
            />
            <Typography className="font-Poppins text-center my-4 text-sm px-2">
              {location.name}
            </Typography>
          </div>
        ))}
      </div>
    </>
  );
};

export default FindUsCard;
