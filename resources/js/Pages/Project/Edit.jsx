import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useEffect } from "react";

export default function Edit({ auth, project }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    name: project.name || "",
    status: project.status || "",
    description: project.description || "",
    due_date: project.due_date || "",
    _method: "PUT",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route("project.update", project.id));
  };
  return (
    <Authenticated
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit {project.name}
          </h2>
        </div>
      }
    >
      <Head title="Edit Project" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div>
              <img
                src={project.image_path}
                alt=""
                className="w-full h-64 object-cover"
              />
            </div>
            <form
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg"
              onSubmit={handleSubmit}
            >
              <div>
                <InputLabel
                  htmlFor="project_image_path"
                  value="Project Cover Image"
                />
                <TextInput
                  id="project_image_path"
                  type="file"
                  name="image"
                  className="mt-2 block w-full text-sm"
                  onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.message} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="project_name"
                  value="Project Name"
                  className="text-sm"
                />
                <TextInput
                  id="project_image_path"
                  type="text"
                  name="Title"
                  value={data.name}
                  className="mt-2 block w-full text-sm"
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="project_description"
                  value="Description"
                  className="text-sm"
                />
                <TextAreaInput
                  id="project_description"
                  name="description"
                  value={data.description}
                  className="mt-2 block w-full text-sm"
                  isFocused={true}
                  onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
              </div>
              <div className="flex">
                <div className="mt-4 w-full mr-4">
                  <InputLabel
                    htmlFor="project_due_date"
                    value="Project Deadline"
                    className="text-sm"
                  />
                  <TextInput
                    id="project_due_date"
                    type="date"
                    name="due_date"
                    value={data.due_date}
                    className="mt-2 block w-full text-sm"
                    isFocused={true}
                    onChange={(e) => setData("due_date", e.target.value)}
                  />
                  <InputError message={errors.due_date} className="mt-2" />
                </div>

                <div className="mt-4 w-full">
                  <InputLabel
                    htmlFor="project_status"
                    value="Project Status"
                    className="text-sm"
                  />
                  <SelectInput
                    id="project_status"
                    name="status"
                    value={data.status}
                    className="mt-2 block w-full text-sm"
                    onChange={(e) => setData("status", e.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </SelectInput>
                  <InputError message={errors.status} className="mt-2" />
                </div>
              </div>

              <div className="mt-4 text-right">
                <Link
                  href={route("project.index")}
                  className="bg-gray-100 dark:bg-gray-700 dark:text-gray-100 dark:hover:dark:bg-gray-600 text-xs  py-2 px-4 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>
                <button
                  href={route("project.index")}
                  className="bg-emerald-500 py-2 px-4 text-xs text-white rounded shadow transition-all hover:bg-emerald-600 mr-2"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
