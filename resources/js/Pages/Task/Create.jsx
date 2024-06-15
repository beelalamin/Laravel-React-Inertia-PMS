import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";

export default function Create({ auth, projects, users }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    image: "",
    name: "",
    status: "",
    description: "",
    due_date: "",
    priority: "",
    project_id: "",
    assigned_user_id: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("task.store"));
  };
  return (
    <Authenticated
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Create New Task
          </h2>
        </div>
      }
    >
      <Head title="Create New Task" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg"
              onSubmit={handleSubmit}
            >
              <div>
                <InputLabel
                  htmlFor="task_image_path"
                  value="Task Cover Image"
                />
                <TextInput
                  id="task_image_path"
                  type="file"
                  name="image"
                  className="mt-2 block w-full text-sm"
                  onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>

              <div className="mt-4 w-full">
                <InputLabel
                  htmlFor="project_id"
                  value="Select Project"
                  className="text-sm"
                />
                <SelectInput
                  id="project_id"
                  name="project_id"
                  value={data.project_id}
                  className="mt-2 block w-full text-sm"
                  onChange={(e) => setData("project_id", e.target.value)}
                >
                  <option value="">Select Project</option>
                  {projects &&
                    projects.data.map((project) => (
                      <option value={project.id} key={project.id}>
                        {project.name}
                      </option>
                    ))}
                </SelectInput>
                <InputError message={errors.project_id} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="task_name"
                  value="Task Name"
                  className="text-sm"
                />
                <TextInput
                  id="task_name"
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
                  htmlFor="task_description"
                  value="Description"
                  className="text-sm"
                />
                <TextAreaInput
                  id="task_description"
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
                    htmlFor="task_due_date"
                    value="Task Deadline"
                    className="text-sm"
                  />
                  <TextInput
                    id="task_due_date"
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
                    htmlFor="task_status"
                    value="Task Status"
                    className="text-sm"
                  />
                  <SelectInput
                    id="task_status"
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

              <div className="flex">
                <div className="mt-4 w-full mr-4">
                  <InputLabel
                    htmlFor="task_priority"
                    value="Task Priority"
                    className="text-sm"
                  />
                  <SelectInput
                    id="task_priority"
                    name="priority"
                    value={data.priority}
                    className="mt-2 block w-full text-sm"
                    onChange={(e) => setData("priority", e.target.value)}
                  >
                    <option value="">Select Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </SelectInput>
                  <InputError message={errors.status} className="mt-2" />
                </div>

                <div className="mt-4 w-full">
                  <InputLabel
                    htmlFor="task_assigned_user"
                    value="Assigned User"
                    className="text-sm"
                  />
                  <SelectInput
                    id="task_priority"
                    name="priority"
                    value={data.priority}
                    className="mt-2 block w-full text-sm"
                    onChange={(e) =>
                      setData("assigned_user_id", e.target.value)
                    }
                  >
                    <option value="">Select User</option>
                    {users &&
                      users.data.map((user) => (
                        <option value={user.id} key={user.id}>
                          {user.name}
                        </option>
                      ))}
                  </SelectInput>
                  <InputError
                    message={errors.assigned_user_id}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="mt-4 text-right">
                <Link
                  href={route("task.index")}
                  className="bg-gray-100 dark:bg-gray-700 dark:text-gray-100 dark:hover:dark:bg-gray-600 text-xs  py-2 px-4 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>
                <button
                  href={route("task.index")}
                  className="bg-emerald-500 py-2 px-4 text-xs text-white rounded shadow transition-all hover:bg-emerald-600 mr-2"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
