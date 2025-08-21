import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Input,
  Typography,
  Card,
  IconButton,
} from "@material-tailwind/react";
import { Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {
  useAddLocationMutation,
  useDeleteLocationMutation,
  useGetAllLocationQuery,
} from "../../api/locationApi.jsx";
import { TrashIcon } from "@heroicons/react/24/outline";
import { BASE_URL } from "../../api/mainApi.jsx";

// Validation Schema
const findUsSchema = Yup.object().shape({
  location_name: Yup.string().required("Location name is required"),
  location_url: Yup.string().url("Enter a valid URL"),
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

const AddFindUs = () => {
  const [showForm, setShowForm] = useState(false);
  const { user } = useSelector((state) => state.userSlice);
  const token = user.token;

  const [addLocation, { isLoading }] = useAddLocationMutation();
  const [deleteLocation] = useDeleteLocationMutation();
  const {
    data: locations = [],
    isLoading: loadingLocations,
    refetch,
  } = useGetAllLocationQuery({ token });

  const handleDelete = async (id) => {
    try {
      await deleteLocation({ token, id }).unwrap();
      toast.success("Location deleted successfully");
      refetch();
    } catch (error) {
      toast.error(
        error?.data?.message || error?.message || "Failed to delete location"
      );
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Typography variant="h4">Find Us - Locations</Typography>
        <Button color="green" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Hide Form" : "Add Location"}
        </Button>
      </div>

      {/* Add Location Form */}
      {showForm && (
        <Formik
          initialValues={{
            location_name: "",
            location_url: "",
            image: "",
            imageReview: "",
          }}
          validationSchema={findUsSchema}
          onSubmit={async (val, { resetForm }) => {
            try {
              const formData = new FormData();
              formData.append("title", val.location_name);
              formData.append("url", val.location_url);
              formData.append("image", val.image);

              const res = await addLocation({ token, data: formData }).unwrap();
              toast.success(res.message || "Location added successfully");
              resetForm();
              setShowForm(false);
              refetch();
            } catch (error) {
              toast.error(
                error?.data?.message ||
                  error?.message ||
                  "Error while adding location."
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
                  label="Location Name"
                  name="location_name"
                  value={values.location_name}
                  onChange={handleChange}
                />
                {errors.location_name && touched.location_name && (
                  <p className="text-red-500 text-sm">{errors.location_name}</p>
                )}

                <Input
                  label="Google Maps URL"
                  name="location_url"
                  value={values.location_url}
                  onChange={handleChange}
                />
                {errors.location_url && touched.location_url && (
                  <p className="text-red-500 text-sm">{errors.location_url}</p>
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
                    alt="preview"
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

      {/* Location Table */}
      <div className="overflow-x-auto mt-8">
        <Typography variant="h5" className="mb-4">
          Existing Locations
        </Typography>

        {loadingLocations ? (
          <Typography>Loading locations...</Typography>
        ) : locations.length === 0 ? (
          <Typography>No locations found.</Typography>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 rounded shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-3 border-b">Image</th>
                <th className="text-left px-4 py-3 border-b">Location</th>
                <th className="text-left px-4 py-3 border-b">URL</th>
                <th className="text-left px-4 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <tr key={location._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b">
                    <img
                      src={`${BASE_URL}${location.image}`}
                      alt={location.title}
                      className="h-14 w-14 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3 border-b">{location.title}</td>
                  <td className="px-4 py-3 border-b">
                    <a
                      href={location.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {location.url?.slice(0, 30)}...
                    </a>
                  </td>
                  <td className="px-4 py-3 border-b">
                    <IconButton
                      variant="text"
                      color="red"
                      onClick={() => handleDelete(location._id)}
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

export default AddFindUs;
