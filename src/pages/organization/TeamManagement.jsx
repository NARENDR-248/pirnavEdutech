import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutGrid,
  Plus,
  Edit3,
  Trash2,
  Users,
  UserCircle,
  FolderKanban,
  CheckCircle,
  X,
} from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import Card from '../../components/common/Card'
import DataTable from '../../components/common/DataTable'
import StatusBadge from '../../components/common/StatusBadge'
import Modal from '../../components/common/Modal'
import { Input, Select, Button } from '../../components/common/FormElements'
import { MOCK_TEAMS, TEAM_MEMBERS, TEAM_STATS } from '../../data/teamMockData'

const DEPARTMENTS = ['Engineering', 'Design', 'Marketing', 'Sales', 'Human Resources', 'Finance']
const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

const INITIAL_TEAM = {
  name: '',
  department: '',
  manager: '',
  description: '',
  status: 'active',
}

export default function TeamManagement() {
  const [teams, setTeams] = useState(MOCK_TEAMS)
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editTeam, setEditTeam] = useState(null)
  const [formData, setFormData] = useState(INITIAL_TEAM)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [detailTeam, setDetailTeam] = useState(null)

  const filtered = useMemo(() => {
    return teams.filter((t) => {
      const matchesSearch = !search ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.department.toLowerCase().includes(search.toLowerCase()) ||
        t.manager.toLowerCase().includes(search.toLowerCase())
      const matchesDept = !deptFilter || t.department === deptFilter
      const matchesStatus = !statusFilter || t.status === statusFilter
      return matchesSearch && matchesDept && matchesStatus
    })
  }, [teams, search, deptFilter, statusFilter])

  const openAdd = () => {
    setEditTeam(null)
    setFormData(INITIAL_TEAM)
    setModalOpen(true)
  }

  const openEdit = (team) => {
    setEditTeam(team)
    setFormData({
      name: team.name,
      department: team.department,
      manager: team.manager,
      description: team.description,
      status: team.status,
    })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (editTeam) {
      setTeams((prev) =>
        prev.map((t) => t.id === editTeam.id ? { ...t, ...formData } : t)
      )
    } else {
      const newTeam = {
        id: `team-${String(teams.length + 1).padStart(3, '0')}`,
        ...formData,
        membersCount: 0,
        members: [],
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        projects: [],
      }
      setTeams((prev) => [...prev, newTeam])
    }
    setModalOpen(false)
  }

  const handleDelete = (team) => {
    setTeams((prev) => prev.filter((t) => t.id !== team.id))
    setConfirmDelete(null)
  }

  const getInitial = (name) => name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  const columns = [
    {
      header: 'Team',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F59E0B]/10 to-[#2563EB]/10 flex items-center justify-center">
            <LayoutGrid className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{row.name}</p>
            <p className="text-xs text-slate-400">{row.description?.slice(0, 60)}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Department',
      accessor: 'department',
      render: (row) => (
        <div className="flex items-center gap-2">
          <FolderKanban className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-sm text-slate-600 dark:text-slate-300">{row.department}</span>
        </div>
      ),
    },
    {
      header: 'Manager',
      accessor: 'manager',
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#F59E0B]/20 to-[#2563EB]/20 flex items-center justify-center">
            <span className="text-[10px] font-bold text-[#F59E0B]">{getInitial(row.manager)}</span>
          </div>
          <span className="text-sm text-slate-700 dark:text-slate-300">{row.manager}</span>
        </div>
      ),
    },
    {
      header: 'Members',
      accessor: 'membersCount',
      render: (row) => (
        <div className="flex items-center gap-2">
          <Users className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{row.membersCount}</span>
          <div className="flex -space-x-1.5">
            {row.members?.slice(0, 3).map((m, i) => (
              <div
                key={m.id}
                className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2563EB]/30 to-[#7C3AED]/30 border-2 border-white dark:border-slate-800 flex items-center justify-center"
                title={m.name}
              >
                <span className="text-[8px] font-bold text-slate-600 dark:text-slate-300">
                  {getInitial(m.name)}
                </span>
              </div>
            ))}
            {row.membersCount > 3 && (
              <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 border-2 border-white dark:border-slate-800 flex items-center justify-center">
                <span className="text-[8px] font-semibold text-slate-400">+{row.membersCount - 3}</span>
              </div>
            )}
          </div>
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
            onClick={(e) => { e.stopPropagation(); setDetailTeam(row) }}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="View team details"
          >
            <Users className="w-4 h-4 text-slate-400 hover:text-[#2563EB] transition-colors" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); openEdit(row) }}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Edit team"
          >
            <Edit3 className="w-4 h-4 text-slate-400 hover:text-[#F59E0B] transition-colors" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setConfirmDelete(row) }}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Delete team"
          >
            <Trash2 className="w-4 h-4 text-slate-400 hover:text-[#EF4444] transition-colors" />
          </button>
        </div>
      ),
    },
  ]

  const statsCards = [
    { label: 'Total Teams', value: TEAM_STATS.total, icon: LayoutGrid, color: '#F59E0B' },
    { label: 'Active Teams', value: TEAM_STATS.active, icon: CheckCircle, color: '#10B981' },
    { label: 'Total Members', value: TEAM_STATS.totalMembers, icon: Users, color: '#2563EB' },
    { label: 'Avg Team Size', value: TEAM_STATS.avgTeamSize, icon: Users, color: '#7C3AED' },
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
        title="Team Management"
        subtitle="Create and manage teams across your organization"
        icon={LayoutGrid}
        actions={
          <Button onClick={openAdd} icon={Plus}>
            Create Team
          </Button>
        }
      />

      {/* Table */}
      <DataTable
        columns={columns}
        data={filtered}
        pageSize={5}
        searchable={true}
        searchPlaceholder="Search teams by name, department, or manager..."
        emptyTitle="No teams found"
        emptyDescription="Try adjusting your search or create a new team."
        emptyIcon={LayoutGrid}
        filters={
          <div className="flex gap-2">
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="px-3 py-2.5 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-700 dark:text-slate-300 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30"
            >
              <option value="">All Departments</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2.5 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-700 dark:text-slate-300 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30"
            >
              <option value="">All Status</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        }
      />

      {/* Add/Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editTeam ? 'Edit Team' : 'Create New Team'}
        description={editTeam ? `Update ${editTeam.name}` : 'Set up a new team'}
        size="lg"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} icon={editTeam ? null : Plus}>
              {editTeam ? 'Save Changes' : 'Create Team'}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="Team Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Frontend Platform"
            icon={LayoutGrid}
            required
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              options={DEPARTMENTS.map((d) => ({ value: d, label: d }))}
              placeholder="Select department"
              icon={FolderKanban}
            />
            <Input
              label="Team Manager"
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
              placeholder="Team description and goals..."
              rows={3}
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all duration-200 resize-none"
            />
          </div>
          <Select
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            options={STATUS_OPTIONS}
          />
        </div>
      </Modal>

      {/* Team Details Modal */}
      <Modal
        open={!!detailTeam}
        onClose={() => setDetailTeam(null)}
        title={detailTeam?.name}
        description={`${detailTeam?.department} · ${detailTeam?.membersCount} members`}
        size="lg"
        footer={
          <div className="flex justify-end">
            <Button variant="secondary" onClick={() => setDetailTeam(null)}>Close</Button>
          </div>
        }
      >
        {detailTeam && (
          <div className="space-y-6">
            {/* Projects */}
            {detailTeam.projects?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Projects</p>
                <div className="flex flex-wrap gap-2">
                  {detailTeam.projects.map((p) => (
                    <span key={p} className="px-3 py-1.5 bg-[#2563EB]/5 border border-[#2563EB]/20 rounded-lg text-xs font-medium text-[#2563EB]">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Members */}
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Team Members</p>
              <div className="space-y-2">
                {detailTeam.members?.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB]/20 to-[#7C3AED]/20 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-[#2563EB]">{getInitial(member.name)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{member.name}</p>
                        <p className="text-xs text-slate-400">{member.role}</p>
                      </div>
                    </div>
                    <StatusBadge status="active" />
                  </div>
                ))}
                {detailTeam.members?.length === 0 && (
                  <p className="text-sm text-slate-400 text-center py-4">No members assigned yet</p>
                )}
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-6 pt-4 border-t border-slate-100 dark:border-slate-700/50">
              <div>
                <p className="text-xs text-slate-400">Created</p>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{detailTeam.createdAt}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Status</p>
                <StatusBadge status={detailTeam.status} />
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <Modal
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Delete Team"
        description={`Are you sure you want to delete ${confirmDelete?.name}? Team members will be unlinked from this team.`}
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
