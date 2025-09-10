// components/shared/ResourceTable.tsx
import { useState, useMemo } from "react";

export default function ResourceTable({
  tableData, tableTitle, columns, setEditUser, setIsOpen, onRowClick, formKind
}: any) {
  const rows: any[] = Array.isArray(tableData) ? tableData : [];
  const [selected, setSelected] = useState<any[]>([]);

  // ---- Chiều cao cố định ----
  const ROW_H = 42;     // mỗi dòng 42px
  const HEADER_H = 44;  // nếu muốn 42px cho header => đổi thành 42

  // Bắt buộc có khóa ổn định cho từng dòng
  const keyedRows = useMemo(
    () => rows.map((r: any, idx: number) => ({ __key: r.id ?? r.ma ?? r.maNguyenLieu ?? idx, ...r })),
    [rows]
  );

  // ---- Xác định cột hiển thị (ưu tiên props.columns -> tableTitle -> suy từ dữ liệu) ----
  const cols = useMemo(() => {
    // 1) Có định nghĩa columns (label + accessor)
    if (Array.isArray(columns) && columns.length) {
      // [{ label: 'Tên', accessor: 'ten' }, ...]
      return columns.map((c: any) => ({ label: c.label, accessor: c.accessor, _pos: null }));
    }
    // 2) Có tableTitle (label) -> fallback theo vị trí
    if (Array.isArray(tableTitle) && tableTitle.length) {
      // accessor = null, _pos = index
      return tableTitle.map((label: any, i: number) => ({ label, accessor: null, _pos: i }));
    }
    // 3) Không có gì -> suy từ keys của dòng đầu
    const first = keyedRows[0] ?? {};
    const keys = Object.keys(first).filter(k => k !== "__key" && k !== "id");
    return keys.map((k) => ({ label: k, accessor: k, _pos: null }));
  }, [columns, tableTitle, keyedRows]);

  const colCount = cols.length;

  // ---- Chọn tất cả / chọn lẻ ----
  const toggleSelectAll = () => {
    if (selected.length === keyedRows.length) setSelected([]);
    else setSelected(keyedRows.map((o: any) => o.__key));
  };

  const toggleSelectRow = (key: any) => {
    setSelected(prev => prev.includes(key) ? prev.filter(x => x !== key) : [...prev, key]);
  };

  // ---- Lấy giá trị cell theo định nghĩa cột ----
  const getCells = (row: any) => {
    // nếu có accessor -> lấy theo accessor
    // nếu chỉ có _pos -> lấy theo thứ tự Object.entries(row) (loại bỏ id/__key)
    if (cols.some(c => c.accessor)) {
      return cols.map((c) => String(row[c.accessor as string] ?? ""));
    }
    const values = Object.entries(row)
      .filter(([k]) => k !== "__key" && k !== "id")
      .map(([_, v]) => v);
    return cols.map((c) => String(values[c._pos as number] ?? ""));
  };

  return (
    // LƯU Ý: KHÔNG để h-full ở <table>, để tránh hàng bị kéo giãn
    <table className="text-sm w-full table-fixed border-collapse border border-gray-300 bg-white shadow">
      <thead>
        <tr className="bg-gray-200 text-gray-700" style={{ height: HEADER_H }}>
          <th className="border border-gray-300 w-[42px]">
            <div className="h-[44px] flex items-center justify-center px-2">
              <input
                type="checkbox"
                checked={selected.length === keyedRows.length && keyedRows.length > 0}
                onChange={toggleSelectAll}
              />
            </div>
          </th>
          {cols.map((c: any, i: number) => (
            <th key={i} className="border border-gray-300 text-left">
              <div className="h-[44px] flex items-center px-2 font-semibold">
                {c.label}
              </div>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {keyedRows.length === 0 ? (
          <tr style={{ height: ROW_H }}>
            <td className="border border-gray-300 text-gray-500" colSpan={colCount + 1}>
              <div className="h-[42px] flex items-center px-2">Không có dữ liệu</div>
            </td>
          </tr>
        ) : (
          keyedRows.map((row: any) => {
            const cells = getCells(row);
            return (
              <tr key={row.__key} className="hover:bg-gray-50" style={{ height: ROW_H }}>
                <td className="border border-gray-300 w-[42px]">
                  <div className="h-[42px] flex items-center justify-center px-2">
                    <input
                      type="checkbox"
                      checked={selected.includes(row.__key)}
                      onChange={() => toggleSelectRow(row.__key)}
                    />
                  </div>
                </td>

                {cells.map((cell: any, i: number) => (
                  <td
                    key={i}
                    className="border border-gray-300 text-left cursor-pointer"
                    onClick={() => {
                      if (typeof onRowClick === "function") onRowClick(formKind, row);
                      else {
                        setEditUser?.(null);
                        setIsOpen?.(true);
                      }
                    }}
                  >
                    {/* Wrapper để ô luôn cao 42px và không giãn */}
                    <div className="h-[42px] flex items-center px-2 overflow-hidden text-ellipsis whitespace-nowrap">
                      {cell}
                    </div>
                  </td>
                ))}
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}
