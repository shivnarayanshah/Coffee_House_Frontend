import { Button, Card, Typography } from "@material-tailwind/react";

import { Link, useLocation, useNavigate } from "react-router";
import {
  Squares2X2Icon, // Menus
  PresentationChartBarIcon, // Trainings
  BriefcaseIcon, // Services
  MapPinIcon, // Locations
  UserGroupIcon, // Team Members
  AcademicCapIcon, // Careers
  QuestionMarkCircleIcon, // FAQs
  ArrowRightOnRectangleIcon, // Logout
} from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { removeUser } from "../../api/userSlice.js";
// Requires Heroicons (Tailwind's icon library)

const Sidebar = () => {
  const location = useLocation();
  const currentLocation = location.pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sidebarItems = [
    { label: "Menus", path: "/admin/addMenus", icon: Squares2X2Icon },
    {
      label: "Trainings",
      path: "/admin/addTrainings",
      icon: PresentationChartBarIcon,
    },
    { label: "Services", path: "/admin/addServices", icon: BriefcaseIcon },
    { label: "Locations", path: "/admin/addFindus", icon: MapPinIcon },
    {
      label: "Team Members",
      path: "/admin/addTeamMembers",
      icon: UserGroupIcon,
    },
    { label: "Careers", path: "/admin/addCareers", icon: AcademicCapIcon },
    { label: "FAQS", path: "/admin/addFaqs", icon: QuestionMarkCircleIcon },
  ];

  const handleLogout = () => {
    dispatch(removeUser());
    navigate("/login");
  };

  return (
    <div className="h-full w-full p-4 bg-gray-50 border-r shadow-sm overflow-y-auto md:h-screen">
      {/* Top Section */}
      <div className="mb-6 sticky top-0 bg-gray-50 z-10 pb-4">
        <Typography
          variant="h5"
          className="text-center text-[#6F4E37] font-bold"
        >
          Admin Dashboard
        </Typography>
        <hr className="mt-4" />
      </div>

      {/* Sidebar Items */}
      <div className="flex flex-col gap-2">
        {sidebarItems.map(({ label, path, icon: Icon }) => {
          const isActive = currentLocation === path;

          return (
            <Link key={label} to={path}>
              <div
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? "bg-[#6F4E37] text-white"
                    : "hover:bg-gray-200 text-gray-800"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    isActive ? "text-white" : "text-[#6F4E37]"
                  }`}
                />
                <Typography
                  className={`text-sm font-medium ${
                    isActive ? "text-white" : ""
                  }`}
                >
                  {label}
                </Typography>
              </div>
            </Link>
          );
        })}

        {/* Logout */}
        <div className="mt-6">
          <Button
            fullWidth
            variant="outlined"
            color="brown"
            className="flex items-center justify-center gap-2 text-[#6F4E37] border-[#6F4E37] hover:bg-[#6F4E37] hover:text-white transition-all"
            onClick={handleLogout}
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <Typography>Logout</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
