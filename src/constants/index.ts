import type { ModuleSidebar } from '../types';
import { IoHome } from "react-icons/io5";
import { FaDatabase, FaFileExport } from "react-icons/fa";
import { TbPackageImport } from "react-icons/tb";
import { FaClipboardCheck } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaCameraRetro } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { FaChartPie } from "react-icons/fa";




export const MODULE_LIST: ModuleSidebar[] = [
    {
        name: 'Đơn vị tính',
        icon: FaDatabase
    },
    {
        name: 'Nhóm SP & DV',
        icon: FaDatabase
    },
    {
        name: 'Danh sách SP & DV',
        icon: FaDatabase
    },
    {
        name: 'Tồn kho',
        icon: IoHome
    },
    {
        name: 'Nhập kho',
        icon: TbPackageImport
    },
    {
        name: 'Xuất kho',
        icon: FaFileExport
    },
    {
        name: 'Kiểm kê',
        icon: FaClipboardCheck
    },
    {
        name: 'Nhà cung cấp',
        icon: FaHandshake
    },
    {
        name: 'Lệnh sản xuất',
        icon: MdOutlineProductionQuantityLimits
    },
    {
        name: 'Chụp ảnh sau sản xuất',
        icon: FaCameraRetro
    },
    {
        name: 'Báo cáo hiệu suất sản xuất',
        icon: FaChartPie
    },
    {
        name: 'Báo cáo nguồn lực',
        icon: FaChartPie
    },
];