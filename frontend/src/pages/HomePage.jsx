import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">
      <div className="max-w-7xl w-full bg-white shadow-lg rounded-lg p-8">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-blue-600">
            Employee Appraisal Management System
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Manage employee performance reviews, set goals, and track progress
            with ease.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-blue-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-blue-700">Appraisals</h2>
            <p className="mt-3 text-gray-600">
              Manage and track employee appraisals efficiently.
            </p>
          </div>

          <div className="bg-green-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-green-700">Goals</h2>
            <p className="mt-3 text-gray-600">
              Set and track goals for employees with clear KPIs.
            </p>
          </div>

          <div className="bg-yellow-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-yellow-700">Reports</h2>
            <p className="mt-3 text-gray-600">
              Generate reports based on appraisal and performance data.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
