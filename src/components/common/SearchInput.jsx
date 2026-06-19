import { Search, X } from 'lucide-react'

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  onClear,
  className = '',
}) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-label={placeholder}
          className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-slate-800/50
          border border-slate-200 dark:border-slate-700
          rounded-xl text-sm text-slate-900 dark:text-white
          placeholder:text-slate-400
          focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]
          transition-all duration-200"
      />
      {value && onClear && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5
            text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
