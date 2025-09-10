export const sections = [
    {
        title: "Thông tin phiếu xuất kho",
        cols: 3,
        fields: [
            { label: "Mã phiếu", value: "XK0001" },
            { label: "Ngày xuất", value: "21/08/2025" },
            { label: "Loại xuất", value: "Xuất nguyên liệu sản xuất" },
            { label: "Người nhận", value: "Nguyễn Văn A" },
            { label: "Bộ phận nhận", value: "Xưởng Sản Xuất 1" },
            { label: "Ghi chú", value: "Xuất theo lệnh sản xuất LSX001" },
        ],
    },
    {
        title: "Thông tin kho",
        cols: 3,
        fields: [
            { label: "Kho xuất", value: "Kho Nguyên Liệu" },
            { label: "Vị trí", value: "Kệ 2 - Hàng A" },
            { label: "Thủ kho", value: "Trần Thị B" },
        ],
    },
    {
        title: "Thông tin vật tư",
        cols: 3,
        fields: [
            { label: "Mã vật tư", value: "VT0001" },
            { label: "Tên vật tư", value: "Hạt điều thô" },
            { label: "Số lượng xuất", value: "2 Tấn" },
        ],
    },
    {
        title: "Hoạt động",
        cols: 4,
        fields: [
            { label: "Người tạo", value: "Cao Hữu Quý" },
            { label: "Ngày tạo", value: "21/08/2025" },
            { label: "Người duyệt", value: "Nguyễn Thị C" },
            { label: "Ngày duyệt", value: "21/08/2025" }
        ],
    }
];
export const title = 'xuất kho';
export const tableTitle = [
  "Mã phiếu xuất",
  "Ngày xuất kho",
  "Mã sản phẩm",
  "Tên sản phẩm",
  "Số lượng xuất",
  "Bộ phận nhận",
  "Người xuất kho"
];
export const tableData = [
  {
    maPhieuXuat: "PX001",
    ngayXuatKho: "2025-08-02",
    maSanPham: "NL001",
    tenSanPham: "Hạt điều thô",
    soLuongXuat: 1000,
    mucDichXuat: "Sản xuất mẻ 01",
    nguoiXuatKho: "Nguyễn Văn G"
  },
  {
    maPhieuXuat: "PX002",
    ngayXuatKho: "2025-08-04",
    maSanPham: "NL002",
    tenSanPham: "Muối tinh",
    soLuongXuat: 300,
    mucDichXuat: "Sản xuất hạt điều muối",
    nguoiXuatKho: "Trần Thị H"
  },
  {
    maPhieuXuat: "PX003",
    ngayXuatKho: "2025-08-06",
    maSanPham: "NL003",
    tenSanPham: "Đường trắng",
    soLuongXuat: 500,
    mucDichXuat: "Sản xuất hạt điều da cá",
    nguoiXuatKho: "Lê Văn I"
  },
  {
    maPhieuXuat: "PX004",
    ngayXuatKho: "2025-08-08",
    maSanPham: "NL004",
    tenSanPham: "Dầu ăn",
    soLuongXuat: 200,
    mucDichXuat: "Chiên hạt điều",
    nguoiXuatKho: "Phạm Thị K"
  },
  {
    maPhieuXuat: "PX005",
    ngayXuatKho: "2025-08-10",
    maSanPham: "NL005",
    tenSanPham: "Bơ thực vật",
    soLuongXuat: 150,
    mucDichXuat: "Sản xuất hạt điều bơ tỏi",
    nguoiXuatKho: "Nguyễn Văn L"
  },
  {
    maPhieuXuat: "PX006",
    ngayXuatKho: "2025-08-12",
    maSanPham: "NL006",
    tenSanPham: "Bột phô mai",
    soLuongXuat: 100,
    mucDichXuat: "Sản xuất hạt điều đường",
    nguoiXuatKho: "Trần Thị M"
  }
];