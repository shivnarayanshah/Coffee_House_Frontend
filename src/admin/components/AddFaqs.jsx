import React, { useState } from "react";
import {
  Button,
  Input,
  Textarea,
  Typography,
  Card,
  IconButton,
} from "@material-tailwind/react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  useAddFaqMutation,
  useDeleteFaqMutation,
  useGetAllFaqQuery,
} from "../../api/faqApi.jsx";
import { TrashIcon } from "@heroicons/react/24/outline";

// ✅ Validation Schema
const faqSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

const AddFaqs = () => {
  const [showForm, setShowForm] = useState(false);
  const { user } = useSelector((state) => state.userSlice);
  const token = user.token;

  const [addFaq, { isLoading }] = useAddFaqMutation();
  const [deleteFaq] = useDeleteFaqMutation();

  const {
    data: faqs = [],
    isLoading: faqLoading,
    refetch,
  } = useGetAllFaqQuery({ token });

  const handleDelete = async (id) => {
    try {
      await deleteFaq({ token, id }).unwrap();
      toast.success("FAQ deleted successfully");
      refetch();
    } catch (error) {
      toast.error(
        error?.data?.message || error?.message || "Failed to delete FAQ"
      );
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Typography variant="h4">Frequently Asked Questions</Typography>
        <Button color="green" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Hide Form" : "Add FAQ"}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Formik
          initialValues={{ title: "", description: "" }}
          validationSchema={faqSchema}
          onSubmit={async (val, { resetForm }) => {
            try {
              const formData = new FormData();
              formData.append("title", val.title);
              formData.append("description", val.description);

              const res = await addFaq({ token, data: formData }).unwrap();
              toast.success(res.message || "FAQ added successfully.");
              resetForm();
              setShowForm(false);
              refetch();
            } catch (error) {
              toast.error(
                error?.data?.message ||
                  error?.message ||
                  "Error while adding FAQ"
              );
            }
          }}
        >
          {({ handleChange, handleSubmit, errors, touched, values }) => (
            <Card className="p-6 max-w-xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Question"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                />
                {errors.title && touched.title && (
                  <p className="text-red-500 text-sm">{errors.title}</p>
                )}

                <Textarea
                  label="Answer"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                />
                {errors.description && touched.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}

                <Button
                  type="submit"
                  color="green"
                  fullWidth
                  loading={isLoading}
                >
                  Add FAQ
                </Button>
              </form>
            </Card>
          )}
        </Formik>
      )}

      {/* FAQ List */}
      <div className="mt-8 overflow-x-auto">
        <Typography variant="h5" className="mb-4">
          Existing FAQs
        </Typography>
        {faqLoading ? (
          <Typography>Loading FAQs...</Typography>
        ) : faqs.length === 0 ? (
          <Typography>No FAQs available.</Typography>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 rounded shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-3 border-b">Question</th>
                <th className="text-left px-4 py-3 border-b">Answer</th>
                <th className="text-left px-4 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {faqs.map((faq) => (
                <tr key={faq._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b">{faq.title}</td>
                  <td className="px-4 py-3 border-b">{faq.description}</td>
                  <td className="px-4 py-3 border-b">
                    <IconButton
                      variant="text"
                      color="red"
                      onClick={() => handleDelete(faq._id)}
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

export default AddFaqs;
