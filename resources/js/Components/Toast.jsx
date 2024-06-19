import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";

export default function Toast({ message, type }) {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (message) {
      setShowToast(true);

      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
    }
  }, [message]);
  return (
    <div>
      {showToast && (
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
