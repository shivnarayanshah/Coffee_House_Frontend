import { Button, Input, Typography, Card } from "@material-tailwind/react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useLoginUserMutation } from "../api/userApi.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { setUser } from "../api/userSlice.js";

// ✅ Validation schema
const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(40)
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const AdminLogin = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.userSlice);

  // Redirect if already logged in as admin
  useEffect(() => {
    if (user && user.role === "admin") {
      navigate("/admin");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md p-6 shadow-md bg-white">
        <Typography variant="h4" className="text-center text-[#6F4E37]">
          Admin Login
        </Typography>

        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={loginSchema}
          onSubmit={async (val) => {
            try {
              const payload = {
                email: val.email,
                password: val.password,
              };

              const response = await loginUser(payload).unwrap();

              if (response.role === "admin") {
                dispatch(setUser(response));
                toast.success("Logged in successfully");
                navigate("/admin");
              } else {
                toast.error("Access denied: Not an admin");
              }
            } catch (error) {
              toast.error(
                error?.data?.message ||
                  error?.data ||
                  error?.message ||
                  "Login failed"
              );
            }
          }}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <Input
                  name="email"
                  label="Email"
                  type="email"
                  onChange={handleChange}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Input
                  name="password"
                  label="Password"
                  type="password"
                  onChange={handleChange}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <Input
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  onChange={handleChange}
                  value={values.confirmPassword}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <Button type="submit" color="green" fullWidth loading={isLoading}>
                Login
              </Button>
            </form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default AdminLogin;
