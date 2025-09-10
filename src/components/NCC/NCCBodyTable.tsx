import OrderTable from "../OrderTable/OrderTable";


export default function NCCBodyTable({ tableData, tableTitle, setEditUser, setIsOpen }: any) {
    return (
        <div className="w-full h-[50%] overflow-y-auto">
            <OrderTable 
                tableData={tableData}
                tableTitle={tableTitle}
                setEditUser={setEditUser}
                setIsOpen={setIsOpen}
            />
        </div>
    );
}