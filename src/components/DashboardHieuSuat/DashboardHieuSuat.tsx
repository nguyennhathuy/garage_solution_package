import React, { useState } from "react";

// --- MOCK DATA ---
const productionOrders = [
  {
    id: "LSX-25-08-115",
    status: "Đang chạy",
    profit: 150250000,
    timeActual: 74,
    timeStandard: 72,
    avgSpeed: 230,
    stages: [
      { name: "Sàn hấp", status: "Hoàn thành", wasteCost: 5500000, speed: 4375, time: "4/4 giờ" },
      { name: "Chẻ", status: "Hoàn thành", wasteCost: 49500000, speed: 257, time: "20/19 giờ" },
      { name: "Bắn màu NS", status: "Hoàn thành", wasteCost: 16500000, speed: 1262, time: "4/4 giờ" },
      { name: "Sấy", status: "Hoàn thành", wasteCost: 19800000, speed: 346, time: "14/13 giờ" },
      { name: "Cạo lụa", status: "Đang chạy", wasteCost: 2200000, speed: 218, time: "22/20 giờ" },
    ],
  },
  {
    id: "LSX-25-08-114",
    status: "Hoàn thành",
    profit: 185600000,
    timeActual: 68,
    timeStandard: 72,
    avgSpeed: 255,
    stages: [
      { name: "Sàn hấp", status: "Hoàn thành", wasteCost: 5200000, speed: 4400, time: "4/4 giờ" },
      { name: "Chẻ", status: "Hoàn thành", wasteCost: 42300000, speed: 280, time: "18/19 giờ" },
    ],
  },
];

// --- HELPERS ---
const formatCurrency = (value: any) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

const getStatusBadge = (status : any) => {
  const baseClasses =
    "px-2 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5";
  switch (status) {
    case "Đang chạy":
      return (
        <span className={`bg-blue-100 text-blue-800 ${baseClasses}`}>
          <span className="status-dot status-running"></span>Đang chạy
        </span>
      );
    case "Hoàn thành":
      return (
        <span className={`bg-green-100 text-green-800 ${baseClasses}`}>
          <span className="status-dot status-completed"></span>Hoàn thành
        </span>
      );
    case "Tạm dừng":
      return (
        <span className={`bg-orange-100 text-orange-800 ${baseClasses}`}>
          <span className="status-dot status-paused"></span>Tạm dừng
        </span>
      );
    default:
      return (
        <span className={`bg-gray-100 text-gray-800 ${baseClasses}`}>
          <span className="status-dot"></span>
          {status}
        </span>
      );
  }
};

const getStageStatusIcon = (status: any) => {
  switch (status) {
    case "Hoàn thành":
      return <span className="text-green-500">✓</span>;
    case "Đang chạy":
      return <span className="text-blue-500">▶</span>;
    case "Tạm dừng":
      return <span className="text-orange-500">❚❚</span>;
    default:
      return <span className="text-gray-400">⚫</span>;
  }
};

const getTimeProgress = (actual: any, standard: any) => {
  const percentage = Math.min((actual / standard) * 100, 100);
  const isDelayed = actual > standard;
  const colorClass = isDelayed ? "bg-red-500" : "bg-green-500";

  return (
    <div className="flex items-center gap-2">
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`${colorClass} h-2.5 rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className={`font-medium ${isDelayed ? "text-red-500" : "text-gray-700"}`}>
        {actual}/{standard} giờ
      </span>
    </div>
  );
};

const isTimeDelayed = (timeString: any) => {
  if (timeString === "-") return false;
  const [actual, standard] = timeString.replace(" giờ", "").split("/").map(Number);
  return actual > standard;
};

const isWasteCostHigh = (cost: any, orderProfit: any) => cost > orderProfit * 0.1 && cost > 0;
const isSpeedLow = (speed: any, avgSpeed: any) => speed < avgSpeed * 0.9 && speed > 0;

// --- MAIN COMPONENT ---
export default function DashboardHieuSuat() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedRows, setExpandedRows] = useState<any>({});

  const filteredOrders =
    statusFilter === "all"
      ? productionOrders
      : productionOrders.filter((order) => order.status === statusFilter);

  const toggleRow = (id: any) => {
    setExpandedRows((prev: any) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="py-[10px] px-[10px] mx-auto">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Báo cáo hiệu suất sản xuất</h1>
      </header>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-white p-4 rounded-lg shadow-sm border border-gray-300">
          <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-2">
            Lọc theo Trạng thái
          </label>
          <select
            id="statusFilter"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tất cả</option>
            <option value="Đang chạy">Đang chạy</option>
            <option value="Hoàn thành">Hoàn thành</option>
            <option value="Tạm dừng">Tạm dừng</option>
          </select>
        </div>

        {/* KPI Cards (Static Example) */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-300">
          <p className="text-sm text-gray-500">Tổng Lợi nhuận (Ước tính)</p>
          <p className="text-2xl font-bold text-gray-800">531,100,000 đ</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-300">
          <p className="text-sm text-gray-500">Số Lệnh Trễ Tiến độ</p>
          <p className="text-2xl font-bold text-red-500">2</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-300">
          <p className="text-sm text-gray-500">Tỷ lệ Hao hụt Trung bình</p>
          <p className="text-2xl font-bold text-gray-800">8.9%</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 border border-gray-300">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-3">Mã LSX</th>
                <th className="px-6 py-3">Trạng thái</th>
                <th className="px-6 py-3">Lợi nhuận Gộp</th>
                <th className="px-6 py-3">Tiến độ</th>
                <th className="px-6 py-3">Tốc độ TB</th>
                <th className="px-6 py-3 text-center">Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-500">
                    Không tìm thấy lệnh sản xuất nào.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <React.Fragment key={order.id}>
                    <tr className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {order.id}
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                      <td className="px-6 py-4 font-medium">{formatCurrency(order.profit)}</td>
                      <td className="px-6 py-4">{getTimeProgress(order.timeActual, order.timeStandard)}</td>
                      <td className="px-6 py-4">{order.avgSpeed} kg/giờ</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => toggleRow(order.id)}
                          className="p-2 rounded-full hover:bg-gray-200"
                        >
                          <svg
                            className={`arrow-icon w-5 h-5 text-gray-600 transition-transform ${
                              expandedRows[order.id] ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            ></path>
                          </svg>
                        </button>
                      </td>
                    </tr>

                    {expandedRows[order.id] && (
                      <tr className="bg-gray-50">
                        <td colSpan={6} className="p-4">
                          <h4 className="font-bold text-md text-gray-800 mb-3">
                            Chi tiết Hiệu suất Công đoạn - Lệnh {order.id}
                          </h4>
                          <table className="w-full text-sm">
                            <thead className="text-xs text-gray-600 bg-gray-200">
                              <tr>
                                <th className="px-4 py-2 text-left">Công đoạn</th>
                                <th className="px-4 py-2 text-left">Trạng thái</th>
                                <th className="px-4 py-2 text-left">Chi phí Hao hụt</th>
                                <th className="px-4 py-2 text-left">Tốc độ</th>
                                <th className="px-4 py-2 text-left">Thời gian</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.stages.map((stage, i) => (
                                <tr key={i} className="border-b border-gray-200 last:border-b-0">
                                  <td className="px-4 py-3 font-medium">{stage.name}</td>
                                  <td className="px-4 py-3">
                                    {getStageStatusIcon(stage.status)} {stage.status}
                                  </td>
                                  <td
                                    className={`px-4 py-3 ${
                                      isWasteCostHigh(stage.wasteCost, order.profit)
                                        ? "text-red-500 font-bold"
                                        : ""
                                    }`}
                                  >
                                    {formatCurrency(stage.wasteCost)}
                                  </td>
                                  <td
                                    className={`px-4 py-3 ${
                                      isSpeedLow(stage.speed, order.avgSpeed)
                                        ? "text-red-500 font-bold"
                                        : ""
                                    }`}
                                  >
                                    {stage.speed > 0 ? `${stage.speed} kg/giờ` : "-"}
                                  </td>
                                  <td
                                    className={`px-4 py-3 ${
                                      isTimeDelayed(stage.time)
                                        ? "text-red-500 font-bold"
                                        : ""
                                    }`}
                                  >
                                    {stage.time}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
