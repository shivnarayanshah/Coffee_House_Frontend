import { Outlet } from "react-router";
import Header from "./user/components/Header.jsx";
import Footer from "./user/components/Footer.jsx";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
