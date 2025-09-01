import ServiceCard from "./components/ServiceCard.jsx";
import FindUsCard from "./components/FindUsCard.jsx";
import FromCropToCup from "./components/FromCropToCup.jsx";
import Menus from "./components/Menus.jsx";
import TestimonialCard from "./components/TestimonialCard.jsx";
import Footer from "./components/Footer.jsx";

const HomePage = () => {
  return (
    <div className="min-h-screen w-full  items-center justify-center   absolute -z-50 top-0 font-Poppins">
      <FromCropToCup />
      <div className="mx-4 md:mx-16 lg:mx-32 ">
        <ServiceCard />

        <FindUsCard />
        <Menus />
      </div>
      <TestimonialCard />
      <Footer />
    </div>
  );
};

export default HomePage;
