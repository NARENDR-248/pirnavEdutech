import React from "react";

const DepartmentForm = ({
  formData,
  handleChange,
  branches = [],
  errors = {},
}) => {
  return (
    <div className="space-y-5">
      {/* Department Name */}
      <div>
        <label className="block mb-2 text-sm font-medium text-slate-700">
          Department Name *
        </label>

        <input
          type="text"
          name="departmentName"
          value={formData.departmentName}
          onChange={handleChange}
          placeholder="Enter department name"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
        />

        {errors.departmentName && (
          <p className="mt-1 text-sm text-red-500">
            {errors.departmentName}
          </p>
        )}
      </div>

      {/* Department Code */}
      <div>
        <label className="block mb-2 text-sm font-medium text-slate-700">
          Department Code *
        </label>

        <input
          type="text"
          name="departmentCode"
          value={formData.departmentCode}
          onChange={handleChange}
          placeholder="Ex: HR001"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
        />

        {errors.departmentCode && (
          <p className="mt-1 text-sm text-red-500">
            {errors.departmentCode}
          </p>
        )}
      </div>

      {/* Branch */}
      <div>
        <label className="block mb-2 text-sm font-medium text-slate-700">
          Branch *
        </label>

        <select
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
        >
          <option value="">Select Branch</option>

          {/* ==========================================
              API DATA COMES FROM PARENT COMPONENT

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

          {branches.map((branch) => (
            <option
              key={branch.id}
              value={branch.name}
            >
              {branch.name}
            </option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="block mb-2 text-sm font-medium text-slate-700">
          Status
        </label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block mb-2 text-sm font-medium text-slate-700">
          Description
        </label>

        <textarea
          rows="4"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter department description"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default DepartmentForm;