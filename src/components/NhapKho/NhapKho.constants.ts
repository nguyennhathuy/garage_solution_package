export const sections = [
    {
        title: "Thông tin phiếu nhập kho",
        cols: 3,
        fields: [
            { label: "Mã phiếu", value: "NK0001" },
            { label: "Ngày nhập", value: "20/08/2025" },
            { label: "Loại nhập", value: "Nhập mua hàng" },
            { label: "Người giao", value: "Phạm Văn D" },
            { label: "Nhà cung cấp", value: "Nông sản Bình Phước" },
            { label: "Ghi chú", value: "Nhập theo hợp đồng HĐ001" },
        ],
    },
    {
        title: "Thông tin kho",
        cols: 3,
        fields: [
            { label: "Kho nhập", value: "Kho Nguyên Liệu" },
            { label: "Vị trí", value: "Kệ 1 - Hàng B" },
            { label: "Thủ kho", value: "Trần Thị B" },
        ],
    },
    {
        title: "Thông tin vật tư",
        cols: 3,
        fields: [
            { label: "Mã vật tư", value: "VT0002" },
            { label: "Tên vật tư", value: "Bao bì đóng gói" },
            { label: "Số lượng nhập", value: "1000 Cái" },
        ],
    },
    {
        title: "Hoạt động",
        cols: 4,
        fields: [
            { label: "Người tạo", value: "Cao Hữu Quý" },
            { label: "Ngày tạo", value: "20/08/2025" },
            { label: "Người duyệt", value: "Nguyễn Thị C" },
            { label: "Ngày duyệt", value: "20/08/2025" }
        ],
    }
];
export const title = 'nhập kho';
export const tableTitle = [
  "Mã phiếu nhập",
  "Ngày nhập kho",
  "Mã sản phẩm",
  "Tên sản phẩm",
  "Số lượng nhập",
  "Nhà cung cấp",
  "Người nhập kho"
];
export const tableData = [
  {
    maPhieuNhap: "PN001",
    ngayNhapKho: "2025-08-01",
    maSanPham: "NL001",
    tenSanPham: "Hạt điều thô",
    soLuongNhap: 2500,
    nhaCungCap: "Nông sản Bình Phước",
    nguoiNhapKho: "Nguyễn Văn A"
  },
  {
    maPhieuNhap: "PN002",
    ngayNhapKho: "2025-08-03",
    maSanPham: "NL002",
    tenSanPham: "Muối tinh",
    soLuongNhap: 800,
    nhaCungCap: "Công ty Muối Việt Nam",
    nguoiNhapKho: "Trần Thị B"
  },
  {
    maPhieuNhap: "PN003",
    ngayNhapKho: "2025-08-05",
    maSanPham: "NL003",
    tenSanPham: "Đường trắng",
    soLuongNhap: 1200,
    nhaCungCap: "Đường Biên Hòa",
    nguoiNhapKho: "Lê Văn C"
  },
  {
    maPhieuNhap: "PN004",
    ngayNhapKho: "2025-08-07",
    maSanPham: "NL004",
    tenSanPham: "Dầu ăn",
    soLuongNhap: 600,
    nhaCungCap: "Tường An",
    nguoiNhapKho: "Phạm Thị D"
  },
  {
    maPhieuNhap: "PN005",
    ngayNhapKho: "2025-08-09",
    maSanPham: "NL005",
    tenSanPham: "Bơ thực vật",
    soLuongNhap: 500,
    nhaCungCap: "Vocarimex",
    nguoiNhapKho: "Nguyễn Văn E"
  },
  {
    maPhieuNhap: "PN006",
    ngayNhapKho: "2025-08-11",
    maSanPham: "NL006",
    tenSanPham: "Bột phô mai",
    soLuongNhap: 300,
    nhaCungCap: "Nhập khẩu Úc",
    nguoiNhapKho: "Trần Thị F"
  }
];