import React from "react";
import TableHeading from "./TableHeading";
import { router, Link } from "@inertiajs/react";
import Pagination from "./Pagination";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "../Pages/Constant";

export default function TaskTable({
  tasks,
  queryParams = null,
  hideProjectCol = true,
}) {
  queryParams = queryParams || {};

  const searchField = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("task.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchField(name, e.target.value);
  };

  const sortField = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }

    router.get(route("task.index"), queryParams);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure?");

    if (!confirm) {
      return;
    }
    router.delete(route("task.destroy", id));
  };

  return (
    <div>
      <div className="overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-sm text-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
            <tr className="border-gray-500">
              <TableHeading
                name="ID"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortField={sortField}
              />
              <th className="px-3 py-2 w-10">Image</th>

              <TableHeading
                name="Task Name"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortField={sortField}
              />
              {!hideProjectCol && (
                <th className="px-3 py-2 w-10">Project Name</th>
              )}
              <TableHeading
                name="Status"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortField={sortField}
              />

              <TableHeading
                name="Created At"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortField={sortField}
              />

              <TableHeading
                name="Due Date"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortField={sortField}
              />
              <th className="px-3 py-2">Created By</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>

          <thead className="text-sm text-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
            <tr className="border-gray-500">
              <th className="px-3 py-2"></th>
              <th className="px-3 py-2 w-10"></th>
              <th className="px-3 py-2 w-10"></th>
              <th className="px-3 py-2">
                <TextInput
                  className="w-full text-xs"
                  defaultValue={queryParams.name}
                  placeholder="Search by task Title"
                  onBlur={(e) => searchField("name", e.target.value)}
                  onKeyPress={(e) => onKeyPress("name", e)}
                />
              </th>
              <th className="px-3 py-2">
                <SelectInput
                  className="w-full text-xs"
                  defaultValue={queryParams.status}
                  onChange={(e) => searchField("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
              </th>
              <th className="px-3 py-2"></th>
              <th className="px-3 py-2"></th>
              <th className="px-3 py-2"></th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>

          <tbody>
            {tasks &&
              tasks.data.map((task) => (
                <tr
                  key={task.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-3 py-2">{task.id}</td>
                  <td className="px-3 py-2">
                    <img src={task.image_path} alt="" />
                  </td>
                  <td className="px-3 py-2 text-wrap w-80">{task.name}</td>
                  {!hideProjectCol && (
                    <td className="px-3 py-2 text-wrap w-80">
                      {task.project.name}
                    </td>
                  )}
                  <td className="px-3 py-2 text-xs">
                    <span
                      className={
                        "px-2 py-1 rounded text-white " +
                        TASK_STATUS_CLASS_MAP[task.status]
                      }
                    >
                      {TASK_STATUS_TEXT_MAP[task.status]}
                    </span>
                  </td>
                  <td className="px-3 py-2">{task.due_date}</td>
                  <td className="px-3 py-2">{task.created_at}</td>
                  <td className="px-3 py-2">{task.createdBy.name}</td>
                  <td className="px-3 py-2 ">
                    <Link
                      href={route("task.edit", task.id)}
                      className="font-medium
                            text-blue-600
                            dark:text-blue-500
                            hover:underline mx-1"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={(e) => handleDelete(task.id)}
                      className="font-medium
                                                        text-red-600
                                                        dark:text-red-500
                                                        hover:underline mx-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination links={tasks && tasks.meta.links} />
    </div>
  );
}
