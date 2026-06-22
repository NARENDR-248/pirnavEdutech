import React, { useState } from "react";
import AddDepartmentModal from "../../components/Deparments/AddDepartmentModal";
import DepartmentFilters from "../../components/Deparments/DepartmentFilters";
import DepartmentStats from "../../components/Deparments/DepartmentStats";
import DepartmentTable from "../../components/Deparments/DepartmentTable";
import EditDepartmentModel from "../../components/Deparments/EditDepartmentModel";

const DepartmentManagementPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [departments, setDepartments] = useState([]);

  const [isEditOpen, setIsEditOpen] = useState(false);
const [selectedDepartment, setSelectedDepartment] = useState(null);

const handleEdit = (department) => {
  setSelectedDepartment(department);
  setIsEditOpen(true);
};

const handleUpdateDepartment = (updatedDepartment) => {
  setDepartments((prev) =>
    prev.map((dept) =>
      dept.id === updatedDepartment.id ? updatedDepartment : dept
    )
  );
};

  const handleReset = () => {
    setSearchTerm("");
    setSelectedBranch("");
    setSelectedStatus("");
  };



  const handleAddDepartment = (newDepartment) => {
    setDepartments((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...newDepartment,
      },
    ]);
  };

  const filteredDepartments = departments.filter((department) => {
    const matchesSearch =
      !searchTerm ||
      department.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBranch =
      !selectedBranch || department.branch === selectedBranch;

    const matchesStatus =
      !selectedStatus || department.status === selectedStatus;

    return matchesSearch && matchesBranch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Department Management
          </h1>
          <p className="text-slate-500 mt-2">
            Manage all departments across your organization.
          </p>
        </div>

        <DepartmentFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedBranch={selectedBranch}
          setSelectedBranch={setSelectedBranch}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          handleReset={handleReset}
        />

        <button
          onClick={() => setIsOpen(true)}
          className="rounded-lg bg-blue-600 px-5 py-3 text-white font-medium hover:bg-blue-700 transition"
        >
          + Add Department
        </button>
      </div>

      {/* Empty State */}
      {departments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10">
          <div className="flex flex-col items-center justify-center text-center py-20">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6">
              <span className="text-3xl">🏢</span>
            </div>

            <h2 className="text-2xl font-semibold text-slate-800 mb-3">
              No Departments Found
            </h2>

            <p className="text-slate-500 max-w-md mb-6">
              Create your first department to organize teams, employees,
              and business operations efficiently.
            </p>

            <button
              onClick={() => setIsOpen(true)}
              className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 transition"
            >
              Create Department
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Stats */}
          <DepartmentStats departments={filteredDepartments} />

          {/* Table */}
          <div className="mt-6">
            <DepartmentTable
              departments={departments}
  onEdit={handleEdit}
  onDelete={(department) => console.log(department)}
            />

            <EditDepartmentModel
  isOpen={isEditOpen}
  onClose={() => setIsEditOpen(false)}
  department={selectedDepartment}
  onUpdateDepartment={handleUpdateDepartment}
/>
          </div>
        </>
      )}

      {/* Modal - Always Render */}
      <AddDepartmentModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAddDepartment={handleAddDepartment}
      />
    </div>
  );
};

export default DepartmentManagementPage;