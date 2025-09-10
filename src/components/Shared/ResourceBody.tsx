// components/shared/ResourceBody.tsx
import React from "react";
import ResourceBodyInfo from "./ResourceBodyInfo";
import ResourceBodyTable from "./ResourceBodyTable";

export default function ResourceBody({
  sections, tableData, tableTitle, columns, title,
  setEditUser, setIsOpen, onRowClick, onSelectRow, formKind
}: any) {
  return (
    <div className="flex-1 mt-[5px] mb-[5px] rounded-t-[10px] bg-white overflow-hidden">
      <ResourceBodyTable
        tableData={tableData}
        tableTitle={tableTitle}
        columns={columns}
        setEditUser={setEditUser}
        setIsOpen={setIsOpen}
        onRowClick={onRowClick}
        onSelectRow={onSelectRow}
        formKind={formKind}
      />
      <ResourceBodyInfo sections={sections} title={title} />
    </div>
  );
}
