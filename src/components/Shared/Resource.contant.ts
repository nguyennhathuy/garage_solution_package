export const DVTSections = [
    {
        title: "Thông tin đơn vị tính",
        cols: 2,
        fields: [
            { label: "Tên đơn vị tính", value: "Cái" },
        ],
    },
    {
        title: "Hoạt động",
        cols: 2,
        fields: [
            { label: "Người tạo", value: "—" },
            { label: "Ngày tạo", value: "—" },
        ],
    },
];

export const DVTTitle = "đơn vị tính";

export const DVTTableTitle = ["Tên đơn vị tính"];

export const DVTTableData = [
    { ten: "Cái" },
    { ten: "Hộp" },
    { ten: "Kg" },
    { ten: "Gam" },
    { ten: "Lít" },
    { ten: "Thùng" }
];





export const SPDVSections = [
    {
        title: "Thông tin chính",
        cols: 2,
        fields: [
            { label: "Tên nhóm", value: "Lốp xe" },
        ],
    },
    {
        title: "Hoạt động",
        cols: 4,
        fields: [
            { label: "Người tạo", value: "—" },
            { label: "Ngày tạo", value: "—" },
            { label: "Người sửa", value: "—" },
            { label: "Ngày sửa", value: "—" },
        ],
    },
];

export const SPDVTitle = "nhóm sản phẩm & dịch vụ";

export const SPDVTableTitle = ["Tên nhóm"];

export const SPDVTableData = [
    { ten: "Lốp xe" },
    { ten: "Phụ kiện" },
    { ten: "Dầu, nhớt" },
    { ten: "Phụ tùng" },
    { ten: "Đồng sơn" },
    { ten: "Bảo dưỡng" }
];








export const danhSachSPDVSections = [
    {
        title: "Thông tin chính",
        cols: 3,
        fields: [
            { label: "Mã", value: "CONG" },
            { label: "Tên", value: "Công thợ" },
            { label: "Đơn vị tính", value: "Công" },
            { label: "Mã vạch", value: "_ _" },
            { label: "Nhóm", value: "_ _" },
            { label: "Loại vật tư", value: "_ _" },
        ],
    },
    {
        title: "Hoạt động",
        cols: 4,
        fields: [
            { label: "Người tạo", value: "_ _" },
            { label: "Ngày tạo", value: "_ _" },
            { label: "Người sửa", value: "_ _" },
            { label: "Ngày sửa", value: "_ _" },
        ],
    },
];

export const danhSachSPDVTitle = "nhóm sản phẩm & dịch vụ";

export const danhSachSPDVTableTitle = [
    "Mã",
    "Tên",
    "Đơn vị tính",
    "Giá gốc",
    "Giá bán (không VAT)",
    "Giá bán (có VAT)",
    "Nhóm SP & DV"
];

export const danhSachSPDVTableData = [
    { ma: "CONG", ten: "Công thợ", DVT: "Công", giaGoc: 0, giaBanKhongVAT: 0, giaBanCoVAT: 0, SPDV: null },
    { ma: "CONG", ten: "Công thợ", DVT: "Công", giaGoc: 0, giaBanKhongVAT: 0, giaBanCoVAT: 0, SPDV: null },
    { ma: "CONG", ten: "Công thợ", DVT: "Công", giaGoc: 0, giaBanKhongVAT: 0, giaBanCoVAT: 0, SPDV: null },
    { ma: "CONG", ten: "Công thợ", DVT: "Công", giaGoc: 0, giaBanKhongVAT: 0, giaBanCoVAT: 0, SPDV: null },
    { ma: "CONG", ten: "Công thợ", DVT: "Công", giaGoc: 0, giaBanKhongVAT: 0, giaBanCoVAT: 0, SPDV: null },
    { ma: "CONG", ten: "Công thợ", DVT: "Công", giaGoc: 0, giaBanKhongVAT: 0, giaBanCoVAT: 0, SPDV: null },
];