import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Input,
  Typography,
  Card,
  Textarea,
  IconButton,
} from "@material-tailwind/react";
import { Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {
  useAddServiceMutation,
  useDeleteServiceMutation,
  useGetAllServiceQuery,
} from "../../api/serviceApi.jsx";
import { TrashIcon } from "@heroicons/react/24/outline";
import { BASE_URL } from "../../api/mainApi.jsx";

// Validation Schema
const serviceSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.mixed()
    .required("Image is required")
    .test("fileType", "Unsupported file format", (val) =>
      [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp",
        "image/gif",
      ].includes(val?.type)
    ),
});

const AddServices = () => {
  const [showForm, setShowForm] = useState(false);
  const { user } = useSelector((state) => state.userSlice);
  const token = user.token;

  const [addService, { isLoading }] = useAddServiceMutation();
  const [deleteService] = useDeleteServiceMutation();
  const {
    data: services = [],
    isLoading: loadingServices,
    refetch,
  } = useGetAllServiceQuery({ token });

  const handleDelete = async (id) => {
    try {
      await deleteService({ token, id }).unwrap();
      toast.success("Service deleted successfully");
      refetch();
    } catch (error) {
      toast.error(
        error?.data?.message || error?.message || "Failed to delete service"
      );
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Typography variant="h4">Services</Typography>
        <Button color="green" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Hide Form" : "Add Service"}
        </Button>
      </div>

      {/* Add Service Form */}
      {showForm && (
        <Formik
          initialValues={{
            title: "",
            description: "",
            image: "",
            imageReview: "",
          }}
          validationSchema={serviceSchema}
          onSubmit={async (val, { resetForm }) => {
            try {
              const formData = new FormData();
              formData.append("title", val.title);
              formData.append("description", val.description);
              formData.append("image", val.image);

              const res = await addService({ token, data: formData }).unwrap();
              toast.success(res.message || "Service added successfully.");
              resetForm();
              setShowForm(false);
              refetch();
            } catch (error) {
              toast.error(
                error?.data?.message ||
                  error?.message ||
                  "Error while adding service."
              );
            }
          }}
        >
          {({
            handleChange,
            handleSubmit,
            errors,
            values,
            touched,
            setFieldValue,
          }) => (
            <Card className="p-6 max-w-xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                />
                {errors.title && touched.title && (
                  <p className="text-red-500 text-sm">{errors.title}</p>
                )}

                <Textarea
                  label="Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                />
                {errors.description && touched.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}

                <Input
                  type="file"
                  name="image"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setFieldValue("imageReview", URL.createObjectURL(file));
                    setFieldValue("image", file);
                  }}
                  label="Upload Image"
                />
                {errors.image && touched.image && (
                  <p className="text-red-500 text-sm">{errors.image}</p>
                )}
                {!errors.image && values.imageReview && (
                  <img
                    src={values.imageReview}
                    alt="Preview"
                    className="h-40 w-40 object-cover mt-2"
                  />
                )}

                <Button
                  type="submit"
                  fullWidth
                  color="green"
                  loading={isLoading}
                >
                  Submit
                </Button>
              </form>
            </Card>
          )}
        </Formik>
      )}

      {/* Services Table */}
      <div className="overflow-x-auto mt-8">
        <Typography variant="h5" className="mb-4">
          Existing Services
        </Typography>

        {loadingServices ? (
          <Typography>Loading services...</Typography>
        ) : services.length === 0 ? (
          <Typography>No services found.</Typography>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 rounded shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-3 border-b">Image</th>
                <th className="text-left px-4 py-3 border-b">Title</th>
                <th className="text-left px-4 py-3 border-b">Description</th>
                <th className="text-left px-4 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b">
                    <img
                      src={`${BASE_URL}${service.image}`}
                      alt={service.title}
                      className="h-14 w-14 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3 border-b">{service.title}</td>
                  <td className="px-4 py-3 border-b">
                    {service.description?.slice(0, 40)}...
                  </td>
                  <td className="px-4 py-3 border-b">
                    <IconButton
                      variant="text"
                      color="red"
                      onClick={() => handleDelete(service._id)}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AddServices;
