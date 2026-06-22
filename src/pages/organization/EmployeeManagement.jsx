import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  UserPlus, Users, Edit3, Trash2, Mail, Phone,
  Building2, Layers, Search, Plus, CheckCircle
} from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import Card from '../../components/common/Card'
import DataTable from '../../components/common/DataTable'
import StatusBadge from '../../components/common/StatusBadge'
import Modal from '../../components/common/Modal'
import { Input, Select, Button } from '../../components/common/FormElements'

const MOCK_EMPLOYEES = [
  { id: 'emp-001', name: 'Jane Smith', email: 'jane@acme.com', role: 'Engineering Manager', department: 'Engineering', branch: 'Headquarters', status: 'active', phone: '+1 (555) 123-4001' },
  { id: 'emp-002', name: 'David Williams', email: 'david@acme.com', role: 'Senior Developer', department: 'Engineering', branch: 'Headquarters', status: 'active', phone: '+1 (555) 123-4002' },
  { id: 'emp-003', name: 'Sarah Chen', email: 'sarah@acme.com', role: 'Product Designer', department: 'Design', branch: 'London Office', status: 'active', phone: '+1 (555) 123-4003' },
  { id: 'emp-004', name: 'Marcus Johnson', email: 'marcus@acme.com', role: 'Marketing Lead', department: 'Marketing', branch: 'Headquarters', status: 'inactive', phone: '+1 (555) 123-4004' },
  { id: 'emp-005', name: 'Raj Patel', email: 'raj@acme.com', role: 'Data Analyst', department: 'Engineering', branch: 'Remote', status: 'active', phone: '+1 (555) 123-4005' },
]

const INITIAL_EMPLOYEE = {
  name: '',
  email: '',
  role: '',
  department: '',
  branch: '',
  phone: '',
  status: 'active',
}

const DEPARTMENTS = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance']
const BRANCHES = ['Headquarters', 'London Office', 'Remote']

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState(MOCK_EMPLOYEES)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editEmp, setEditEmp] = useState(null)
  const [formData, setFormData] = useState(INITIAL_EMPLOYEE)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const filtered = useMemo(() => {
    return employees.filter((e) => {
      const matchesSearch = !search ||
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.email.toLowerCase().includes(search.toLowerCase()) ||
        e.department.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = !statusFilter || e.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [employees, search, statusFilter])

  const openAdd = () => {
    setEditEmp(null)
    setFormData(INITIAL_EMPLOYEE)
    setModalOpen(true)
  }

  const openEdit = (emp) => {
    setEditEmp(emp)
    setFormData({
      name: emp.name,
      email: emp.email,
      role: emp.role,
      department: emp.department,
      branch: emp.branch,
      phone: emp.phone || '',
      status: emp.status,
    })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (editEmp) {
      setEmployees((prev) =>
        prev.map((e) => e.id === editEmp.id ? { ...e, ...formData } : e)
      )
    } else {
      const newEmp = {
        id: `emp-${String(employees.length + 1).padStart(3, '0')}`,
        ...formData,
      }
      setEmployees((prev) => [...prev, newEmp])
    }
    setModalOpen(false)
  }

  const handleDelete = (emp) => {
    setEmployees((prev) => prev.filter((e) => e.id !== emp.id))
    setConfirmDelete(null)
  }

  const columns = [
    {
      header: 'Employee',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2563EB]/20 to-[#7C3AED]/20 flex items-center justify-center">
            <span className="text-sm font-bold text-[#2563EB]">
              {row.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{row.name}</p>
            <p className="text-xs text-slate-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Role',
      accessor: 'role',
      render: (row) => <span className="text-sm text-slate-600 dark:text-slate-300">{row.role}</span>,
    },
    {
      header: 'Department',
      accessor: 'department',
      render: (row) => (
        <span className="text-sm text-slate-600 dark:text-slate-300">{row.department}</span>
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
          <button onClick={() => openEdit(row)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Edit3 className="w-4 h-4 text-slate-400 hover:text-[#2563EB] transition-colors" />
          </button>
          <button onClick={() => setConfirmDelete(row)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Trash2 className="w-4 h-4 text-slate-400 hover:text-[#EF4444] transition-colors" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Employees', value: employees.length, icon: Users, color: '#2563EB' },
          { label: 'Active', value: employees.filter(e => e.status === 'active').length, icon: CheckCircle, color: '#10B981' },
          { label: 'Departments', value: [...new Set(employees.map(e => e.department))].length, icon: Layers, color: '#7C3AED' },
          { label: 'Branches', value: [...new Set(employees.map(e => e.branch))].length, icon: Building2, color: '#F59E0B' },
        ].map((stat, i) => (
          <Card key={stat.label} delay={i * 0.05} padding="p-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}08)` }}>
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

      <PageHeader
        title="Employee Management"
        subtitle="Manage your organization's employees"
        icon={Users}
        actions={<Button onClick={openAdd} icon={Plus}>Add Employee</Button>}
      />

      <DataTable
        columns={columns}
        data={filtered}
        pageSize={5}
        searchable
        searchPlaceholder="Search employees by name, email, or department..."
        emptyTitle="No employees found"
        emptyDescription="Try adjusting your search or add a new employee."
        emptyIcon={Users}
        filters={
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-700 dark:text-slate-300 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        }
      />

      {/* Add/Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}
        title={editEmp ? 'Edit Employee' : 'Add New Employee'}
        description={editEmp ? `Update ${editEmp.name}` : 'Onboard a new team member'}
        size="lg"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} icon={editEmp ? null : Plus}>
              {editEmp ? 'Save Changes' : 'Add Employee'}
            </Button>
          </div>
        }>
        <div className="space-y-4">
          <Input label="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. John Doe" icon={Users} required />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@company.com" icon={Mail} required />
            <Input label="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000" icon={Phone} />
          </div>
          <Input label="Role / Title" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            placeholder="e.g. Software Engineer" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select label="Department" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              options={DEPARTMENTS.map(d => ({ value: d, label: d }))} placeholder="Select department" />
            <Select label="Branch" value={formData.branch} onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
              options={BRANCHES.map(b => ({ value: b, label: b }))} placeholder="Select branch" />
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)}
        title="Remove Employee" size="sm"
        description={`Remove ${confirmDelete?.name} from the organization?`}
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setConfirmDelete(null)}>Cancel</Button>
            <Button variant="danger" onClick={() => handleDelete(confirmDelete)} icon={Trash2}>Remove</Button>
          </div>
        } />
    </div>
  )
}
