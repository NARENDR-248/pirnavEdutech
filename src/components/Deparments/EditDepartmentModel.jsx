import { useState,useEffect } from "react";
import DepartmentForm from "./DepartmentForm";

const EditDepartmentModal = ({
  isOpen,
  onClose,
  department,
  onUpdateDepartment,
}) => {
  const [formData, setFormData] = useState({
    departmentName: "",
    departmentCode: "",
    branch: "",
    status: "Active",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const branches = [
    { id: 1, name: "Hyderabad" },
    { id: 2, name: "Bangalore" },
    { id: 3, name: "Mumbai" },
  ];

  useEffect(() => {
    if (department) {
      setFormData({
        departmentName: department.departmentName || "",
        departmentCode: department.departmentCode || "",
        branch: department.branch || "",
        status: department.status || "Active",
        description: department.description || "",
      });
    }
  }, [department]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.departmentName.trim()) {
      newErrors.departmentName = "Department Name is required";
    }

    if (!formData.departmentCode.trim()) {
      newErrors.departmentCode = "Department Code is required";
    }

    if (!formData.branch) {
      newErrors.branch = "Branch is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onUpdateDepartment({
      ...department,
      ...formData,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Edit Department
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Update department details.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <div className="overflow-y-auto p-6 flex-1">
            <DepartmentForm
              formData={formData}
              handleChange={handleChange}
              branches={branches}
              errors={errors}
            />
          </div>

          {/* Footer */}
          <div className="border-t bg-white px-6 py-4">
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-300 px-5 py-2.5 text-slate-700 font-medium hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-white font-medium hover:bg-blue-700"
              >
                Update Department
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDepartmentModal;