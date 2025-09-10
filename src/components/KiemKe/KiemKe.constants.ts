export const sections = [
    {
        title: "Thông tin phiếu kiểm kê",
        cols: 3,
        fields: [
            { label: "Mã phiếu", value: "KK0001" },
            { label: "Ngày kiểm kê", value: "22/08/2025" },
            { label: "Kho kiểm kê", value: "Kho Nguyên Liệu" },
            { label: "Người kiểm kê", value: "Nguyễn Văn E" },
            { label: "Trạng thái", value: "Đang xử lý" },
            { label: "Ghi chú", value: "Kiểm kê định kỳ tháng 8" },
        ],
    },
    {
        title: "Chi tiết kiểm kê",
        cols: 3,
        fields: [
            { label: "Mã vật tư", value: "VT0001" },
            { label: "Tên vật tư", value: "Hạt điều thô" },
            { label: "Số lượng thực tế", value: "9.8 Tấn" },
            { label: "Số lượng sổ sách", value: "10 Tấn" },
            { label: "Chênh lệch", value: "-0.2 Tấn" },
        ],
    },
    {
        title: "Người tham gia",
        cols: 3,
        fields: [
            { label: "Thủ kho", value: "Trần Thị B" },
            { label: "Kế toán", value: "Nguyễn Văn F" },
            { label: "Giám sát", value: "Lê Văn G" },
        ],
    },
    {
        title: "Hoạt động",
        cols: 4,
        fields: [
            { label: "Người tạo", value: "Cao Hữu Quý" },
            { label: "Ngày tạo", value: "22/08/2025" },
            { label: "Người duyệt", value: "Nguyễn Thị C" },
            { label: "Ngày duyệt", value: "22/08/2025" }
        ],
    }
];
export const title = 'kiểm kê';
export const tableTitle = [
  "Mã phiếu kiểm kê",
  "Ngày kiểm kê",
  "Mã sản phẩm",
  "Tên sản phẩm",
  "Số lượng hệ thống",
  "Số lượng thực tế",
  "Chênh lệch"
];
export const tableData = [
  {
    maPhieuKiemKe: "KK001",
    ngayKiemKe: "2025-08-13",
    maSanPham: "NL001",
    tenSanPham: "Hạt điều thô",
    soLuongHeThong: 1500,
    soLuongThucTe: 1490,
    chenhLech: -10
  },
  {
    maPhieuKiemKe: "KK002",
    ngayKiemKe: "2025-08-13",
    maSanPham: "NL002",
    tenSanPham: "Muối tinh",
    soLuongHeThong: 500,
    soLuongThucTe: 505,
    chenhLech: +5
  },
  {
    maPhieuKiemKe: "KK003",
    ngayKiemKe: "2025-08-13",
    maSanPham: "NL003",
    tenSanPham: "Đường trắng",
    soLuongHeThong: 700,
    soLuongThucTe: 695,
    chenhLech: -5
  },
  {
    maPhieuKiemKe: "KK004",
    ngayKiemKe: "2025-08-13",
    maSanPham: "NL004",
    tenSanPham: "Dầu ăn",
    soLuongHeThong: 400,
    soLuongThucTe: 400,
    chenhLech: 0
  },
  {
    maPhieuKiemKe: "KK005",
    ngayKiemKe: "2025-08-13",
    maSanPham: "NL005",
    tenSanPham: "Bơ thực vật",
    soLuongHeThong: 350,
    soLuongThucTe: 345,
    chenhLech: -5
  },
  {
    maPhieuKiemKe: "KK006",
    ngayKiemKe: "2025-08-13",
    maSanPham: "NL006",
    tenSanPham: "Bột phô mai",
    soLuongHeThong: 200,
    soLuongThucTe: 200,
    chenhLech: 0
  }
];