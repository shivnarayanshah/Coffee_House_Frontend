import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import reduxStore from "./store/reduxStore.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <Provider store={reduxStore}>
    <App />
    <Toaster toastOptions={{ duration: 2000 }} />
  </Provider>
);
