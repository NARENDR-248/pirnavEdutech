import { motion } from "framer-motion";
import { Construction } from "lucide-react";

/**
 * PagePlaceholder — Renders a "Coming Soon" view for routes that
 * have been defined but not yet implemented.
 *
 * This keeps the routing structure solid and navigable without
 * requiring every page to be fully built up front.
 */
const PagePlaceholder = ({ title = "Page" }) => {
  return (
    <div className="flex items-center justify-center h-full min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-4 text-center px-6"
      >
        <div className="w-16 h-16 rounded-2xl bg-[#2563EB]/10 flex items-center justify-center">
          <Construction className="w-8 h-8 text-[#2563EB]" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {title}
        </h2>
        <p className="text-sm text-slate-400 max-w-xs">
          This page is under development and will be available soon.
        </p>
      </motion.div>
    </div>
  );
};

export default PagePlaceholder;
