// Sidebar.tsx
import React, { useMemo, useState } from "react";
import {
    Home,
    ShoppingCart,
    Users,
    Boxes,
    Package,
    Building2,
    List,
    Download,
    Upload,
    ClipboardList,
    CreditCard,
    UserCheck,
    Calculator,
    BarChart3,
    Settings,
    Car,
    ChevronRight,
} from "lucide-react";

const Sidebar: React.FC<any> = () => {
    // ----- Menu data (type any as requested) -----
    const menu: any[] = useMemo(
        () => [
            { id: "home", label: "Trang chủ", icon: Home },
            { id: "ban-hang", label: "Bán hàng", icon: ShoppingCart },
            { id: "khach-hang", label: "khách hàng & xe", icon: Users },
            {
                id: "kho",
                label: "Kho, sản phẩm & dịch vụ",
                icon: Boxes,
                children: [
                    { id: "kho/spdv", label: "Sản phẩm & dịch vụ", icon: Package },
                    {
                        id: "kho/qlk",
                        label: "Quản lý kho (chi nhánh)",
                        icon: Building2,
                        children: [
                            { id: "kho/qlk/ds", label: "Danh sách kho", icon: List },
                            { id: "kho/qlk/nhap", label: "Nhập kho", icon: Download },
                            { id: "kho/qlk/xuat", label: "Xuất kho", icon: Upload },
                            { id: "kho/qlk/kk", label: "Kiểm kê", icon: ClipboardList },
                        ],
                    },
                ],
            },
            { id: "mua-hang", label: "Mua hàng", icon: ShoppingCart },
            { id: "thanh-toan", label: "Thanh toán", icon: CreditCard },
            { id: "nhan-su", label: "Nhân sự, chấm công", icon: UserCheck },
            { id: "tscd", label: "TSCD, CCDC, TB", icon: Boxes },
            { id: "ke-toan", label: "Kế toán tổng hợp", icon: Calculator },
            { id: "bao-cao", label: "Báo cáo", icon: BarChart3 },
            { id: "he-thong", label: "Hệ thống", icon: Settings },
            { id: "car-care", label: "Chăm sóc xe, rửa xe", icon: Car },
        ],
        []
    );

    // default-open like screenshot
    const [open, setOpen] = useState<any>({ kho: true, "kho/qlk": true });

    const toggle = (id: string) =>
        setOpen((s: any) => ({ ...s, [id]: !s?.[id] }));

    // ----- Recursive renderer -----
    const renderItems = (items: any[], depth = 0): React.ReactNode => {
        const isRoot = depth === 0;
        return (
            <ul
                className={[
                    isRoot ? "" : "ml-6 border-l border-gray-200",
                    "space-y-1",
                ].join(" ")}
            >
                {items.map((it: any) => {
                    const Icon = it.icon as any;
                    const hasKids = Array.isArray(it.children) && it.children.length > 0;
                    const isOpen = !!open[it.id];

                    return (
                        <li
                            key={it.id}
                            className={[
                                "relative",
                                !isRoot &&
                                // horizontal connector for nested nodes
                                'before:content-[""] before:absolute before:top-5 before:-left-[1px] before:w-4 before:border-t before:border-gray-200',
                            ].join(" ")}
                        >
                            <button
                                type="button"
                                aria-expanded={hasKids ? isOpen : undefined}
                                onClick={() => (hasKids ? toggle(it.id) : null)}
                                className={[
                                    "w-full select-none",
                                    "flex items-center gap-3",
                                    "px-3 py-2",
                                    "rounded-md",
                                    "hover:bg-gray-50",
                                    "text-gray-700",
                                ].join(" ")}
                            >
                                {/* left icon */}
                                <Icon className="h-5 w-5 shrink-0 text-blue-500" />

                                {/* label */}
                                <span className="flex-1 text-sm text-left">{it.label}</span>

                                {/* chevron for folders */}
                                {hasKids && (
                                    <ChevronRight
                                        className={[
                                            "h-4 w-4 text-gray-400 transition-transform duration-200",
                                            isOpen ? "rotate-90" : "rotate-0",
                                        ].join(" ")}
                                    />
                                )}
                            </button>

                            {hasKids && isOpen && (
                                <div className="mt-1">{renderItems(it.children, depth + 1)}</div>
                            )}
                        </li>
                    );
                })}
            </ul>
        );
    };

    // ----- Shell -----
    return (
        <aside
            className="w-72 shrink-0 bg-white border-r border-gray-200 h-screen overflow-y-auto"
            aria-label="Sidebar"
        >
            <div className="p-3">{renderItems(menu)}</div>
        </aside>
    );
};

export default Sidebar;
