import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, ChevronsUpDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import SearchInput from './SearchInput'
import EmptyState from './EmptyState'

export default function DataTable({
  columns,
  data,
  pageSize = 10,
  searchable = true,
  searchPlaceholder = 'Search...',
  onRowClick,
  emptyTitle,
  emptyDescription,
  emptyIcon,
  emptyAction,
  loading = false,
  skeletonRows = 5,
  filters,
  onFilterChange,
}) {
  const [search, setSearch] = useState('')
  const [sortField, setSortField] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const [page, setPage] = useState(1)

  // Filter data
  const filtered = useMemo(() => {
    let result = [...data]

    // Search filter
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((row) =>
        columns.some((col) => {
          const val = col.accessor ? row[col.accessor] : ''
          return String(val).toLowerCase().includes(q)
        })
      )
    }

    // Sort
    if (sortField) {
      result.sort((a, b) => {
        const aVal = a[sortField]
        const bVal = b[sortField]
        if (aVal < bVal) return sortDir === 'asc' ? -1 : 1
        if (aVal > bVal) return sortDir === 'asc' ? 1 : -1
        return 0
      })
    }

    return result
  }, [data, search, sortField, sortDir])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400" />
    return sortDir === 'asc'
      ? <ChevronUp className="w-3.5 h-3.5 text-[#2563EB]" />
      : <ChevronDown className="w-3.5 h-3.5 text-[#2563EB]" />
  }

  // Loading skeleton
  if (loading) {
    return (
      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-[20px] overflow-hidden">
        {searchable && (
          <div className="p-4 border-b border-slate-100 dark:border-slate-700/50">
            <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
          </div>
        )}
        <div className="p-4">
          {Array.from({ length: skeletonRows }).map((_, i) => (
            <div key={i} className="flex gap-4 py-3 border-b border-slate-100 dark:border-slate-700/50 last:border-0">
              {columns.map((col, j) => (
                <div
                  key={j}
                  className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"
                  style={{ width: col.width || '100%', flex: col.flex || 1 }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-[20px] overflow-hidden">
      {/* Search & Filters */}
      {(searchable || filters) && (
        <div className="p-4 border-b border-slate-100 dark:border-slate-700/50 flex flex-col sm:flex-row gap-3">
          {searchable && (
            <SearchInput
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              placeholder={searchPlaceholder}
              onClear={() => { setSearch(''); setPage(1) }}
              className="sm:max-w-xs"
            />
          )}
          {filters && (
            <div className="flex gap-2 flex-wrap">
              {filters}
            </div>
          )}
        </div>
      )}

      {/* Table */}
      {paginated.length === 0 ? (
        <EmptyState
          title={emptyTitle || 'No results found'}
          description={emptyDescription || 'Try adjusting your search or filters.'}
          icon={emptyIcon}
          action={emptyAction}
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full" role="table" aria-label="Data table">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700/50">
                {columns.map((col) => (
                  <th
                    key={col.accessor || col.header}
                    className={`
                      px-4 py-3.5 text-left text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider
                      ${col.sortable !== false ? 'cursor-pointer select-none hover:text-slate-600 dark:hover:text-slate-300' : ''}
                    `}
                    style={{ width: col.width, minWidth: col.minWidth }}
                    onClick={() => col.sortable !== false && col.accessor && handleSort(col.accessor)}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col.header}</span>
                      {col.sortable !== false && col.accessor && (
                        <SortIcon field={col.accessor} />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {paginated.map((row, i) => (
                  <motion.tr
                    key={row.id || i}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ delay: i * 0.02 }}
                    onClick={() => onRowClick?.(row)}
                    className={`
                      border-b border-slate-50 dark:border-slate-800/50 last:border-0
                      transition-colors duration-150
                      ${onRowClick ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/30' : ''}
                    `}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.accessor || col.header}
                        className="px-4 py-3.5 text-sm text-slate-700 dark:text-slate-300"
                        style={{ minWidth: col.minWidth }}
                      >
                        {col.render
                          ? col.render(row)
                          : col.accessor
                            ? row[col.accessor]
                            : null}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {filtered.length > pageSize && (
        <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="First page"
            >
              <ChevronsLeft className="w-4 h-4 text-slate-500" />
            </button>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4 text-slate-500" />
            </button>

            <div className="flex items-center gap-1 mx-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (page <= 3) {
                  pageNum = i + 1
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = page - 2 + i
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                  aria-label={`Page ${pageNum}`}
                    className={`
                      w-8 h-8 rounded-lg text-xs font-medium transition-all
                      ${page === pageNum
                        ? 'bg-[#2563EB] text-white shadow-sm'
                        : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }
                    `}
                  >
                    {pageNum}
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
            <button
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Last page"
            >
              <ChevronsRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
