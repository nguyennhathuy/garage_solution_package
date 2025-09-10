import { supabase } from "../../lib/supabase";
// moduleConfigs.ts
import {
    sections as tonkhoSections,
    tableData as tonkhoData,
    tableTitle as tonkhoTableTitle,
    title as tonkhoDetailTitle,
} from "../TonKho/TonKho.constants";

import {
    title as nhapKhoDetailTitle,
    tableTitle as nhapKhoTableTitle,
    tableData as nhapKhoData,
    sections as nhapKhoSections,
} from "../NhapKho/NhapKho.constants";

import {
    title as xuatKhoDetailTitle,
    tableTitle as xuatKhoTableTitle,
    tableData as xuatKhoData,
    sections as xuatKhoSections,
} from "../XuatKho/XuatKho.constants";

import {
    title as kiemKeDetailTitle,
    tableTitle as kiemKeTableTitle,
    tableData as kiemKeData,
    sections as kiemKeSections,
} from "../KiemKe/KiemKe.constants";

import {
    title as NCCDetailTitle,
    tableTitle as NCCTableTitle,
    tableData as NCCData,
    sections as NCCSections,
} from "../NCC/NCC.constants";

import {
    DVTTableTitle,
    DVTSections,
    DVTTitle,
    SPDVSections,
    SPDVTitle,
    SPDVTableTitle,
    danhSachSPDVSections,
    danhSachSPDVTableData,
    danhSachSPDVTableTitle,
    danhSachSPDVTitle
} from "./Resource.contant";

// Sau này bạn có thể import thêm constants của Nhập kho / Xuất kho / Kiểm kê …

export const MODULE_CONFIGS: any = {
    "Tồn kho": {
        formKind: "tonKho",
        title: tonkhoDetailTitle,
        tableTitle: tonkhoTableTitle,
        // thêm id tạm nếu data chưa có id
        tableData: tonkhoData.map((r: any, idx: number) => ({ id: idx + 1, ...r })),
        sections: tonkhoSections,
    },
    "Nhập kho": {
        formKind: "nhapKho",
        title: nhapKhoDetailTitle,
        tableTitle: nhapKhoTableTitle,
        // thêm id tạm nếu data chưa có id
        tableData: nhapKhoData.map((r: any, idx: number) => ({ id: idx + 1, ...r })),
        sections: nhapKhoSections,
    },
    "Xuất kho": {
        formKind: "xuatKho",
        title: xuatKhoDetailTitle,
        tableTitle: xuatKhoTableTitle,
        // thêm id tạm nếu data chưa có id
        tableData: xuatKhoData.map((r: any, idx: number) => ({ id: idx + 1, ...r })),
        sections: xuatKhoSections,
    },
    "Kiểm kê": {
        formKind: "kiemKe",
        title: kiemKeDetailTitle,
        tableTitle: kiemKeTableTitle,
        // thêm id tạm nếu data chưa có id
        tableData: kiemKeData.map((r: any, idx: number) => ({ id: idx + 1, ...r })),
        sections: kiemKeSections,
    },
    "Nhà cung cấp": {
        formKind: "NCC",
        title: NCCDetailTitle,
        tableTitle: NCCTableTitle,
        // thêm id tạm nếu data chưa có id
        tableData: NCCData.map((r: any, idx: number) => ({ id: idx + 1, ...r })),
        sections: NCCSections,
    },
    "Đơn vị tính": {
        formKind: "DVT",
        title: DVTTitle,
        tableTitle: DVTTableTitle,    // ⬅️ dùng header theo DVTTableTitle
        sections: DVTSections,
        table: "units",
        mapRow: (r: any) => ({ id: r.id, ten: r.name }), // id trước, ten sau → khớp vị trí
        async load() {
            const { data, error } = await supabase
                .from("units")
                .select("id,name,created_at")
                .order("created_at", { ascending: false });
            if (error) throw error;
            return (data ?? []).map(this.mapRow);
        },
    },

    // ==== NHÓM SP & DV ====
    "Nhóm SP & DV": {
        formKind: "SPDV",
        title: SPDVTitle,
        tableTitle: SPDVTableTitle,   // ⬅️ header theo SPDVTableTitle
        sections: SPDVSections,
        table: "item_groups",
        mapRow: (r: any) => ({ id: r.id, ten: r.name }), // id trước, ten sau
        async load() {
            const { data, error } = await supabase
                .from("item_groups")
                .select("id,name,created_at")
                .order("created_at", { ascending: false });
            if (error) throw error;
            return (data ?? []).map(this.mapRow);
        },
    },
    "Danh sách SP & DV": {
        formKind: "danhSachSPDV",
        title: danhSachSPDVTitle,
        tableTitle: danhSachSPDVTableTitle,
        // thêm id tạm nếu data chưa có id
        tableData: danhSachSPDVTableData.map((r: any, idx: number) => ({ id: idx + 1, ...r })),
        sections: danhSachSPDVSections,
    },
};
