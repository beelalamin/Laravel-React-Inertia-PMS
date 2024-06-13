import React from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

export default function TableHeading({
  name,
  sort_field,
  sort_direction,
  sortable = true,
  children,
  sortField = () => {},
}) {
  return (
    <th onClick={(e) => sortField(name)}>
      <div className="group relative flex px-3 py-2 flex items-center justify-between gap-1 cursor-pointer">
        <span className="absolute text-nowrap capitalize -ml-3 top-10 scale-0 transition-all rounded bg-gray-600 p-2 text-xs text-white group-hover:scale-100">
          Sort {(sort_direction || "Desc") + ": " + name}
        </span>

        {children}
        {name}
        {sortable && (
          <div>
            <ChevronUpIcon
              className={
                "w-4 " +
                (sort_field === name && sort_direction === "asc"
                  ? "text-white"
                  : "")
              }
            />
            <ChevronDownIcon
              className={
                "w-4 -mt-2 " +
                (sort_field === name && sort_direction === "desc"
                  ? "text-white"
                  : "")
              }
            />
          </div>
        )}
      </div>
    </th>
  );
}
