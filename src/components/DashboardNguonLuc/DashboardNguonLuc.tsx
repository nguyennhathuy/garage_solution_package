import React, { useEffect, useState } from "react";

export default function DashboardNguonLuc() {
  // --- MOCK DATA ---
    const productionOrders = [
        {
            id: "LSX-25-08-115",
            stages: [
            { name: "Sàn hấp", speed: 4375, time: "4/4 giờ", resource: "Lò Hấp #1" },
            { name: "Chẻ", speed: 257, time: "20/19 giờ", resource: "15 NC" },
            { name: "Bắn màu NS", speed: 1262, time: "4/4 giờ", resource: "Máy BM-03" },
            { name: "Sấy", speed: 346, time: "14/13 giờ", resource: "Lò Sấy #2" },
            { name: "Cạo lụa", speed: 218, time: "22/20 giờ", resource: "25 NC" },
            { name: "Bắn màu TP", speed: 0, time: "-", resource: "-" },
            { name: "Phân loại", speed: 0, time: "-", resource: "-" },
            { name: "Đóng cont", speed: 0, time: "-", resource: "-" },
            ],
        },
        {
            id: "LSX-25-08-114",
            stages: [
            { name: "Sàn hấp", speed: 4400, time: "4/4 giờ", resource: "Lò Hấp #2" },
            { name: "Chẻ", speed: 280, time: "18/19 giờ", resource: "14 NC" },
            { name: "Bắn màu NS", speed: 1300, time: "3.5/4 giờ", resource: "Máy BM-03" },
            { name: "Sấy", speed: 380, time: "12/13 giờ", resource: "Lò Sấy #1" },
            { name: "Cạo lụa", speed: 250, time: "19/20 giờ", resource: "22 NC" },
            { name: "Bắn màu TP", speed: 1100, time: "4/4.5 giờ", resource: "Máy BM-05" },
            { name: "Phân loại", speed: 450, time: "7/7.5 giờ", resource: "8 NC" },
            { name: "Đóng cont", speed: 0, time: "0.5/0.5 giờ", resource: "4 NC" },
            ],
        },
        {
            id: "LSX-25-08-113",
            stages: [
            { name: "Sàn hấp", speed: 4100, time: "4.5/4 giờ", resource: "Lò Hấp #1" },
            { name: "Chẻ", speed: 220, time: "24/20 giờ", resource: "16 NC" },
            { name: "Bắn màu NS", speed: 1150, time: "5/4.5 giờ", resource: "Máy BM-04" },
            { name: "Sấy", speed: 0, time: "-", resource: "-" },
            { name: "Cạo lụa", speed: 0, time: "-", resource: "-" },
            { name: "Bắn màu TP", speed: 0, time: "-", resource: "-" },
            { name: "Phân loại", speed: 0, time: "-", resource: "-" },
            { name: "Đóng cont", speed: 0, time: "-", resource: "-" },
            ],
        },
        {
            id: "LSX-25-08-112",
            stages: [
            { name: "Sàn hấp", speed: 4380, time: "4/4 giờ", resource: "Lò Hấp #2" },
            { name: "Chẻ", speed: 275, time: "18.5/19 giờ", resource: "14 NC" },
            { name: "Bắn màu NS", speed: 1280, time: "4/4 giờ", resource: "Máy BM-04" },
            { name: "Sấy", speed: 370, time: "12.5/13 giờ", resource: "Lò Sấy #2" },
            { name: "Cạo lụa", speed: 245, time: "20/20 giờ", resource: "23 NC" },
            { name: "Bắn màu TP", speed: 1050, time: "4.5/4.5 giờ", resource: "Máy BM-05" },
            { name: "Phân loại", speed: 460, time: "7/7.5 giờ", resource: "8 NC" },
            { name: "Đóng cont", speed: 0, time: "0.5/0.5 giờ", resource: "4 NC" },
            ],
        },
        {
            id: "LSX-25-08-111",
            stages: [
            { name: "Sàn hấp", speed: 4200, time: "4/4 giờ", resource: "Lò Hấp #1" },
            { name: "Chẻ", speed: 240, time: "21/20 giờ", resource: "15 NC" },
            { name: "Bắn màu NS", speed: 1200, time: "4.2/4 giờ", resource: "Máy BM-02" },
            { name: "Sấy", speed: 360, time: "13/13 giờ", resource: "Lò Sấy #1" },
            { name: "Cạo lụa", speed: 230, time: "21/20 giờ", resource: "20 NC" },
            { name: "Bắn màu TP", speed: 0, time: "-", resource: "-" },
            { name: "Phân loại", speed: 0, time: "-", resource: "-" },
            { name: "Đóng cont", speed: 0, time: "-", resource: "-" },
            ],
        },
        {
            id: "LSX-25-08-110",
            stages: [
            { name: "Sàn hấp", speed: 4450, time: "3.8/4 giờ", resource: "Lò Hấp #2" },
            { name: "Chẻ", speed: 285, time: "18/19 giờ", resource: "14 NC" },
            { name: "Bắn màu NS", speed: 1320, time: "3.8/4 giờ", resource: "Máy BM-05" },
            { name: "Sấy", speed: 385, time: "12/13 giờ", resource: "Lò Sấy #2" },
            { name: "Cạo lụa", speed: 255, time: "19/20 giờ", resource: "22 NC" },
            { name: "Bắn màu TP", speed: 1120, time: "4/4.5 giờ", resource: "Máy BM-04" },
            { name: "Phân loại", speed: 470, time: "6.8/7.5 giờ", resource: "9 NC" },
            { name: "Đóng cont", speed: 0, time: "0.5/0.5 giờ", resource: "5 NC" },
            ],
        },
        {
          id: "LSX-25-08-116",
          stages: [
            { name: "Sàn hấp", speed: 4300, time: "4/4 giờ", resource: "Lò Hấp #1" },
            { name: "Chẻ", speed: 260, time: "20/19 giờ", resource: "15 NC" },
            { name: "Bắn màu NS", speed: 1250, time: "4.2/4 giờ", resource: "Máy BM-03" },
            { name: "Sấy", speed: 355, time: "13/13 giờ", resource: "Lò Sấy #1" },
            { name: "Cạo lụa", speed: 240, time: "21/20 giờ", resource: "21 NC" },
            { name: "Bắn màu TP", speed: 1080, time: "4/4.5 giờ", resource: "Máy BM-05" },
            { name: "Phân loại", speed: 455, time: "7/7.5 giờ", resource: "8 NC" },
            { name: "Đóng cont", speed: 0, time: "0.5/0.5 giờ", resource: "4 NC" },
          ],
        },
        {
          id: "LSX-25-08-117",
          stages: [
            { name: "Sàn hấp", speed: 4420, time: "3.9/4 giờ", resource: "Lò Hấp #2" },
            { name: "Chẻ", speed: 290, time: "18.5/19 giờ", resource: "14 NC" },
            { name: "Bắn màu NS", speed: 1330, time: "3.7/4 giờ", resource: "Máy BM-04" },
            { name: "Sấy", speed: 390, time: "12/13 giờ", resource: "Lò Sấy #2" },
            { name: "Cạo lụa", speed: 260, time: "19/20 giờ", resource: "23 NC" },
            { name: "Bắn màu TP", speed: 1150, time: "4/4.5 giờ", resource: "Máy BM-02" },
            { name: "Phân loại", speed: 480, time: "6.8/7.5 giờ", resource: "9 NC" },
            { name: "Đóng cont", speed: 0, time: "0.5/0.5 giờ", resource: "5 NC" },
          ],
        },
    ];


  const [processedData, setProcessedData] = useState<any[]>([]);
  const stageNames = Array.from(
    new Set(productionOrders.flatMap((o) => o.stages.map((s) => s.name)))
  );

  // --- HELPERS ---
  const formatSpeed = (value: number) => (value === 0 ? "-" : `${value} kg/h`);

  const parseTime = (timeString: string) => {
    if (timeString === "-") return { delay: null };
    const [actual, standard] = timeString.replace(" giờ", "").split("/").map(Number);
    return { delay: actual - standard };
  };

  const formatDelay = (delay: number | null) => {
    if (delay === null) return "-";
    if (delay > 0) return <span className="font-bold text-red-500">+{delay.toFixed(1)}h</span>;
    if (delay < 0) return <span className="font-bold text-green-500">{delay.toFixed(1)}h</span>;
    return <span>0h</span>;
  };

  // --- PROCESS DATA ---
  useEffect(() => {
    const data = productionOrders.map((order) => {
      const flatOrder: any = { id: order.id };
      stageNames.forEach((stageName) => {
        const stage =
          order.stages.find((s) => s.name === stageName) || {
            speed: 0,
            time: "-",
            resource: "-",
          };
        flatOrder[`${stageName}_speed`] = stage.speed;
        flatOrder[`${stageName}_delay`] = parseTime(stage.time).delay;
        flatOrder[`${stageName}_resource`] = stage.resource;
      });
      return flatOrder;
    });
    setProcessedData(data);
  }, []);

  return (
    <div className="py-[10px] px-[10px] bg-white min-h-screen font-[Inter]">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Báo cáo so sánh tốc độ, thời gian & nguồn lực
          </h1>
        </header>

        {/* Table */}
        <div className="bg-white overflow-hidden">
          <div className="overflow-x-auto overflow-hidden">
            <table className="text-sm text-left text-gray-500 border-collapse border border-gray-300">
              <thead className="text-xs text-gray-700 uppercase sticky top-0 z-10 bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 sticky left-0 bg-white z-20 border-b border-r min-w-[150px] w-40"
                    rowSpan={2}
                  >
                    Mã LSX
                  </th>
                  {stageNames.map((stageName, index) => (
                    <th
                      key={stageName}
                      colSpan={3}
                      className={`px-4 py-3 text-center border-b border-r ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      {stageName}
                    </th>
                  ))}
                </tr>
                <tr>
                  {stageNames.map((stageName, index) => (
                    <React.Fragment key={`${stageName}-sub`}>
                      <th
                        className={`px-2 py-3 text-left border-b border-r ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        Tốc độ
                      </th>
                      <th
                        className={`px-2 py-3 text-left border-b border-r ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        Thời gian
                      </th>
                      <th
                        className={`px-2 py-3 text-left border-b border-r ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        Nhân công/TBị
                      </th>
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {processedData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={1 + stageNames.length * 3}
                      className="text-center py-10 text-gray-500"
                    >
                      Không có dữ liệu để hiển thị.
                    </td>
                  </tr>
                ) : (
                  processedData.map((order) => (
                    <tr key={order.id} className="bg-white hover:bg-gray-100">
                      <td className="px-4 py-3 font-medium text-gray-900 sticky left-0 bg-white border-b border-r min-w-[150px] w-40">
                        {order.id}
                      </td>
                      {stageNames.map((stageName, index) => {
                        const speed = order[`${stageName}_speed`];
                        const delay = order[`${stageName}_delay`];
                        const resource = order[`${stageName}_resource`];
                        return (
                          <React.Fragment key={`${order.id}-${stageName}`}>
                            <td
                              className={`px-2 py-3 border-b border-r ${
                                index % 2 === 0 ? "bg-gray-50" : "bg-white"
                              }`}
                            >
                              {formatSpeed(speed)}
                            </td>
                            <td
                              className={`px-2 py-3 border-b border-r ${
                                index % 2 === 0 ? "bg-gray-50" : "bg-white"
                              }`}
                            >
                              {formatDelay(delay)}
                            </td>
                            <td
                              className={`px-2 py-3 border-b border-r text-gray-600 ${
                                index % 2 === 0 ? "bg-gray-50" : "bg-white"
                              }`}
                            >
                              {resource}
                            </td>
                          </React.Fragment>
                        );
                      })}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}