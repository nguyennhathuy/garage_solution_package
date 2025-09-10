import { useState } from "react";

export default function OrderTable({ tableData, tableTitle, setEditUser, setIsOpen }: any) {
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelectAll = () => {
    if (selected.length === tableData.length) {
      setSelected([]);
    } else {
      setSelected(tableData.map((o: any) => o.id));
    }
  };

  const toggleSelectRow = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <table className="text-sm w-full h-full table-fixed border-collapse border border-gray-300 bg-white shadow">
        <thead>
            <tr className="bg-gray-200 text-gray-700 h-[calc(100%/7)]">
                <th 
                    className="p-2 border border-gray-300 w-[42px]"
                >
                    <input
                    type="checkbox"
                    checked={selected.length === tableData.length}
                    onChange={toggleSelectAll}
                    />
                </th>
                {
                  tableTitle.map(
                    (m: any, i: any) => {
                      return(
                        <th key={i} className="p-2 border border-gray-300 text-left">{m}</th>
                      );
                    }
                  )
                }
            </tr>
        </thead>
        <tbody>
            {tableData.map((ncc: any) => (
            <tr
                key={ncc.id}
                className="hover:bg-gray-50 text-center h-[calc(100%/7)]"
            >
                <td 
                    className="p-2 border border-gray-300 w-[42px]"
                >
                    <input
                        type="checkbox"
                        checked={selected.includes(ncc.id)}
                        onChange={() => toggleSelectRow(ncc.id)}
                    />
                </td>
                {
                  Object.values(ncc).map(
                    (m: any, i: any) => {
                      return (
                        <td 
                          key={i} 
                          className="p-2 border border-gray-300 text-left cursor-pointer"
                          onClick={() => {
                            setEditUser(null);
                            setIsOpen(true);
                          }}
                        >
                          {m}
                        </td>
                      );
                    }
                  )
                }
            </tr>
            ))}
        </tbody>
    </table>
  );
}