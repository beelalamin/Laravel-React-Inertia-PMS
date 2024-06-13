import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";

export default function Toast({ message, type, show = false }) {
  const [showToast, setShowToast] = useState(show);

  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [show]);
  return (
    <div>
      {message && showToast && (
        <div
          className={
            "absolute right-2 bottom-2 top- p-3 inline-block text-xs text-white rounded transition ease-in-out " +
            (type === "success" ? "bg-emerald-500" : "bg-red-500")
          }
        >
          <div className="flex">
            {type === "success" ? (
              <CheckCircleIcon className="w-4 mx-1" />
            ) : (
              <XCircleIcon className="w-4 mx-1" />
            )}

            {message}
          </div>
        </div>
      )}
    </div>
  );
}
