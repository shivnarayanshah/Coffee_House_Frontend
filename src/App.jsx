import { createBrowserRouter } from "react-router";
import HomePage from "./user/HomePage.jsx";
import { RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout.jsx";
import AdminPage from "./admin/components/AdminPage.jsx";
import AdminLogin from "./admin/AdminLogin.jsx";
import AddTrainings from "./admin/components/AddTrainings.jsx";
import AddServices from "./admin/components/AddServices.jsx";
import AddCareers from "./admin/components/AddCareers.jsx";
import AddFindUs from "./admin/components/AddFindUs.jsx";
import AddFaqs from "./admin/components/AddFaqs.jsx";
import AddTeamMembers from "./admin/components/AddTeamMembers.jsx";
import AddMenus from "./admin/components/AddMenus.jsx";
import ContactUsPage from "./user/ContactUsPage.jsx";
import ServicePage from "./user/ServicePage.jsx";
import TrainingPage from "./user/TrainingPage.jsx";
import AboutPage from "./user/AboutPage.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";
import AdminProtectedRoute from "./admin/AdminProtectedRoute.jsx";
import MenuPage from "./user/MenuPage.jsx";
import CareerPage from "./user/CareerPage.jsx";
import FaqsPage from "./user/FaqsPage.jsx";
import TeamPage from "./user/TeamPage.jsx";
import SearchPage from "./user/SearchPage.jsx";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/contactUs",
          element: <ContactUsPage />,
        },
        {
          path: "/careers",
          element: <CareerPage />,
        },
        {
          path: "/search",
          element: <SearchPage />,
        },
        {
          path: "/faqs",
          element: <FaqsPage />,
        },
        {
          path: "/teams",
          element: <TeamPage />,
        },
        {
          path: "/menuPage",
          element: <MenuPage />,
        },
        {
          path: "/services",
          element: <ServicePage />,
        },

        {
          path: "/trainings",
          element: <TrainingPage />,
        },
        {
          path: "/aboutUs",
          element: <AboutPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <AdminLogin />,
    },
    {
      path: "/admin",
      element: (
        <AdminProtectedRoute>
          <AdminLayout />
        </AdminProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <AdminPage />,
        },
        {
          path: "addTrainings",
          element: <AddTrainings />,
        },
        {
          path: "addServices",
          element: <AddServices />,
        },
        {
          path: "addCareers",
          element: <AddCareers />,
        },
        {
          path: "addFindus",
          element: <AddFindUs />,
        },
        {
          path: "addFaqs",
          element: <AddFaqs />,
        },
        {
          path: "addTeamMembers",
          element: <AddTeamMembers />,
        },
        {
          path: "addMenus",
          element: <AddMenus />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
