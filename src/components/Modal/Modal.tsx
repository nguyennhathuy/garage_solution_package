// components/Modal.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const Modal: React.FC<any> = ({ isOpen, onClose, title, children, mode }) => {
  const headerBg =
    mode === "create"
      ? "bg-green-100 text-green-800"
      : mode === "edit"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-gray-100 text-gray-800";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-lg relative flex flex-col"
            style={{ width: "90%", height: "90%" }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e: any) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className={`flex justify-between items-center rounded-t-2xl p-[10px]`}
            >
              <h2 className="text-lg font-semibold">{title}</h2>
              <button
                onClick={onClose}
                // className="rounded-full transition-transform hover:scale-125"
                className="grid h-8 w-8 place-items-center rounded-full bg-gray-100 text-xl transition hover:scale-110"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body (scroll riêng phần nội dung) */}
            <div className="flex-1 min-h-0 overflow-hidden border-t">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default Modal;
