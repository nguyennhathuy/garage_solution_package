export const sections = [
    {
        title: "Thông tin chính",
        cols: 3,
        fields: [
            { label: "Mã", value: "SP0001" },
            { label: "Tên", value: "Hật điều thô" },
            { label: "Đơn vị tính", value: "Tấn" },
            { label: "Mã vạch", value: "_ _ _" },
            { label: "Nhóm", value: "_ _ _" },
            { label: "Loại vật tư", value: "Nguyên liệu thô" },
            { label: "Giá bán", value: "_ _ _" },
            { label: "Giá vốn", value: "100,000 VNĐ" },
            { label: "Thuê suất (%)", value: "8" },
            { label: "Thương hiệu", value: "_ _ _" },
            { label: "Xuất xứ", value: "Nông sản Bình Phước" },
        ],
    },
    {
        title: "Vị trí kho",
        cols: 3,
        fields: [
            { label: "Tỉnh thành", value: "Bình Phước" },
            { label: "Xã / phường", value: "TP. Đồng Xoài" },
            { label: "Số nhà, tên đường", value: "123 Nguyễn Trãi" },
            { label: "Vị trí", value: "Kho Nguyên Liệu - Kệ 1" },
        ],
    },
    {
        title: "Thông tin nhà cung cấp",
        cols: 3,
        fields: [
            { label: "Tên công ty", value: "Nông sản Bình Phước" },
            { label: "Chức vụ", value: "Thủ kho" },
            { label: "Mã số thuế", value: "0101234567" },
        ],
    },
    {
        title: "Hoạt động",
        cols: 4,
        fields: [
            { label: "Người tạo", value: "Cao Hữu Quý" },
            { label: "Ngày tạo", value: "21/08/2025" },
            { label: "Người sửa", value: "Cao Hữu Quý" },
            { label: "Ngày sửa", value: "21/08/2025" }
        ],
    }
];
export const title = 'sản phẩm';
export const tableTitle = ['Mã SP', 'Tên SP', 'ĐVT', 'Số lượng tồn kho', 'Ngày nhập', 'Nhà cung cấp', 'Vị trí kho'];
export const tableData = [
    {
        maNguyenLieu: "NL001",
        tenNguyenLieu: "Hạt điều thô",
        donViTinh: "Tấn",
        soLuongTon: 15,
        ngayNhapGanNhat: "2025-08-10",
        nhaCungCap: "Nông sản Bình Phước",
        viTriKho: "Kho Nguyên Liệu - Kệ 1"
    },
    {
        maNguyenLieu: "NL002",
        tenNguyenLieu: "Muối tinh",
        donViTinh: "Kg",
        soLuongTon: 2000,
        ngayNhapGanNhat: "2025-08-05",
        nhaCungCap: "Công ty Muối Việt Nam",
        viTriKho: "Kho Nguyên Liệu - Kệ 2"
    },
    {
        maNguyenLieu: "NL003",
        tenNguyenLieu: "Đường trắng",
        donViTinh: "Kg",
        soLuongTon: 1200,
        ngayNhapGanNhat: "2025-08-12",
        nhaCungCap: "Đường Biên Hòa",
        viTriKho: "Kho Nguyên Liệu - Kệ 3"
    },
    {
        maNguyenLieu: "NL004",
        tenNguyenLieu: "Dầu ăn",
        donViTinh: "Lít",
        soLuongTon: 800,
        ngayNhapGanNhat: "2025-08-14",
        nhaCungCap: "Tường An",
        viTriKho: "Kho Nguyên Liệu - Kệ 4"
    },
    {
        maNguyenLieu: "NL005",
        tenNguyenLieu: "Bơ thực vật",
        donViTinh: "Kg",
        soLuongTon: 600,
        ngayNhapGanNhat: "2025-08-15",
        nhaCungCap: "Công ty Vocarimex",
        viTriKho: "Kho Nguyên Liệu - Kệ 5"
    },
    {
        maNguyenLieu: "NL006",
        tenNguyenLieu: "Bột phô mai",
        donViTinh: "Kg",
        soLuongTon: 450,
        ngayNhapGanNhat: "2025-08-18",
        nhaCungCap: "Nhập khẩu Úc",
        viTriKho: "Kho Nguyên Liệu - Kệ 6"
    }
]