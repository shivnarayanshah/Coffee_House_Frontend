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
  useAddMenuMutation,
  useDeleteMenuMutation,
  useGetAllMenuQuery,
} from "../../api/menuApi.jsx";
import { TrashIcon } from "@heroicons/react/24/outline";
import { BASE_URL } from "../../api/mainApi.jsx";

// Validation Schema
const menuSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  price: Yup.string().required("Price is required"),
  image: Yup.mixed()
    .required("Image is required")
    .test("fileType", "Unsupported file format", (val) => {
      return (
        val &&
        [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/webp",
          "image/gif",
        ].includes(val.type)
      );
    }),
});

const AddMenus = () => {
  const [showForm, setShowForm] = useState(false);
  const { user } = useSelector((state) => state.userSlice);
  const token = user.token;

  const [addMenu, { isLoading }] = useAddMenuMutation();
  const [deleteMenu] = useDeleteMenuMutation();
  const { data: menus = [], isLoading: loadingMenus } =
    useGetAllMenuQuery(token);

  const handleDelete = async (id) => {
    try {
      await deleteMenu({ token, id }).unwrap();
      toast.success("Menu deleted successfully");
    } catch (error) {
      toast.error(
        error?.data?.message || error?.message || "Failed to delete menu"
      );
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Typography variant="h4">Menus</Typography>
        <Button color="green" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Hide Form" : "Add Menu"}
        </Button>
      </div>

      {/* Add Menu Form */}
      {showForm && (
        <Formik
          initialValues={{
            title: "",
            image: "",
            imageReview: "",
            price: "",
          }}
          validationSchema={menuSchema}
          onSubmit={async (val, { resetForm }) => {
            try {
              const formData = new FormData();
              formData.append("title", val.title);
              formData.append("price", val.price);
              formData.append("image", val.image);

              const res = await addMenu({ token, data: formData }).unwrap();
              toast.success(res.message || "Menu added successfully");

              resetForm();
              setShowForm(false);
            } catch (error) {
              toast.error(
                error?.data?.message ||
                  error?.data ||
                  error?.message ||
                  "Error while adding menu"
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

                <Input
                  label="Price"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                />
                {errors.price && touched.price && (
                  <p className="text-red-500 text-sm">{errors.price}</p>
                )}

                <Input
                  type="file"
                  name="image"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setFieldValue("imageReview", URL.createObjectURL(file));
                    setFieldValue("image", file);
                  }}
                  label="Select Image"
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
                  loading={isLoading}
                  color="green"
                >
                  Submit
                </Button>
              </form>
            </Card>
          )}
        </Formik>
      )}

      {/* Menu Table */}
      <div className="overflow-x-auto mt-8">
        <Typography variant="h5" className="mb-4">
          Existing Menus
        </Typography>

        {loadingMenus ? (
          <Typography>Loading menus...</Typography>
        ) : menus.length === 0 ? (
          <Typography>No menu items found.</Typography>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 rounded shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-3 border-b">Image</th>
                <th className="text-left px-4 py-3 border-b">Title</th>
                <th className="text-left px-4 py-3 border-b">Price</th>
                <th className="text-left px-4 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((menu) => (
                <tr key={menu._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b">
                    <img
                      src={`${BASE_URL}${menu.image}`}
                      alt={menu.title}
                      className="h-14 w-14 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3 border-b">{menu.title}</td>
                  <td className="px-4 py-3 border-b">${menu.price}</td>
                  <td className="px-4 py-3 border-b">
                    <IconButton
                      variant="text"
                      color="red"
                      onClick={() => handleDelete(menu._id)}
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

export default AddMenus;
