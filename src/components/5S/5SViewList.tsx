import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import dungCu from "../../assets/images/dung_cu.jpg";
import loiDi from "../../assets/images/loi_di.jpg";
import mayMoc from "../../assets/images/may_moc.jpg";
import racThai from "../../assets/images/rac_thai.jpg";
import sanXuong from "../../assets/images/san_xuong.png";

const completedChecklists = [
    {
        id: 1,
        productionOrderId: "LSX-25-08-115",
        supervisorName: "Nguyễn Văn An",
        completionTime: "10:30 22/08/2025",
        status: "Hoàn thành",
        notes:
            "Phát hiện máy chẻ số 3 có dấu hiệu kêu lạ, đã báo cho bộ phận bảo trì.",
        tasks: [
            {
                location: "Khu vực Sàn xưởng & Lối đi chung",
                name: "Sàn nhà sạch, khô ráo, không còn phế phẩm.",
                image: sanXuong,
            },
            {
                location: "Khu vực Sàn xưởng & Lối đi chung",
                name: "Lối đi và khu vực an toàn thông thoáng.",
                image: loiDi,
            },
            {
                location: "Khu vực Máy móc Thiết bị",
                name: "Bề mặt máy móc đã được lau sạch.",
                image: mayMoc,
            },
            {
                location: "Khu vực Dụng cụ & Bàn làm việc",
                name: "Dụng cụ cầm tay đã được cất về đúng vị trí.",
                image: dungCu,
            },
            {
                location: "Khu vực Quản lý Rác thải",
                name: "Rác đã phân loại đúng thùng chứa.",
                image: racThai,
            },
        ],
    },
    {
        id: 2,
        productionOrderId: "LSX-25-08-114",
        supervisorName: "Trần Thị Bình",
        completionTime: "17:00 21/08/2025",
        status: "Hoàn thành",
        notes: "Mọi thứ đều tốt.",
        tasks: [
            {
                location: "Khu vực Sàn xưởng & Lối đi chung",
                name: "Sàn nhà sạch, khô ráo, không còn phế phẩm.",
                image: sanXuong,
            },
            {
                location: "Khu vực Sàn xưởng & Lối đi chung",
                name: "Lối đi và khu vực an toàn thông thoáng.",
                image: loiDi,
            },
            {
                location: "Khu vực Máy móc Thiết bị",
                name: "Bề mặt máy móc đã được lau sạch.",
                image: mayMoc,
            },
        ],
    },
    {
        id: 3,
        productionOrderId: "LSX-25-08-113",
        supervisorName: "Nguyễn Văn An",
        completionTime: "09:15 21/08/2025",
        status: "Hoàn thành",
        notes: "",
        tasks: [
            {
                location: "Khu vực Dụng cụ & Bàn làm việc",
                name: "Dụng cụ cầm tay đã được cất về đúng vị trí.",
                image: dungCu,
            },
            {
                location: "Khu vực Quản lý Rác thải",
                name: "Rác đã phân loại đúng thùng chứa.",
                image: racThai,
            },
        ],
    },
];

export default function BaoCao5SList() {
    const [filteredData, setFilteredData] = useState(completedChecklists);
    const [selectedSupervisor, setSelectedSupervisor] = useState("all");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedReport, setSelectedReport] = useState<any>(null);

    const supervisors = [
        "all",
        ...new Set(completedChecklists.map((r) => r.supervisorName)),
    ];

    useEffect(() => {
        let data = completedChecklists;

        if (selectedSupervisor !== "all") {
            data = data.filter((r) => r.supervisorName === selectedSupervisor);
        }

        if (selectedDate) {
            data = data.filter((r) => {
                const parts = r.completionTime.split(" ")[1].split("/");
                const reportDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
                return reportDate === selectedDate;
            });
        }

        setFilteredData(data);
    }, [selectedSupervisor, selectedDate]);

    // const resetFilters = () => {
    //     setSelectedSupervisor("all");
    //     setSelectedDate("");
    //     setFilteredData(completedChecklists);
    // };

    const groupTasksByLocation = (tasks: any) => {
        const groups: any = {};
        tasks.forEach((t: any) => {
            if (!groups[t.location]) groups[t.location] = [];
            groups[t.location].push(t);
        });
        return groups;
    };

    return (
        <div className="flex-1 mt-[5px] mb-[5px] rounded-t-[10px] bg-white overflow-hidden">


            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm">
                <div>
                    <label
                        htmlFor="dateFilter"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Lọc theo Ngày:
                    </label>
                    <input
                        type="date"
                        id="dateFilter"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label
                        htmlFor="supervisorFilter"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Lọc theo Người Giám Sát:
                    </label>
                    <select
                        id="supervisorFilter"
                        value={selectedSupervisor}
                        onChange={(e) => setSelectedSupervisor(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        {supervisors.map((s, i) => (
                            <option key={i} value={s}>
                                {s === "all" ? "Tất cả" : s}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Ngày Hoàn Thành</th>
                                <th className="px-6 py-3">Mã Lệnh Sản Xuất</th>
                                <th className="px-6 py-3">Người Giám Sát</th>
                                <th className="px-6 py-3 text-center">Trạng thái</th>
                                <th className="px-6 py-3 text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((report: any) => (
                                    <tr
                                        key={report.id}
                                        className="bg-white border-b hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4">{report.completionTime}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {report.productionOrderId}
                                        </td>
                                        <td className="px-6 py-4">{report.supervisorName}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                                {report.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => setSelectedReport(report)}
                                                className="text-blue-600 hover:text-blue-800 font-medium"
                                            >
                                                Xem chi tiết
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="text-center py-10 text-gray-500"
                                    >
                                        Không tìm thấy báo cáo nào phù hợp.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedReport && (
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


                            <div className="overflow-y-auto p-4 max-h-[90vh]">
                                {/* Header */}
                                <div className="flex justify-between">
                                    <h2 className="text-xl font-semibold mb-4">Chi tiết báo cáo 5S</h2>
                                    <button
                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer"
                                        onClick={() => setSelectedReport(null)}
                                    >
                                        <FiX className="text-gray-700 text-lg" />
                                    </button>
                                </div>

                                {/* Body */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                                    <div className="bg-gray-50 p-3 rounded-md">
                                        <strong>Mã LSX:</strong> {selectedReport.productionOrderId}
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-md">
                                        <strong>Người Giám Sát:</strong>{" "}
                                        {selectedReport.supervisorName}
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-md">
                                        <strong>Thời gian:</strong> {selectedReport.completionTime}
                                    </div>
                                </div>

                                {Object.entries(groupTasksByLocation(selectedReport.tasks)).map(
                                    ([location, tasks]: any, idx: any) => (
                                        <div key={idx}>
                                            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">
                                                {location}
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {tasks.map((task: any, i: any) => (
                                                    <div
                                                        key={i}
                                                        className="border rounded-lg p-3"
                                                    >
                                                        <p className="text-sm text-gray-600 mb-2">
                                                            <i className="fas fa-check-circle text-green-500 mr-2"></i>
                                                            {task.name}
                                                        </p>
                                                        <img
                                                            src={task.image}
                                                            alt="Bằng chứng"
                                                            className="w-full h-auto rounded-md"
                                                            onError={(e: any) => {
                                                                e.target.onerror = null;
                                                                e.target.src =
                                                                    "https://placehold.co/400x300/fee2e2/b91c1c?text=Lỗi+Ảnh";
                                                            }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                )}

                                <div className="mt-6">
                                    <h4 className="text-lg font-semibold text-gray-700 mb-2">
                                        Ghi chú của Giám sát:
                                    </h4>
                                    <p className="text-gray-600 p-3 bg-gray-50 rounded-md">
                                        {selectedReport.notes || "Không có ghi chú."}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
