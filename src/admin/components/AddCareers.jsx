import React, { useState } from "react";
import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
  Card,
  IconButton,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {
  useAddCareerMutation,
  useDeleteCareerMutation,
  useGetAllCareerQuery,
} from "../../api/careerApi.jsx";
import { TrashIcon } from "@heroicons/react/24/outline";
import { BASE_URL } from "../../api/mainApi.jsx";

// ✅ Yup Validation Schema
const careerSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  duration: Yup.string().required("Duration is required"),
  post: Yup.string().required("Post is required"),
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

const AddCareers = () => {
  const [showForm, setShowForm] = useState(false);
  const { user } = useSelector((state) => state.userSlice);
  const token = user.token;

  const [addCareer, { isLoading }] = useAddCareerMutation();
  const [deleteCareer] = useDeleteCareerMutation();
  const {
    data: careers = [],
    isLoading: loadingCareers,
    refetch,
  } = useGetAllCareerQuery();

  const handleDelete = async (id) => {
    try {
      await deleteCareer({ token, id }).unwrap();
      toast.success("Career deleted successfully");
      refetch();
    } catch (error) {
      toast.error(
        error?.data?.message || error?.message || "Failed to delete career"
      );
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <Typography variant="h4">Career Opportunities</Typography>
        <Button color="green" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Hide Form" : "Add Career"}
        </Button>
      </div>

      {/* Add Career Form */}
      {showForm && (
        <Formik
          initialValues={{
            title: "",
            description: "",
            image: "",
            imageReview: "",
            duration: "",
            post: "",
          }}
          validationSchema={careerSchema}
          onSubmit={async (val, { resetForm }) => {
            try {
              const formData = new FormData();
              formData.append("title", val.title);
              formData.append("description", val.description);
              formData.append("duration", val.duration);
              formData.append("post", val.post);
              formData.append("image", val.image);

              const res = await addCareer({ token, data: formData }).unwrap();
              toast.success(res.message || "Career added successfully");
              resetForm();
              setShowForm(false);
              refetch();
            } catch (error) {
              toast.error(
                error?.data?.message ||
                  error?.message ||
                  "Error while adding career"
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

                <Select
                  label="Select Duration"
                  value={values.duration}
                  onChange={(val) => setFieldValue("duration", val)}
                  name="duration"
                >
                  <Option value="1 week">1 Week</Option>
                  <Option value="2 week">2 Weeks</Option>
                  <Option value="1 month">1 Month</Option>
                  <Option value="1.5 month">1.5 Months</Option>
                  <Option value="2 month">2 Months</Option>
                  <Option value="3 month">3 Months</Option>
                </Select>
                {errors.duration && touched.duration && (
                  <p className="text-red-500 text-sm">{errors.duration}</p>
                )}

                <Input
                  label="Post"
                  name="post"
                  value={values.post}
                  onChange={handleChange}
                />
                {errors.post && touched.post && (
                  <p className="text-red-500 text-sm">{errors.post}</p>
                )}

                <Input
                  type="file"
                  name="image"
                  label="Upload Image"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) {
                      toast.error("No file selected");
                      return;
                    }
                    setFieldValue("imageReview", URL.createObjectURL(file));
                    setFieldValue("image", file);
                  }}
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
                  color="green"
                  fullWidth
                  loading={isLoading}
                >
                  Add Career
                </Button>
              </form>
            </Card>
          )}
        </Formik>
      )}

      {/* Career List */}
      <div className="mt-8 overflow-x-auto">
        <Typography variant="h5" className="mb-4">
          Current Careers
        </Typography>
        {loadingCareers ? (
          <Typography>Loading careers...</Typography>
        ) : careers.length === 0 ? (
          <Typography>No career posts available.</Typography>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 rounded shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-3 border-b">Image</th>
                <th className="text-left px-4 py-3 border-b">Title</th>
                <th className="text-left px-4 py-3 border-b">Post</th>
                <th className="text-left px-4 py-3 border-b">Duration</th>
                <th className="text-left px-4 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {careers.map((career) => (
                <tr key={career._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b">
                    <img
                      src={`${BASE_URL}${career.image}`}
                      alt={career.title}
                      className="h-14 w-14 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3 border-b">{career.title}</td>
                  <td className="px-4 py-3 border-b">{career.post}</td>
                  <td className="px-4 py-3 border-b">{career.duration}</td>
                  <td className="px-4 py-3 border-b">
                    <IconButton
                      variant="text"
                      color="red"
                      onClick={() => handleDelete(career._id)}
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

export default AddCareers;
