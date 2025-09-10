// components/shared/ResourceBodyTable.tsx
import React from "react";
import ResourceTable from "./ResourceTable";

export default function ResourceBodyTable({
  tableData, tableTitle, columns, setEditUser, setIsOpen, onRowClick, onSelectRow, formKind
}: any) {
  return (
    <div className="w-full h-[50%] overflow-y-auto">
      <ResourceTable
        tableData={tableData}
        tableTitle={tableTitle}
        columns={columns}
        setEditUser={setEditUser}
        setIsOpen={setIsOpen}
        formKind={formKind}
        onRowClick={(fk: any, row: any) => {
          onSelectRow?.(row);
          onRowClick?.(fk, row);
        }}
      />
    </div>
  );
}
