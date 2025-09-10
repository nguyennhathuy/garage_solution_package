import NCCBodyInfo from "./NCCBodyInfo";
import NCCBodyTable from "./NCCBodyTable";


export default function NCCBody({ sections, tableData, tableTitle, title }: any) {
    return (
        <div className="flex-1 mt-[5px] mb-[5px] rounded-t-[10px] bg-white overflow-hidden">
            <NCCBodyTable 
                tableData={tableData}
                tableTitle={tableTitle}
            />
            <NCCBodyInfo 
                sections={sections}
                title={title}
            />
        </div>
    );
}