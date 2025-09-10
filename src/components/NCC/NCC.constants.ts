export const sections = [
    {
        title: "Thông tin chính",
        cols: 3,
        fields: [
        { label: "Mã nhà cung cấp", value: "KH000008" },
        { label: "Tên nhà cung cấp", value: "Nguyễn Văn A" },
        { label: "Số điện thoại", value: "0123456789" },
        { label: "Email", value: "nguyenvana@gmail.com" },
        ],
    },
    {
        title: "Địa chỉ",
        cols: 3,
        fields: [
        { label: "Tỉnh thành", value: "Hà Nội" },
        { label: "Xã / phường", value: "Quận Hoàng Mai" },
        { label: "Số nhà, tên đường", value: "123 Nguyễn Trãi" },
        ],
    },
    {
        title: "Thông tin công ty",
        cols: 3,
        fields: [
        { label: "Tên công ty", value: "Công ty TNHH ABC" },
        { label: "Chức vụ", value: "Kế toán" },
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
export const title = 'nhà cung cấp';
export const tableTitle = ['Mã NCC', 'Tên NCC', 'Địa chỉ', 'Nhóm hàng', 'MST', 'Trạng thái'];
export const tableData = [
    {
        supplierCode: "NCC001",
        supplierName: "Công ty TNHH ABC",
        address: "123 Nguyễn Trãi, Hà Nội",
        group: "Nguyên liệu",
        taxCode: "0101234567",
        status: "Đang hợp tác",
    },
    {
        supplierCode: "NCC002",
        supplierName: "Công ty CP XYZ",
        address: "45 Lê Lợi, TP.HCM",
        group: "Bao bì",
        taxCode: "0309876543",
        status: "Ngừng hợp tác",
    },
    {
        supplierCode: "NCC003",
        supplierName: "Công ty TNHH Minh Phát",
        address: "78 Tôn Đản, Đà Nẵng",
        group: "Thiết bị",
        taxCode: "0401122334",
        status: "Đang hợp tác",
    },
    {
        supplierCode: "NCC004",
        supplierName: "Công ty CP Hoa Sen",
        address: "11 Vườn Lài, Hải Phòng",
        group: "Nguyên liệu",
        taxCode: "0203344556",
        status: "Tạm dừng",
    },
    {
        supplierCode: "NCC005",
        supplierName: "Công ty TNHH Ánh Dương",
        address: "12 Nguyễn Huệ, Cần Thơ",
        group: "Bao bì",
        taxCode: "1806677889",
        status: "Đang hợp tác",
    },
    {
        supplierCode: "NCC006",
        supplierName: "Công ty CP Bình Minh",
        address: "56 Võ Văn Kiệt, Bình Dương",
        group: "Vật tư",
        taxCode: "3709988776",
        status: "Đang hợp tác",
    }
]