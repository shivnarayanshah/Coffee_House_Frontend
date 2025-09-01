import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Input,
  Typography,
  Card,
  Textarea,
  IconButton,
  Option,
  Select,
} from "@material-tailwind/react";
import { Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {
  useAddTrainingMutation,
  useDeleteTrainingMutation,
  useGetAllTrainingQuery,
} from "../../api/trainingApi.jsx";
import { TrashIcon } from "@heroicons/react/24/outline";
import { BASE_URL } from "../../api/mainApi.jsx";

// Validation Schema
const trainingSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  duration: Yup.string().required("Duration is required"),
  amount: Yup.string().required("Amount is required"),
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

const AddTrainings = () => {
  const [showForm, setShowForm] = useState(false);
  const { user } = useSelector((state) => state.userSlice);
  const token = user.token;

  const [addTraining, { isLoading: isAdding }] = useAddTrainingMutation();
  const [deleteTraining] = useDeleteTrainingMutation();
  const {
    data: trainings = [],
    isLoading: isLoadingTrainings,
    refetch,
  } = useGetAllTrainingQuery({ token });

  const handleDelete = async (id) => {
    try {
      await deleteTraining({ token, id }).unwrap();
      toast.success("Training deleted successfully");
      refetch();
    } catch (error) {
      toast.error(
        error?.data?.message || error?.message || "Failed to delete training"
      );
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Typography variant="h4">Trainings</Typography>
        <Button color="green" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Hide Form" : "Add Training"}
        </Button>
      </div>

      {/* Add Training Form */}
      {showForm && (
        <Formik
          initialValues={{
            title: "",
            description: "",
            image: "",
            imageReview: "",
            duration: "",
            amount: "",
          }}
          validationSchema={trainingSchema}
          onSubmit={async (val, { resetForm }) => {
            try {
              const formData = new FormData();
              formData.append("title", val.title);
              formData.append("description", val.description);
              formData.append("duration", val.duration);
              formData.append("amount", val.amount);
              formData.append("image", val.image);

              const res = await addTraining({ token, data: formData }).unwrap();
              toast.success(res.message || "Training added successfully");

              resetForm();
              setShowForm(false);
              refetch();
            } catch (error) {
              toast.error(
                error?.data?.message ||
                  error?.message ||
                  "Error adding training"
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
                >
                  <Option value="1 week">1 Week</Option>
                  <Option value="2 week">2 Week</Option>
                  <Option value="1 month">1 Month</Option>
                  <Option value="1.5 month">1.5 Month</Option>
                  <Option value="2 month">2 Month</Option>
                  <Option value="3 month">3 Month</Option>
                </Select>
                {errors.duration && touched.duration && (
                  <p className="text-red-500 text-sm">{errors.duration}</p>
                )}

                <Input
                  type="number"
                  name="amount"
                  label="Enter Price"
                  value={values.amount}
                  onChange={handleChange}
                />
                {errors.amount && touched.amount && (
                  <p className="text-red-500 text-sm">{errors.amount}</p>
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
                  loading={isAdding}
                >
                  Submit
                </Button>
              </form>
            </Card>
          )}
        </Formik>
      )}

      {/* Trainings Table */}
      <div className="overflow-x-auto mt-8">
        <Typography variant="h5" className="mb-4">
          Existing Trainings
        </Typography>

        {isLoadingTrainings ? (
          <Typography>Loading trainings...</Typography>
        ) : trainings.length === 0 ? (
          <Typography>No training items found.</Typography>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 rounded shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-3 border-b">Image</th>
                <th className="text-left px-4 py-3 border-b">Title</th>
                <th className="text-left px-4 py-3 border-b">Duration</th>
                <th className="text-left px-4 py-3 border-b">Amount</th>
                <th className="text-left px-4 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trainings.map((training) => (
                <tr key={training._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b">
                    <img
                      src={`${BASE_URL}${training.image}`}
                      alt={training.title}
                      className="h-14 w-14 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3 border-b">{training.title}</td>
                  <td className="px-4 py-3 border-b">{training.duration}</td>
                  <td className="px-4 py-3 border-b">${training.amount}</td>
                  <td className="px-4 py-3 border-b">
                    <IconButton
                      variant="text"
                      color="red"
                      onClick={() => handleDelete(training._id)}
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

export default AddTrainings;
