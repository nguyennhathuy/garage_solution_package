import { useState, useEffect } from "react";

export default function BaoCao5S({ onClose }: any) {
  const totalTasks = 10;
  const [tasks, setTasks] = useState(
    Array.from({ length: totalTasks }, () => ({
      checked: false,
      image: "",
    }))
  );
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [completionTime, setCompletionTime] = useState("");
  const [notes, setNotes] = useState("");
  const [productionOrderId, setProductionOrderId] = useState("");
  const [supervisorName, setSupervisorName] = useState("");

  useEffect(() => {
    const completedTasks = tasks.filter(
      (t) => t.checked && t.image !== ""
    ).length;
    setProgress(completedTasks);
  }, [tasks]);

  const handleCheckboxChange = (index: any) => {
    const updated = [...tasks];
    updated[index].checked = !updated[index].checked;
    setTasks(updated);
  };

  const handleImageUpload = (index: any, file: any) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const updated = [...tasks];
      updated[index].image = e.target.result;
      setTasks(updated);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const now = new Date();
    const formattedTime = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")} ${now
      .getDate()
      .toString()
      .padStart(2, "0")}/${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${now.getFullYear()}`;
    setCompletionTime(formattedTime);
    setShowModal(true);
  };

  const resetForm = () => {
    setTasks(Array.from({ length: totalTasks }, () => ({ checked: false, image: "" })));
    setNotes("");
    setProductionOrderId("");
    setSupervisorName("");
    setCompletionTime("");
    setProgress(0);
    setShowModal(false);
  };

  const sections = [
    {
      title: "1. Khu vực Sàn xưởng & Lối đi chung",
      icon: "fa-shoe-prints",
      tasks: [
        "Sàn nhà sạch, khô ráo, không còn phế phẩm.",
        "Lối đi và khu vực an toàn thông thoáng.",
      ],
    },
    {
      title: "2. Khu vực Máy móc Thiết bị",
      icon: "fa-cogs",
      tasks: ["Bề mặt máy móc đã được lau sạch.", "Gầm máy và khu vực xung quanh không còn rác."],
    },
    {
      title: "3. Khu vực Dụng cụ & Bàn làm việc",
      icon: "fa-tools",
      tasks: ["Dụng cụ cầm tay đã được cất về đúng vị trí.", "Bàn làm việc, ghế ngồi sạch sẽ, gọn gàng."],
    },
    {
      title: "4. Kho & Lưu trữ",
      icon: "fa-warehouse",
      tasks: ["Thành phẩm lô cũ đã chuyển vào kho.", "Không còn bán thành phẩm lô cũ."],
    },
    {
      title: "5. Quản lý Rác thải",
      icon: "fa-recycle",
      tasks: ["Rác đã phân loại đúng thùng chứa.", "Đã thay túi rác mới trong xưởng."],
    },
  ];

  return (
    <>
      <div className="mx-auto bg-white rounded-2xl shadow-lg p-10">
        {/* Header */}
        <header className="text-center border-b pb-6 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Hình ảnh Hiện trường
          </h1>
        </header>

        {/* Form Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mã Lệnh Sản Xuất:
            </label>
            <input
              type="text"
              value={productionOrderId}
              onChange={(e) => setProductionOrderId(e.target.value)}
              placeholder="VD: LSX-25-08-115"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Người Giám Sát:
            </label>
            <input
              type="text"
              value={supervisorName}
              onChange={(e) => setSupervisorName(e.target.value)}
              placeholder="Nhập tên"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ngày Giờ Hoàn Thành:
            </label>
            <input
              type="text"
              value={completionTime}
              readOnly
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-1">
            <span className="text-base font-medium text-blue-700">Tiến độ Báo cáo</span>
            <span className="text-sm font-medium text-blue-700">
              {progress}/{totalTasks} nhiệm vụ
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${(progress / totalTasks) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Checklist */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {sections.map((section, sIndex) => (
            <div key={sIndex}>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
                <i className={`fas ${section.icon} mr-2 text-gray-500`}></i>
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.tasks.map((task, tIndex) => {
                  const globalIndex =
                    sIndex * 2 + tIndex; // vì mỗi section có 2 task
                  const current = tasks[globalIndex];
                  const completed = current.checked && current.image;
                  return (
                    <div
                      key={tIndex}
                      className={`p-4 rounded-lg border task-item ${
                        completed ? "bg-green-50 border-l-4 border-green-500" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <label className="flex-grow text-gray-700">{task}</label>
                        <input
                          type="checkbox"
                          checked={current.checked}
                          onChange={() => handleCheckboxChange(globalIndex)}
                          className="h-6 w-6 rounded border-gray-300 text-blue-600"
                        />
                      </div>
                      <div className="mt-3 flex items-center gap-4">
                        <label className="upload-btn flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                          <i className="fas fa-camera"></i> Upload Ảnh
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e: any) =>
                              handleImageUpload(globalIndex, e.target.files[0])
                            }
                          />
                        </label>
                        {current.image && (
                          <img
                            src={current.image}
                            alt="preview"
                            className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200"
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Notes */}
          <div className="mt-10">
            <label className="block text-sm font-medium text-gray-700">
              Ghi chú của Giám sát (nếu có):
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="VD: Phát hiện máy chẻ số 3 có dấu hiệu kêu lạ..."
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Submit */}
          <div className="flex gap-x-10 mt-8 pt-6 border-t">
            <button
              type="submit"
              disabled={progress !== totalTasks}
              className={`w-full md:w-auto flex items-center justify-center gap-3 py-3 px-12 text-lg font-medium rounded-md text-white shadow-sm focus:outline-none ${
                progress === totalTasks
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              <i className="fas fa-paper-plane"></i> Hoàn tất & Gửi Báo cáo
            </button>
            <button
                type="button"
                className='w-full md:w-auto flex items-center justify-center gap-3 py-3 px-12 text-lg font-medium rounded-md text-white shadow-sm focus:outline-none bg-blue-600 hover:bg-blue-700"'
                onClick={
                    () => {
                        onClose();
                    }
                }
            >
              <i className="fas fa-paper-plane"></i> Hủy
            </button>
          </div>
          
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg w-96 p-5 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <i className="fas fa-check text-green-600 text-2xl"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mt-2">
              Báo cáo đã được gửi!
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Checklist 5S và hình ảnh đã được ghi nhận. Nhà xưởng đã sẵn sàng
              cho lệnh sản xuất tiếp theo.
            </p>
            <button
              onClick={resetForm}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  );
}
