import { sections, tableData, tableTitle, title } from "./NCC.constants";
import NCCBody from "./NCCBody";
import NCCFooter from "./NCCFooter";
import NCCHeader from './NCCHeader'


export default function NCC({ setEditUser, setIsOpen }: any) {return (
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