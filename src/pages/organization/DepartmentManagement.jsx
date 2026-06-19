import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Layers,
  Plus,
  Edit3,
  Trash2,
  Users,
  UserCircle,
  DollarSign,
  BarChart3,
} from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import Card from '../../components/common/Card'
import DataTable from '../../components/common/DataTable'
import StatusBadge from '../../components/common/StatusBadge'
import Modal from '../../components/common/Modal'
import { Input, Select, Button } from '../../components/common/FormElements'
import { DEPARTMENTS, DEPARTMENT_STATS, DEPARTMENT_STATUSES } from '../../data/departmentMockData'

const INITIAL_DEPT = {
  name: '',
  branch: '',
  manager: '',
  description: '',
  budget: '',
  status: 'active',
}

export default function DepartmentManagement() {
  const [departments, setDepartments] = useState(DEPARTMENTS)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editDept, setEditDept] = useState(null)
  const [formData, setFormData] = useState(INITIAL_DEPT)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const filtered = useMemo(() => {
    return departments.filter((d) => {
      const matchesSearch = !search ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.branch.toLowerCase().includes(search.toLowerCase()) ||
        d.manager.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = !statusFilter || d.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [departments, search, statusFilter])

  const openAdd = () => {
    setEditDept(null)
    setFormData(INITIAL_DEPT)
    setModalOpen(true)
  }

  const openEdit = (dept) => {
    setEditDept(dept)
    setFormData({
      name: dept.name,
      branch: dept.branch,
      manager: dept.manager,
      description: dept.description,
      budget: dept.budget,
      status: dept.status,
    })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (editDept) {
      setDepartments((prev) =>
        prev.map((d) => d.id === editDept.id ? { ...d, ...formData } : d)
      )
    } else {
      const newDept = {
        id: `dept-${String(departments.length + 1).padStart(3, '0')}`,
        ...formData,
        employeeCount: 0,
        headcount: { allocated: 0, filled: 0 },
      }
      setDepartments((prev) => [...prev, newDept])
    }
    setModalOpen(false)
  }

  const handleDelete = (dept) => {
    setDepartments((prev) => prev.filter((d) => d.id !== dept.id))
    setConfirmDelete(null)
  }

  const columns = [
    {
      header: 'Department',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7C3AED]/10 to-[#2563EB]/10 flex items-center justify-center">
            <Layers className="w-4 h-4 text-[#7C3AED]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{row.name}</p>
            <p className="text-xs text-slate-400">{row.description?.slice(0, 50)}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Branch',
      accessor: 'branch',
      render: (row) => (
        <span className="text-sm text-slate-600 dark:text-slate-300">{row.branch}</span>
      ),
    },
    {
      header: 'Manager',
      accessor: 'manager',
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7C3AED]/20 to-[#2563EB]/20 flex items-center justify-center">
            <UserCircle className="w-3.5 h-3.5 text-[#7C3AED]" />
          </div>
          <span className="text-sm text-slate-700 dark:text-slate-300">{row.manager}</span>
        </div>
      ),
    },
    {
      header: 'Employees',
      accessor: 'employeeCount',
      render: (row) => (
        <div className="flex items-center gap-2">
          <Users className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {row.employeeCount}
            <span className="text-xs text-slate-400 ml-1">/ {row.headcount?.allocated || 0}</span>
          </span>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Actions',
      accessor: 'actions',
      sortable: false,
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); openEdit(row) }}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Edit department"
          >
            <Edit3 className="w-4 h-4 text-slate-400 hover:text-[#7C3AED] transition-colors" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setConfirmDelete(row) }}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Delete department"
          >
            <Trash2 className="w-4 h-4 text-slate-400 hover:text-[#EF4444] transition-colors" />
          </button>
        </div>
      ),
    },
  ]

  const statsCards = [
    { label: 'Total Departments', value: DEPARTMENT_STATS.total, icon: Layers, color: '#7C3AED' },
    { label: 'Active', value: DEPARTMENT_STATS.active, icon: BarChart3, color: '#10B981' },
    { label: 'Total Employees', value: DEPARTMENT_STATS.totalEmployees, icon: Users, color: '#2563EB' },
    { label: 'Avg Size', value: DEPARTMENT_STATS.avgEmployees, icon: BarChart3, color: '#F59E0B' },
  ]

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsCards.map((stat, i) => (
          <Card key={stat.label} delay={i * 0.05} padding="p-5">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}08)` }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                <p className="text-xs text-slate-400">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Header */}
      <PageHeader
        title="Department Management"
        subtitle="Organize your departments and manage headcount"
        icon={Layers}
        actions={
          <Button onClick={openAdd} icon={Plus}>
            Add Department
          </Button>
        }
      />

      {/* Table */}
      <DataTable
        columns={columns}
        data={filtered}
        pageSize={5}
        searchable={true}
        searchPlaceholder="Search departments by name, branch, or manager..."
        emptyTitle="No departments found"
        emptyDescription="Try adjusting your search or add a new department."
        emptyIcon={Layers}
        filters={
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-700 dark:text-slate-300 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30"
          >
            <option value="">All Status</option>
            {DEPARTMENT_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        }
      />

      {/* Add/Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editDept ? 'Edit Department' : 'Add New Department'}
        description={editDept ? `Update ${editDept.name}` : 'Create a new department'}
        size="lg"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} icon={editDept ? null : Plus}>
              {editDept ? 'Save Changes' : 'Add Department'}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="Department Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Engineering"
            icon={Layers}
            required
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Branch"
              value={formData.branch}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
              placeholder="e.g. Headquarters"
              icon={Users}
            />
            <Input
              label="Manager"
              value={formData.manager}
              onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
              placeholder="e.g. Sarah Chen"
              icon={UserCircle}
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Department description..."
              rows={3}
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all duration-200 resize-none"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Budget"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              placeholder="e.g. $2.4M"
              icon={DollarSign}
            />
            <Select
              label="Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              options={DEPARTMENT_STATUSES}
            />
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <Modal
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Delete Department"
        description={`Are you sure you want to delete ${confirmDelete?.name}? All team data will be preserved but unlinked.`}
        size="sm"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setConfirmDelete(null)}>Cancel</Button>
            <Button variant="danger" onClick={() => handleDelete(confirmDelete)} icon={Trash2}>
              Delete
            </Button>
          </div>
        }
      />
    </div>
  )
}
