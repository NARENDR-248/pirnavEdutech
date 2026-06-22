import React from "react";
import {
  Building2,
  CheckCircle,
  XCircle,
  GitBranch,
} from "lucide-react";

const DepartmentStats = ({
  totalDepartments = 24,
  activeDepartments = 20,
  inactiveDepartments = 4,
  totalBranches = 5,
}) => {
  const stats = [
    {
      title: "Total Departments",
      value: totalDepartments,
      icon: Building2,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Active Departments",
      value: activeDepartments,
      icon: CheckCircle,
      bg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Inactive Departments",
      value: inactiveDepartments,
      icon: XCircle,
      bg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      title: "Total Branches",
      value: totalBranches,
      icon: GitBranch,
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {item.title}
                </p>

                <h3 className="mt-2 text-3xl font-bold text-slate-800">
                  {item.value}
                </h3>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${item.bg}`}
              >
                <Icon
                  size={28}
                  className={item.iconColor}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DepartmentStats;