import NCCBodyTable from "../NCC/NCCBodyTable";
import { tableData, tableTitle } from "./LenhSanXuat.constant";



export default function LenhSanXuatBody({ setEditUser, setIsOpen }: any) {
    return (
        <div className="flex-1 mt-[5px] mb-[5px] rounded-t-[10px] bg-white overflow-hidden">
            <NCCBodyTable 
                tableData={tableData}
                tableTitle={tableTitle}
                setEditUser={setEditUser}
                setIsOpen={setIsOpen}
            />
        </div>
    );
}