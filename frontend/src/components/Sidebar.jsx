import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      </div>
      <div className="flex flex-col space-y-4 mt-6">
        {/* Manage Appraisal Questions Link */}
        <NavLink
          to="/admin/questions"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-600 text-white px-4 py-2 rounded-md"
              : "text-lg hover:bg-gray-600 px-4 py-2 rounded-md"
          }
        >
          Manage Appraisal Questions
        </NavLink>

        {/* Manage Participants Link */}
        <NavLink
          to="/admin/participants"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-600 text-white px-4 py-2 rounded-md"
              : "text-lg hover:bg-gray-600 px-4 py-2 rounded-md"
          }
        >
          Manage Participants
        </NavLink>

        {/* View All Submissions Link */}
        <NavLink
          to="/admin/submissions"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-600 text-white px-4 py-2 rounded-md"
              : "text-lg hover:bg-gray-600 px-4 py-2 rounded-md"
          }
        >
          View All Submissions
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
