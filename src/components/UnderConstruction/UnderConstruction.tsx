import React from "react";
import { motion } from "framer-motion";
import { FaWrench, FaRegLightbulb } from "react-icons/fa";

const UnderConstruction = ({ page, hint, onBackHome }: any) => {
  const progress = 35; // có thể đổi số % tuỳ ý

  return (
    <div className="flex items-center justify-center h-[calc(100vh-50px)] p-6">
      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-3xl rounded-2xl border bg-white shadow-sm p-6"
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="rounded-2xl p-3 bg-gradient-to-br from-amber-100 to-amber-200">
            <FaWrench className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {page || "Chức năng"} đang được xây dựng
            </h2>
            <p className="text-gray-500 text-sm">
              Tính năng này đang trong quá trình hoàn thiện. Cảm ơn bạn đã chờ đợi!
            </p>
          </div>
        </div>

        {/* Progress */}
        {/* <div className="mt-5">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Tiến độ</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-amber-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
        </div> */}

        {/* Skeleton preview */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border p-4">
            <div className="h-4 w-1/2 bg-gray-100 rounded mb-3" />
            <div className="space-y-2">
              <div className="h-3 w-full bg-gray-100 rounded" />
              <div className="h-3 w-5/6 bg-gray-100 rounded" />
              <div className="h-3 w-2/3 bg-gray-100 rounded" />
            </div>
          </div>
          <div className="rounded-xl border p-4">
            <div className="h-4 w-1/3 bg-gray-100 rounded mb-3" />
            <div className="grid grid-cols-3 gap-2">
              <div className="h-8 bg-gray-100 rounded" />
              <div className="h-8 bg-gray-100 rounded" />
              <div className="h-8 bg-gray-100 rounded" />
            </div>
          </div>
        </div>

        {/* Hint */}
        <div className="mt-6 flex items-start gap-2 text-sm text-gray-600">
          <FaRegLightbulb className="mt-0.5 h-4 w-4 text-amber-500" />
          <p>{hint || "Bạn có ý tưởng/nội dung cần trong trang này? Hãy gửi góp ý nhé!"}</p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          {onBackHome && (
            <button
              onClick={onBackHome}
              className="px-3 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800"
            >
              Về Trang chủ
            </button>
          )}
          <button className="px-3 py-2 rounded-lg border hover:bg-gray-50">
            Gửi góp ý
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default UnderConstruction;
