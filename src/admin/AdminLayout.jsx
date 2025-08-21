import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import Sidebar from "./components/Sidebar.jsx";
import { useState } from "react";
import { Button } from "@material-tailwind/react";

const AdminLayout = () => {
  const { user } = useSelector((state) => state.userSlice);
  const [showSidebar, setShowSidebar] = useState(false);

  if (!user || user.role !== "admin") {
    return <Navigate to={"/login"} replace={true} />;
  }

  return (
    <div className="flex flex-col md:grid md:grid-cols-6 h-screen">
      {/* Toggle button for mobile */}
      <div className="md:hidden p-2 border-b flex justify-between items-center">
        <h1 className="text-lg font-bold">Admin Panel</h1>
        <Button onClick={() => setShowSidebar(!showSidebar)} size="sm">
          {showSidebar ? "Close" : "Menu"}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          showSidebar ? "block" : "hidden"
        } md:block col-span-1 border-r-2 h-full`}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="col-span-5 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
