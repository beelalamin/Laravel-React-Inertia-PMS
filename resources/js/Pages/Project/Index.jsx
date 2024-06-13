import Pagination from "@/Components/Pagination";
import Authenticatedlayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "../Constant";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import Toast from "@/Components/Toast";

export default function index({ auth, projects, queryParams = null, message }) {
  queryParams = queryParams || {};

  const searchField = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("project.index"), queryParams);
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

    router.get(route("project.index"), queryParams);
  };

  return (
    <div>
      <Authenticatedlayout
        user={auth.user}
        header={
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
              Projects
            </h2>
            <Link
              href={route("project.create")}
              className="bg-emerald-500 text-sm py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
            >
              Create New
            </Link>
          </div>
        }
      >
        <Head title="Projects" />

        {<Toast message={message} type={"success"} show={true} />}

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 text-gray-900 dark:text-gray-100 ">
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
                          name="Name"
                          sort_field={queryParams.sort_field}
                          sort_direction={queryParams.sort_direction}
                          sortField={sortField}
                        />
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
                        <th className="px-3 py-2">
                          <TextInput
                            className="w-full text-xs"
                            defaultValue={queryParams.name}
                            placeholder="Search by Project Title"
                            onBlur={(e) => searchField("name", e.target.value)}
                            onKeyPress={(e) => onKeyPress("name", e)}
                          />
                        </th>
                        <th className="px-3 py-2">
                          <SelectInput
                            className="w-full text-xs"
                            defaultValue={queryParams.status}
                            onChange={(e) =>
                              searchField("status", e.target.value)
                            }
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
                      {projects.data.map((project) => (
                        <tr
                          key={project.id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <td className="px-3 py-2">{project.id}</td>
                          <td className="px-3 py-2">
                            <img src={project.image_path} alt="" />
                          </td>
                          <td className="px-3 py-2 text-wrap w-80 hover:underline hover:text-gray-300 ">
                            <Link href={route("project.show", project.id)}>
                              {project.name}
                            </Link>
                          </td>
                          <td className="px-3 py-2 text-xs">
                            <span
                              className={
                                "px-2 py-1 rounded text-white " +
                                PROJECT_STATUS_CLASS_MAP[project.status]
                              }
                            >
                              {PROJECT_STATUS_TEXT_MAP[project.status]}
                            </span>
                          </td>
                          <td className="px-3 py-2">{project.due_date}</td>
                          <td className="px-3 py-2">{project.created_at}</td>
                          <td className="px-3 py-2">
                            {project.createdBy.name}
                          </td>
                          <td className="px-3 py-2 ">
                            <Link
                              href={route("project.edit", project.id)}
                              className="font-medium
                            text-blue-600
                            dark:text-blue-500
                            hover:underline mx-1"
                            >
                              Edit
                            </Link>
                            <Link
                              href={route("project.destroy", project.id)}
                              className="font-medium
                                                        text-red-600
                                                        dark:text-red-500
                                                        hover:underline mx-1"
                            >
                              Delete
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination links={projects.meta.links} />
              </div>
            </div>
          </div>
        </div>
      </Authenticatedlayout>
    </div>
  );
}
