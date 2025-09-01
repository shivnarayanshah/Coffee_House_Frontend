import React from "react";
import Footer from "./components/Footer.jsx";
import { Formik } from "formik";
import * as Yup from "yup";
import { Input, Textarea, Button, Typography } from "@material-tailwind/react";
import { useAddContactMutation } from "../api/contactApi.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

// Validation schema using Yup
const contactSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});

const ContactUsPage = () => {
  const [addContact, { isLoading }] = useAddContactMutation();
  const navigate = useNavigate();
  return (
    <div>
      <div className=" min-h-screen flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6 sm:p-8">
          <Typography
            variant="h4"
            className="mb-6 text-center text-[#6F4E37] font-bold"
          >
            Contact Us
          </Typography>

          <Formik
            initialValues={{
              name: "",
              email: "",
              subject: "",
              message: "",
            }}
            validationSchema={contactSchema}
            onSubmit={async (values, { resetForm }) => {
              try {
                const res = await addContact({ data: values }).unwrap();
                toast.success(res.message);
                resetForm();
                navigate("/");
              } catch (error) {
                toast.error(error?.data?.message || error?.message);
              }
            }}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    name="name"
                    label="Name"
                    onChange={handleChange}
                    value={values.name}
                  />
                  {errors.name && touched.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Input
                    name="email"
                    type="email"
                    label="Email"
                    onChange={handleChange}
                    value={values.email}
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Input
                    name="subject"
                    label="Subject"
                    onChange={handleChange}
                    value={values.subject}
                  />
                  {errors.subject && touched.subject && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <Textarea
                    name="message"
                    label="Message"
                    rows={5}
                    onChange={handleChange}
                    value={values.message}
                  />
                  {errors.message && touched.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  color="brown"
                  className="bg-[#6F4E37] hover:bg-[#5b3d2f]"
                  fullWidth
                  loading={isLoading}
                >
                  Send Message
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUsPage;
