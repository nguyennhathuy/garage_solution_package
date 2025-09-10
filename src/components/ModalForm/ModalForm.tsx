// import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LenhSanXuatModal from "../LenhSanXuat/LenhSanXuatModal";
import BaoCao5S from "../5S/5S";


export function ModalForm({
  isOpen,
  // initialData = {},
  onClose,
  type,
  setType
}: any) {
  // const [formData, setFormData] = useState<Partial<T>>(initialData);
  // useEffect(() => {
  //   setFormData(initialData);
  // }, [initialData]);
  if (type === 'Lệnh sản xuất' || type === 'Chụp ảnh sau sản xuất') {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}         // fade out khi đóng
          >
            <motion.div
              className="w-[90%] h-[90%] bg-white rounded-2xl shadow-lg w-[1380px] h-[630px] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}  // thu nhỏ + mờ khi đóng
              transition={{ duration: 0.25 }}
            >
              {(() => {
                switch (type) {
                  case "Lệnh sản xuất":
                    return <LenhSanXuatModal
                      onClose={onClose}
                      setType={setType}
                    />
                  case "Chụp ảnh sau sản xuất":
                    return <BaoCao5S
                      onClose={onClose}
                      setType={setType}
                    />
                  default:
                    return <div>Đang build .....</div>;
                }
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  } else {
    return null;
  }
}
