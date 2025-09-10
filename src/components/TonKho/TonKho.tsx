import NCCBody from "../NCC/NCCBody";
import NCCFooter from "../NCC/NCCFooter";
import NCCHeader from "../NCC/NCCHeader";
import { sections, tableData, tableTitle, title } from "./TonKho.constants";


export default function TonKho({ setEditUser, setIsOpen }: any) {return (
        <div className='flex flex-col w-full h-full'>
            <NCCHeader
                setEditUser={setEditUser}
                setIsOpen={setIsOpen}
            />
            <NCCBody
                sections={sections}
                tableData={tableData}
                tableTitle={tableTitle}
                title={title}
            />
            <NCCFooter />
        </div>
    )
}