import { Typography } from "@material-tailwind/react";

export default function TestimonialCard() {
  return (
    <div className="min-h-[309px] bg-[url('/commentbgimg.jpg')] bg-cover bg-center text-white mt-16">
      <div className="bg-black/60 h-full w-full mx-auto px-4 sm:px-10 lg:px-24 xl:px-52 py-10">
        <div className="flex flex-col lg:flex-row w-full justify-between items-center gap-8">
          {/* Left Image */}
          <div className="relative border-white rounded-[10px] border-[10px] h-[393px] w-[100%] max-w-[350px] mx-auto lg:mx-0">
            <img
              src="/commentimg.jpg"
              className="h-full w-full absolute bottom-8 right-4 object-cover object-center rounded-[10px]"
              alt="User"
            />
          </div>

          {/* Right Text */}
          <div className="w-full max-w-[565px] font-Poppins mt-10 lg:mt-16">
            <div className="font-Satisfy text-[80px] sm:text-[100px] md:text-[120px] lg:text-[140px] text-start -mb-20 sm:-mb-24 md:-mb-28">
              “
            </div>

            <p className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] p-2 sm:p-4">
              The Himalayan Java Coffee house had the best coffee around
              Pokhara. The shop is quiet, clean and has an outdoor sitting area
              to enjoy your coffee and people watch. The staff are very friendly
              and very helpful. The muffins here are also very good.
            </p>

            <div className="font-Satisfy text-[80px] sm:text-[100px] md:text-[120px] lg:text-[140px] text-end -mt-6 sm:-mt-8 md:-mt-10">
              ”
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="flex flex-col justify-center md:justify-start text-lg sm:text-xl w-full max-w-[300px] text-center gap-4 mt-8 mx-auto lg:mx-0">
          <p className="font-Poppins">Jhon Doe, Student</p>
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold flex justify-around items-center">
            {Array(5)
              .fill()
              .map((_, i) => (
                <span className="text-yellow-400" key={i}>
                  ★
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
