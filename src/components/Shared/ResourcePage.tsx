// components/shared/ResourcePage.tsx
import React, { useState } from "react";
import ResourceBody from "./ResourceBody";
import ResourceFooter from "./ResourceFooter";
import ResourceHeader from "./ResourceHeader";

export default function ResourcePage({
  formKind,
  title,          // ví dụ: 'sản phẩm'
  tableTitle,     // mảng tên cột (cũ) – vẫn hỗ trợ
  columns,        // [{label, accessor}] – mới, khuyến nghị
  tableData,      // mảng dữ liệu
  sections,       // mảng section mặc định (khi chưa chọn)
  buildSections,  // (row) => sections chi tiết theo dòng – mới
  // ngữ cảnh & callback
  setEditUser,
  setIsOpen,
  type,
  onAdd,
  onRowClick,
}: any) {
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const effectiveSections = buildSections
    ? buildSections(selectedRow)
    : sections;

  return (
    <div className="flex flex-col w-full h-full">
      <ResourceHeader onAdd={onAdd} formKind={formKind} />
      <ResourceBody
        title={title}
        tableTitle={tableTitle}
        columns={columns}
        tableData={tableData}
        sections={effectiveSections}
        setEditUser={setEditUser}
        setIsOpen={setIsOpen}
        onRowClick={onRowClick}
        onSelectRow={setSelectedRow}
        formKind={formKind}
      />
      <ResourceFooter />
    </div>
  );
}
