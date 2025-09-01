import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Input,
  Typography,
  Textarea,
  Card,
  IconButton,
} from "@material-tailwind/react";
import { Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {
  useAddTeamMemberMutation,
  useDeleteTeamMemberMutation,
  useGetAllTeamQuery,
} from "../../api/teamApi.jsx";
import { TrashIcon } from "@heroicons/react/24/outline";
import { BASE_URL } from "../../api/mainApi.jsx";

// Validation Schema
const teamSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
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

const AddTeamMembers = () => {
  const [showForm, setShowForm] = useState(false);
  const { user } = useSelector((state) => state.userSlice);
  const token = user.token;

  const [addTeamMember, { isLoading }] = useAddTeamMemberMutation();
  const [deleteTeamMember] = useDeleteTeamMemberMutation();
  const {
    data: members = [],
    isLoading: loadingMembers,
    refetch,
  } = useGetAllTeamQuery({ token });

  const handleDelete = async (id) => {
    try {
      await deleteTeamMember({ token, id }).unwrap();
      toast.success("Team member deleted");
      refetch();
    } catch (error) {
      toast.error(
        error?.data?.message || error?.message || "Failed to delete member"
      );
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Typography variant="h4">Team Members</Typography>
        <Button color="green" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Hide Form" : "Add Member"}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Formik
          initialValues={{
            name: "",
            description: "",
            image: "",
            imageReview: "",
          }}
          validationSchema={teamSchema}
          onSubmit={async (val, { resetForm }) => {
            try {
              const formData = new FormData();
              formData.append("name", val.name);
              formData.append("description", val.description);
              formData.append("image", val.image);

              const res = await addTeamMember({
                token,
                data: formData,
              }).unwrap();
              toast.success(res.message || "Member added successfully");
              resetForm();
              setShowForm(false);
              refetch();
            } catch (error) {
              toast.error(
                error?.data?.message ||
                  error?.message ||
                  "Error while adding member"
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
                  label="Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
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
                  label="Upload Image"
                  onChange={(e) => {
                    const file = e.target.files[0];
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
                    alt="preview"
                    className="h-40 w-40 object-cover mt-2"
                  />
                )}

                <Button
                  type="submit"
                  color="green"
                  loading={isLoading}
                  fullWidth
                >
                  Add Member
                </Button>
              </form>
            </Card>
          )}
        </Formik>
      )}

      {/* Members Table */}
      <div className="overflow-x-auto mt-8">
        <Typography variant="h5" className="mb-4">
          Current Team Members
        </Typography>

        {loadingMembers ? (
          <Typography>Loading team...</Typography>
        ) : members.length === 0 ? (
          <Typography>No team members found.</Typography>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 rounded shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-3 border-b">Image</th>
                <th className="text-left px-4 py-3 border-b">Name</th>
                <th className="text-left px-4 py-3 border-b">Description</th>
                <th className="text-left px-4 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b">
                    <img
                      src={`${BASE_URL}${member.image}`}
                      alt={member.name}
                      className="h-14 w-14 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3 border-b">{member.name}</td>
                  <td className="px-4 py-3 border-b">{member.description}</td>
                  <td className="px-4 py-3 border-b">
                    <IconButton
                      variant="text"
                      color="red"
                      onClick={() => handleDelete(member._id)}
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

export default AddTeamMembers;
