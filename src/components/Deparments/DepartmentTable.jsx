import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const DepartmentTable = ({
    departments = [],
    onEdit,
    onDelete,
}) => {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Table Header */}
            <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-800">
                    Department List
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Manage all departments in your organization.
                </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                Department Name
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                Code
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                Branch
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                Status
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                Description
                            </th>

                            <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {departments.length > 0 ? (
                            departments.map((department) => (
                                <tr
                                    key={department.id}
                                    className="border-t border-slate-200 hover:bg-slate-50"
                                >
                                    <td className="px-6 py-4 font-medium text-slate-800">
                                        {department.departmentName}
                                    </td>

                                    <td className="px-6 py-4 text-slate-600">
                                        {department.departmentCode}
                                    </td>

                                    <td className="px-6 py-4 text-slate-600">
                                        {department.branch}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${department.status === "Active"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {department.status}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-slate-600">
                                        {department.description}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-3">
                                            <button
                                                onClick={() => onEdit(department)}
                                                className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                                            >
                                                <Pencil size={18} />
                                            </button>

                                            <button
                                                onClick={() => onDelete(department)}
                                                className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="py-10 text-center text-slate-500"
                                >
                                    No Departments Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DepartmentTable;