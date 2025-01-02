import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-50 flex items-center justify-center p-5">
      <div className="max-w-6xl w-full bg-white shadow-2xl rounded-lg p-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
            Employee Appraisal Management System
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Seamlessly manage employee performance reviews, set goals, and track
            progress with an intuitive and efficient platform.
          </p>
        </div>

        {/* Feature Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
            <h2 className="text-2xl font-semibold text-blue-700">Appraisals</h2>
            <p className="mt-3 text-gray-600">
              Manage and track employee appraisals with detailed forms and
              reviews.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-green-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
            <h2 className="text-2xl font-semibold text-green-700">Goals</h2>
            <p className="mt-3 text-gray-600">
              Set measurable goals and track achievements with KPIs for
              employees.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-yellow-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
            <h2 className="text-2xl font-semibold text-yellow-700">Reports</h2>
            <p className="mt-3 text-gray-600">
              Generate insightful reports to analyze performance and trends.
            </p>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="mt-12 text-center">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-700 transition transform hover:scale-105 shadow-lg">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
