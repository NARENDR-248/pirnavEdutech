import React from "react";
import { Search, RotateCcw } from "lucide-react";

const DepartmentFilters = ({
  searchTerm,
  setSearchTerm,
  selectedBranch,
  setSelectedBranch,
  selectedStatus,
  setSelectedStatus,
  handleReset,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Search Department */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search Department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-300 pl-10 pr-4 py-3 focus:border-blue-500 focus:outline-none"
          />

          {/* ==========================================
              API NOT REQUIRED HERE
              Search is usually handled in parent component
              OR sent as query params to API
          ========================================== */}
        </div>

        {/* Branch Filter */}
        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
        >
          <option value="">All Branches</option>

          {/* ==========================================
              API REQUIRED HERE

              GET /api/branches

              Example:
              branches.map(branch => (
                <option
                  key={branch.id}
                  value={branch.id}
                >
                  {branch.name}
                </option>
              ))
          ========================================== */}

          <option value="Hyderabad">Hyderabad</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Mumbai">Mumbai</option>
        </select>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-3 text-slate-700 hover:bg-slate-100 transition"
        >
          <RotateCcw size={18} />
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default DepartmentFilters;