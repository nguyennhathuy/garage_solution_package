import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { ModalForm, type FieldConfig } from "./components/ModalForm";
import type { User } from "./types";
import { AnimatePresence, motion } from "framer-motion";

import LenhSanXuat from "./components/LenhSanXuat/LenhSanXuat";
import DashboardNguonLuc from "./components/DashboardNguonLuc/DashboardNguonLuc";
import DashboardHieuSuat from "./components/DashboardHieuSuat/DashboardHieuSuat";
import Page5S from "./components/5S/Page5S";

import Modal from "./components/Modal/Modal";
import { supabase } from "./lib/supabase";
import logoCongTy from "./assets/images/logo_cong_ty.jpg";
import { MODULE_CONFIGS } from "./components/Shared/moduleConfigs";
import ResourcePage from "./components/Shared/ResourcePage";
// import FormRenderer from "./components/Modal/FormRenderer";
import { DVTSchema, kiemKeSchema, NCCSchema, nhapKhoSchema, tonKhoSchema, xuatKhoSchema } from "./components/Modal/Modal.constant";
import FormRendererPro, { DVTSchemaV2, productServiceSchema } from "./components/Modal/FormRendererPro";
import { IoHome } from "react-icons/io5";
import { FaBoxOpen, FaCar, FaChartPie, FaCogs, FaHandshake, FaListUl, FaShoppingCart, FaUsers, FaWarehouse } from "react-icons/fa";
import UnderConstruction from "./components/UnderConstruction/UnderConstruction";

// type Mode = "create" | "edit";
// type FormKind = "product";

export default function App() {
  const [tableDataRuntime, setTableDataRuntime] = useState<any[]>([]);
  // const [open, setOpen] = useState(true);

  // mở/đóng chiều rộng
  const [sidebarOpen, setSidebarOpen] = useState<any>(true);
  const [currentPage, setCurrentPage] = useState<any>("Trang chủ");
  const MENU: any[] = useMemo(
    () => [
      { id: "home", label: "Trang chủ", icon: IoHome },

      {
        id: "banhang",
        label: "Bán hàng",
        icon: FaShoppingCart,
        children: [
          { id: "banhang/banle", label: "Dịch vụ sửa chữa" },
          { id: "banhang/donhang", label: "Bán hàng thương mại" },
        ],
      },

      {
        id: "khx",
        label: "khách hàng & xe",
        icon: FaUsers,
        children: [
          { id: "khx/quanlykhachang", label: "Quản lý khách hàng" },
          { id: "khx/quanlyphuongtien", label: "Quản lý phương tiện" },
          { id: "khx/chamsockhachhang", label: "Chăm sóc khách hàng" },
        ],
      },

      {
        id: "kho",
        label: "Kho, sản phẩm & dịch vụ",
        icon: FaBoxOpen,
        children: [
          {
            id: "spdv",
            label: "Sản phẩm & dịch vụ",
            children: [
              { id: "danhsachspdv", label: "Danh sách SP & DV" },
              { id: "banggiaspdv", label: "Bảng giá SP & DV" },
              { id: "nhomspdv", label: "Nhóm SP & DV" },
              { id: "donvitinh", label: "Đơn vị tính" },
              { id: "quydoidonvitinh", label: "Quy đổi ĐVT" },
              { id: "danhmucthue", label: "Danh mục thuế" },
            ],
          },
          {
            id: "qlk",
            label: "Quản lý kho (chi nhánh)",
            children: [
              { id: "tonkho", label: "Tồn kho" },   // ⬅️ đổi từ "nhapkho" thành "tonkho"
              { id: "nhapkho", label: "Nhập kho" },
              { id: "xuatkho", label: "Xuất kho" },
              { id: "kiemke", label: "Kiểm kê" },
            ],
          },
        ],
      },


      {
        id: "muahang",
        label: "Mua hàng",
        icon: FaShoppingCart,
        children: [
          {
            id: "muahang/quanlymuahang",
            label: "Quản lý mua hàng",
            children: [
              { id: "dexuatmuahang", label: "Đề xuất mua hàng" },
              { id: "phieunhapmuahang", label: "Phiếu nhập mua hàng" },
              { id: "phieumuahangbanngay", label: "Phiếu mua hàng, bán ngay" },
              { id: "hopdongmua", label: "Hợp đồng mua" },
            ],
          },
          {
            id: "muahang/danhmuc",
            label: "Danh mục",
            children: [
              { id: "ncc", label: "Nhà cung cấp" },
            ],
          },
        ],
      },

      {
        id: "thanhtoan",
        label: "Thanh toán",
        icon: FaHandshake,
        children: [
          { id: "thanhtoan/phieuthu", label: "Phiếu thu" },
          { id: "thanhtoan/phieuchi", label: "Phiếu chi" },
          { id: "thanhtoan/soquy", label: "Sỏ quỹ" },
          { id: "thanhtoan/soquy", label: "Phương thức thanh toán" },
          {
            id: "thanhtoan/nganhang",
            label: "Tài khoản ngân hàng",
            children: [
              { id: "thanhtoan/nganhang/danhmuc", label: "Danh mục" },
              { id: "thanhtoan/nganhang/doisoat", label: "Đối soát" },
            ],
          },
        ],
      },

      {
        id: "nhansu",
        label: "Nhân sự, chấm công",
        icon: FaUsers,
        children: [
          { id: "nhansu/chamcong", label: "Danh sách nhân viên" },
          { id: "nhansu/ca", label: "Bộ phận" },
          { id: "nhansu/ca", label: "5S" },
        ],
      },

      {
        id: "tscd",
        label: "TSCĐ, CCDC, TB",
        icon: FaWarehouse,
        children: [
          { id: "tscd/danhmuc", label: "Khai báo TSCĐ, CCDC" },
        ],
      },

      {
        id: "ketoan",
        label: "Kế toán tổng hợp",
        icon: FaListUl,
        children: [
          { id: "ketoan/socai", label: "Đầu kỳ vật tư" },
          { id: "ketoan/chungtu", label: "Đầu kỳ tài khoản" },
          { id: "ketoan/socai", label: "Đầu kỳ công nợ" },
          { id: "ketoan/chungtu", label: "Kết chuyển sang năm" },
        ],
      },

      {
        id: "baocao",
        label: "Báo cáo",
        icon: FaChartPie,
        children: [
          { id: "baocao/banhang", label: "Bán hàng" },
          { id: "baocao/tonkho", label: "Kho" },
          { id: "baocao/tailchinh", label: "Công nợ" },
        ],
      },

      {
        id: "hethong",
        label: "Hệ thống",
        icon: FaCogs,
        children: [
          {
            id: "hethong/users",
            label: "Người dùng",
            children: [
              { id: "baocao/banhang", label: "Danh sách người dùng" },
              { id: "baocao/tonkho", label: "Nhóm người dùng" },
            ],
          },
          {
            id: "hethong/roles",
            label: "Công ty",
            children: [
              { id: "baocao/banhang", label: "Cấu hình công ty" },
              { id: "baocao/tonkho", label: "Danh sách công ty" }
            ],
          },
          { id: "hethong/roles", label: "Cài đặt tài khoản" },
        ],
      },

      {
        id: "carcare",
        label: "Chăm sóc xe, rửa xe",
        icon: FaCar
      },
    ],
    []
  );


  // ——— Layout & điều hướng
  // const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  // const [currentPage, setCurrentPage] = useState<string>(MODULE_LIST[0].name);

  // ——— State cho ModalForm<User> (modal user)
  const [isOpenUserModal, setIsOpenUserModal] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  // ——— State khác bạn đang dùng ở vài trang (Page5S)
  const [type, setType] = useState<any>(null);

  const [modalState, setModalState] = useState<{
    open: boolean;
    form: any;
    mode: any;
    title: string;
    initialData: any;
  }>({
    open: false,
    form: null,
    mode: "create",
    title: "Thêm sản phẩm",
    initialData: null,
  });
  useEffect(() => {
    const cfg = MODULE_CONFIGS[currentPage];
    let active = true;

    // 1) Load lần đầu (hoặc fallback sang tableData tĩnh)
    (async () => {
      try {
        if (cfg?.load) {
          const rows = await cfg.load();
          if (active) setTableDataRuntime(rows);
        } else {
          setTableDataRuntime(cfg?.tableData ?? []);
        }
      } catch (e) {
        console.error(`[MODULE][${currentPage}] load error:`, e);
        if (active) setTableDataRuntime([]);
      }
    })();

    // 2) Đăng ký realtime nếu module có "table"
    let chan: any;
    if (cfg?.table && cfg?.mapRow) {
      chan = supabase
        .channel(`realtime:${cfg.table}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: cfg.table },
          (payload: any) => {
            setTableDataRuntime((prev) => {
              const row = cfg.mapRow(payload.new ?? payload.old);
              switch (payload.eventType) {
                case 'INSERT':
                  // thêm đầu danh sách cho dễ thấy
                  return [row, ...prev];
                case 'UPDATE':
                  return prev.map((x: any) => (x.id === row.id ? row : x));
                case 'DELETE':
                  return prev.filter((x: any) => x.id !== row.id);
                default:
                  return prev;
              }
            });
          }
        )
        .subscribe();
    }

    // cleanup khi rời module
    return () => {
      active = false;
      if (chan) supabase.removeChannel(chan);
    };
  }, [currentPage]);

  const SCHEMA_REGISTRY: any = {
    tonKho: tonKhoSchema,
    nhapKho: nhapKhoSchema,
    xuatKho: xuatKhoSchema, // TODO: thay schema thật
    kiemKe: kiemKeSchema,   // TODO: thay schema thật
    NCC: NCCSchema,
    DVT: DVTSchemaV2,
    SPDV: DVTSchema,
    danhSachSPDV: productServiceSchema
  };

  const openCreate = (form: any) =>
    setModalState({
      open: true,
      form,
      mode: "create",
      title: "Thêm sản phẩm",
      initialData: null,
    });

  const openEdit = (form: any, rowData: any) =>
    setModalState({
      open: true,
      form,
      mode: "edit",
      title: `Sửa sản phẩm${rowData?.name ? `: ${rowData.name}` : ""}`,
      initialData: rowData ?? null,
    });

  const closeDynamicModal = () =>
    setModalState((s) => ({ ...s, open: false }));

  const handleSubmitDynamic = (values: any) => {
    if (modalState.mode === "create") {
      console.log("Create product:", values);
    } else {
      console.log("Edit product:", values);
    }
    closeDynamicModal();
  };

  // ——— Cấu hình field cho ModalForm<User>
  const fields: FieldConfig[] = [
    { name: "name", label: "Tên người dùng", type: "text" },
    { name: "email", label: "Email", type: "text" },
    {
      name: "role",
      label: "Vai trò",
      type: "select",
      options: [
        { value: "admin", label: "Admin" },
        { value: "user", label: "User" },
      ],
    },
  ];

  const handleSubmitUser = (data: User) => {
    if (editUser) {
      console.log("Cập nhật:", data);
    } else {
      console.log("Tạo mới:", data);
    }
  };

  // ——— Render trang theo currentPage
  const renderPage = () => {
    if (MODULE_CONFIGS[currentPage]) {
      const cfg = MODULE_CONFIGS[currentPage];
      return (
        <ResourcePage
          {...cfg}
          tableData={tableDataRuntime}                   // title, tableTitle, tableData, sections
          type={type}                   // nếu bạn cần dùng type ở Header
          setEditUser={setEditUser}     // để fallback mở modal user cũ nếu chưa truyền onRowClick
          setIsOpen={setIsOpenUserModal}
          onAdd={(formKind: any) => {
            openCreate(formKind);
          }}
          onRowClick={(formKind: any, row: any) => {
            openEdit(formKind, row);
          }}
        />
      );
    }
    switch (currentPage) {
      case "Lệnh sản xuất":
        return (
          <LenhSanXuat
            setEditUser={setEditUser}
            setIsOpen={setIsOpenUserModal}
          />
        );
      case "Báo cáo nguồn lực":
        return <DashboardNguonLuc />;
      case "Báo cáo hiệu suất sản xuất":
        return <DashboardHieuSuat />;
      case "Chụp ảnh sau sản xuất":
        return (
          <Page5S
            setEditUser={setEditUser}
            setIsOpen={setIsOpenUserModal}
            type={type}
            setType={setType}
          />
        );
      default:
        return (
          <UnderConstruction
            page={currentPage}
            onBackHome={() => handleChangeCurrentPage("Trang chủ")}
          />
        );
    }
  };

  // nhóm mặc định mở (giống ảnh)
  // const [open, setOpen] = useState<any>({ kho: true, qlk: true });
  const [expandedByLevel, setExpandedByLevel] = useState<Record<number, string>>({});


  const toggleLevel = (id: string, depth: number) => {
    setExpandedByLevel((prev) => {
      // clone
      const next: Record<number, string> = { ...prev };

      // Nếu đang bấm lại đúng mục đang mở ở cấp này -> đóng nó và đóng cả các cấp dưới
      if (prev[depth] === id) {
        Object.keys(next)
          .map(Number)
          .filter((lvl) => lvl >= depth)
          .forEach((lvl) => delete next[lvl]);
        return next;
      }

      // Mở mục mới ở cấp này: đóng toàn bộ cấp hiện tại và các cấp sâu hơn
      Object.keys(next)
        .map(Number)
        .filter((lvl) => lvl >= depth)
        .forEach((lvl) => delete next[lvl]);

      next[depth] = id; // set mục đang mở cho cấp này
      return next;
    });
  };
  // Đóng tất cả nhánh từ cấp `depth` trở xuống
  const collapseFromLevel = (depth: number) => {
    setExpandedByLevel((prev) => {
      const next: Record<number, string> = { ...prev };
      Object.keys(next)
        .map(Number)
        .filter((lvl) => lvl >= depth)
        .forEach((lvl) => delete next[lvl]);
      return next;
    });
  };

  // Chọn 1 mục leaf (không có con) + đóng các nhánh liên quan
  const selectLeaf = (label: string, depth: number) => {
    setCurrentPage(label);
    collapseFromLevel(depth);
  };

  const handleChangeCurrentPage = (name: string) => setCurrentPage(name);
  const collapseVariants: any = {
    open: { height: "auto", opacity: 1, transition: { duration: 0.25, ease: [0.22, 0.61, 0.36, 1] } },
    collapsed: { height: 0, opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } },
  };
  // item (đệ quy) + vẽ nhánh dạng “tree”
  const renderItems = (items: any[], depth = 0): any => {
    const isRoot = depth === 0;

    return (
      <ul className={[isRoot ? "" : "ml-5 border-l border-gray-200", "space-y-1"].join(" ")}>
        {items.map((m: any) => {
          const Icon = m.icon;
          const hasChildren = Array.isArray(m.children) && m.children.length > 0;

          // ✅ chỉ mở 1 mục duy nhất tại mỗi cấp
          const isOpen = expandedByLevel[depth] === m.id;

          const active = currentPage === m.label;

          return (
            <li
              key={m.id}
              className={[
                "relative",
                !isRoot &&
                'before:content-[""] before:absolute before:top-5 before:-left-[1px] before:w-4 before:border-t before:border-gray-200',
              ].join(" ")}
            >
              <button
                type="button"
                onClick={() =>
                  hasChildren
                    ? toggleLevel(m.id, depth)          // như cũ
                    : selectLeaf(m.label, depth)        // ✅ leaf: chọn & đóng nhánh phù hợp
                }
                className={[
                  "group flex w-full items-center rounded-lg px-3 py-2 text-sm transition-colors",
                  active ? "bg-indigo-100 text-indigo-600" : "text-gray-600 hover:bg-gray-100 hover:text-gray-800",
                ].join(" ")}
              >
                {depth === 0 && Icon ? <Icon className="h-5 w-5 shrink-0 text-blue-500" /> : null}

                <span className={[depth === 0 ? "ml-3" : "ml-1", "font-medium", !sidebarOpen ? "hidden" : ""].join(" ")}>
                  {m.label}
                </span>

                {hasChildren && (
                  <span className={["ml-auto", !sidebarOpen ? "hidden" : ""].join(" ")}>
                    <svg width="16" height="16" viewBox="0 0 24 24" className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
                      <path d="M6 9l6 6 6-6" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                )}
              </button>

              <AnimatePresence initial={false}>
                {hasChildren && isOpen && (
                  <motion.div
                    key={`${m.id}-kids`}
                    variants={collapseVariants}
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    className="overflow-hidden mt-1"
                  >
                    {renderItems(m.children, depth + 1)}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    );
  };


  return (
    <>
      <div className="flex h-screen bg-gray-200">
        {/* ——— Sidebar ——— */}
        <motion.aside
          initial={false}
          animate={{ width: sidebarOpen ? 300 : 80 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-y-0 left-0 z-30 flex-shrink-0 overflow-y-auto bg-white shadow-lg lg:static lg:z-auto border-r border-gray-100"
        >
          <div className="flex h-full w-full flex-col">
            {/* Header / Logo */}
            <div className="flex h-[50px] items-center justify-start px-4 border-b">
              <img
                src={logoCongTy}
                alt="Logo công ty"
                className={`h-[70px] w-[200px] object-contain ${!sidebarOpen ? "hidden" : ""}`}
              />
            </div>

            {/* Nav */}
            <nav className="flex-1 space-y-2 px-2 py-4">{renderItems(MENU)}</nav>

            {/* Toggle collapse */}
            <div className="flex-shrink-0 border-t p-2">
              <button
                className="hidden w-full items-center justify-center rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-indigo-600 focus:outline-none lg:flex"
                onClick={() => setSidebarOpen((prev: any) => !prev)}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0"
                  animate={{ rotate: sidebarOpen ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </motion.svg>
                <span className={`ml-2 text-sm font-medium ${!sidebarOpen ? "hidden" : ""}`}>Thu gọn</span>
              </button>
            </div>
          </div>
        </motion.aside>


        {/* Overlay mobile (ẩn ở lg) */}
        {!sidebarOpen && (
          <div className="fixed inset-0 z-20 bg-black opacity-50 transition-opacity lg:hidden" />
        )}

        {/* ——— Main content ——— */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex h-[50px] items-center justify-between border-b bg-white px-4 md:px-6">
            <button className="text-gray-500 hover:text-indigo-600 focus:outline-none lg:hidden">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  stroke="currentColor"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>

            <div className="flex-1" />

            <div className="flex items-center space-x-4">
              <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    stroke="currentColor"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>

              <div className="relative">
                <button className="flex items-center space-x-2 rounded-md p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span className="font-medium text-gray-700">Tên Tài Khoản</span>
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      fill="currentColor"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    />
                  </svg>
                </button>
                {/* dropdown thực sẽ điều khiển bằng state riêng nếu cần */}
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto overflow-x-hidden pl-[10px] pr-[10px] bg-white">
            {renderPage()}
          </main>
        </div>
      </div>

      {/* ModalForm<User> dùng chung */}
      <ModalForm
        isOpen={isOpenUserModal}
        onClose={() => setIsOpenUserModal(false)}
        title={editUser ? "Chỉnh sửa User" : "Tạo mới User"}
        fields={fields}
        initialData={editUser ?? {}}
        onSubmit={handleSubmitUser}
        type={type}
        setType={setType}
      />
      {/* Modal dùng FormRenderer + schema động */}
      <Modal
        isOpen={modalState.open}
        onClose={closeDynamicModal}
        title={modalState.title}
        mode={modalState.mode}
      >
        {(() => {
          const activeSchema = SCHEMA_REGISTRY[modalState.form];
          if (!activeSchema) {
            return <div className="text-red-600">Chưa khai báo schema cho "{modalState.form}"</div>;
          }
          return (
            <FormRendererPro
              key={`${modalState.form}-${modalState.mode}-${modalState.initialData?.id ?? "new"}`}
              schema={activeSchema}
              initialData={modalState.initialData}
              mode={modalState.mode}
              onSubmit={handleSubmitDynamic}
              submitLabel={modalState.mode === "create" ? "Thêm mới" : "Cập nhật"}
              onClose={closeDynamicModal}
            />
          );
        })()}
      </Modal>
    </>
  );
}
