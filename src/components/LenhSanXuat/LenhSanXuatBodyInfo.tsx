import InfoTitle from "../NCC/InfoTitle";

export default function LenhSanXuatBodyInfo({ title }: any) {
    return (
        <div className="w-full h-[50%] flex flex-col border-[0.5px] border-[#ccc]">
            <InfoTitle 
                title={title}
            />
            <div className="flex-1 overflow-y-auto ">
                <section id="overview" className="mb-8">
                    <div className="card p-6">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">
                            Mã Lệnh: 
                            <span className="text-blue-600 font-bold">
                                LSX-2025-08-112
                            </span>
                            </h2>
                            <div className="status-badge status-inprogress">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z">
                                </path>
                            </svg>
                            Đang thực hiện (5/8)
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2">Thông tin Nguyên liệu Đầu vào</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><strong>Nguồn gốc / NCC:</strong> Công ty TNHH Nguyên liệu Xanh</li>
                                <li><strong>Loại hàng:</strong> Hạt điều thô Campuchia</li>
                                <li><strong>Khối lượng ban đầu:</strong> <span className="font-bold text-gray-800">17.500 kg</span></li>
                                <li><strong>Chất lượng (KOR):</strong> <span className="font-bold text-gray-800">48.5 lbs</span></li>
                            </ul>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2">Thông tin Đơn hàng</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><strong>Khách hàng:</strong> Japan Foods Inc.</li>
                                <li><strong>Ngày dự kiến giao:</strong>
                                <span className="font-bold text-gray-800">28/08/2025</span>
                                </li>
                            </ul>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 md:col-span-2 lg:col-span-1">
                            <h3 className="font-semibold text-blue-800 mb-3 border-b border-blue-200 pb-2">Các Chỉ số Hiệu suất</h3>
                            <ul className="space-y-2 text-sm text-blue-700">
                                <li><strong>Tỷ lệ Thu hồi Tổng thể:</strong> <span className="font-bold text-blue-900">82.5 %</span></li>
                                <li><strong>Tỷ lệ Hao hụt Tổng thể:</strong> <span className="font-bold text-blue-900">17.5 %</span></li>
                                <li><strong>Thời gian Thực hiện:</strong> <span className="font-bold text-blue-900">48 giờ 30 phút</span></li>
                                <li><strong>Chi phí Ước tính:</strong> <span className="font-bold text-blue-900">450.000.000 VNĐ</span></li>
                                <li><strong>Lợi nhuận Gộp Ước tính:</strong> <span className="font-bold text-green-600">125.500.000 VNĐ</span></li>
                            </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section >
                    <div className="card p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Chi tiết các Công đoạn</h2>
                        <div className="space-y-4">
                            <div className="card p-4">
                                <div className="flex items-start">
                                    <div className="stage-icon bg-green-100 text-green-600 mr-4">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
                                        </path>
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-800">
                                        1. Sàn hấp - <span className="text-green-600">Hoàn thành</span>
                                        </p>
                                        <div className="text-sm text-gray-600 mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                                        <p><strong>Khối lượng vào:</strong> 17.500 kg</p>
                                        <p><strong>Khối lượng ra:</strong> 17.450 kg</p>
                                        <p><strong>Thời gian:</strong> 8 giờ</p>
                                        <p><strong>Phụ trách:</strong> Nguyễn Văn A</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card p-4">
                                <div className="flex items-start">
                                    <div className="stage-icon bg-green-100 text-green-600 mr-4">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-800">2. Chẻ - <span className="text-green-600">Hoàn thành</span></p>
                                        <div className="text-sm text-gray-600 mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                                            <p><strong>Khối lượng vào:</strong> 17.450 kg</p>
                                            <p><strong>Nhân thu được:</strong> 4.980 kg</p>
                                            <p><strong>Tỷ lệ bể vỡ:</strong> 3.2%</p>
                                            <p><strong>Thời gian:</strong> 12 giờ</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card p-4">
                                <div className="flex items-start">
                                    <div className="stage-icon bg-green-100 text-green-600 mr-4">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-800">
                                            3. Bắn màu nhân sống - <span className="text-green-600">Hoàn thành</span>
                                        </p>
                                        <div className="text-sm text-gray-600 mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                                            <p><strong>Khối lượng vào:</strong> 4.980 kg</p>
                                            <p><strong>Hàng đạt:</strong> 4.850 kg</p>
                                            <p><strong>Tỷ lệ loại bỏ:</strong> 2.6%</p>
                                            <p><strong>KCS:</strong> Trần Thị B</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card p-4">
                                <div className="flex items-start">
                                    <div className="stage-icon bg-green-100 text-green-600 mr-4">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-800">
                                            4. Sấy - <span className="text-green-600">Hoàn thành</span>
                                        </p>
                                        <div className="text-sm text-gray-600 mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                                            <p><strong>Khối lượng vào:</strong> 4.850 kg</p>
                                            <p><strong>Khối lượng ra:</strong> 4.600 kg</p>
                                            <p><strong>Hao hụt ẩm:</strong> 5.1%</p>
                                            <p><strong>Thời gian:</strong> 10 giờ</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card p-4 border-l-4 border-blue-500">
                                <div className="flex items-start">
                                    <div className="stage-icon bg-blue-100 text-blue-600 mr-4 animate-pulse">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-800">5. Cạo lụa - <span className="text-blue-600">Đang chạy</span></p>
                                        <div className="text-sm text-gray-600 mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                                            <p><strong>Khối lượng vào:</strong> 4.600 kg</p>
                                            <p><strong>Đã xử lý:</strong> 2.100 kg</p>
                                            <p><strong>Bể vỡ (tạm tính):</strong> 1.5%</p>
                                            <p><strong>Phụ trách:</strong> Lê Văn C</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card p-4">
                                <div className="flex items-start">
                                    <div className="stage-icon bg-gray-200 text-gray-500 mr-4">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 5.523-4.477 10-10 10S1 17.523 1 12 5.477 2 11 2s10 4.477 10 10z"></path>
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-500">6. Bắn màu thành phẩm - <span className="text-gray-500">Chưa bắt đầu</span></p>
                                        <div className="text-sm text-gray-400 mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                                            <p><strong>Khối lượng vào:</strong> ---</p>
                                            <p><strong>Hàng đạt:</strong> ---</p>
                                            <p><strong>Tỷ lệ loại bỏ:</strong> ---</p>
                                            <p><strong>KCS:</strong> ---</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card p-4 opacity-60">
                                <div className="flex items-start">
                                    <div className="stage-icon bg-gray-200 text-gray-500 mr-4">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 5.523-4.477 10-10 10S1 17.523 1 12 5.477 2 11 2s10 4.477 10 10z"></path>
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-500">7. Phân loại - <span className="text-gray-500">Chưa bắt đầu</span></p>
                                        <div className="text-sm text-gray-400 mt-2">
                                            <p><i>Dữ liệu sẽ hiển thị sau khi công đoạn hoàn thành.</i></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card p-4 opacity-60">
                                <div className="flex items-start">
                                    <div className="stage-icon bg-gray-200 text-gray-500 mr-4">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 5.523-4.477 10-10 10S1 17.523 1 12 5.477 2 11 2s10 4.477 10 10z"></path>
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-500">8. Đóng cont - <span className="text-gray-500">Chưa bắt đầu</span></p>
                                        <div className="text-sm text-gray-400 mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
                                            <p><strong>Số container:</strong> ---</p>
                                            <p><strong>Số lượng:</strong> ---</p>
                                            <p><strong>Ngày đóng:</strong> ---</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}