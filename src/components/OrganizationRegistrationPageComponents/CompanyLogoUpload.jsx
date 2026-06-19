import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Building2 } from 'lucide-react'

export default function CompanyLogoUpload({ logoPreview, onUpload }) {
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      onUpload(file)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="flex flex-col items-center gap-4"
    >
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative w-24 h-24 rounded-[20px] flex items-center justify-center overflow-hidden cursor-pointer
          border-2 border-dashed transition-all duration-200
          ${
            isDragging
              ? 'border-[#2563EB] bg-[#2563EB]/5'
              : 'border-slate-300 dark:border-slate-600 hover:border-[#2563EB]/50 bg-slate-50 dark:bg-slate-800/50'
          }`}
      >
        {logoPreview ? (
          <img src={logoPreview} alt="Company logo" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-1">
            <Building2 className="w-8 h-8 text-slate-400" />
            <Upload className="w-4 h-4 text-slate-400 absolute bottom-2 right-2" />
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files[0]
          if (file) onUpload(file)
        }}
      />

      <div className="text-center">
        <p className="text-sm font-medium text-[#2563EB] cursor-pointer hover:underline">
          Upload company logo
        </p>
        <p className="text-xs text-slate-400 mt-0.5">PNG, JPG, SVG. Max 2MB.</p>
      </div>
    </motion.div>
  )
}