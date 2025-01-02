import React from "react";
import { NavLink } from "react-router-dom";

const StaffSidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Staff Dashboard</h2>
      </div>
      <div className="flex flex-col space-y-4 mt-6">
        {/* Self Appraisal Link */}
        <NavLink
          to="/staff/self-appraisal"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-600 text-white px-4 py-2 rounded-md"
              : "text-lg hover:bg-gray-600 px-4 py-2 rounded-md"
          }
        >
          Self Appraisal
        </NavLink>

        {/* Manage Appraisal Link */}
        <NavLink
          to="/staff/manage-appraisal"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-600 text-white px-4 py-2 rounded-md"
              : "text-lg hover:bg-gray-600 px-4 py-2 rounded-md"
          }
        >
          Manage Appraisal
        </NavLink>

        {/* View Submissions Link */}
        <NavLink
          to="/staff/submissions"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-600 text-white px-4 py-2 rounded-md"
              : "text-lg hover:bg-gray-600 px-4 py-2 rounded-md"
          }
        >
          View Submissions
        </NavLink>
      </div>
    </div>
  );
};

export default StaffSidebar;
