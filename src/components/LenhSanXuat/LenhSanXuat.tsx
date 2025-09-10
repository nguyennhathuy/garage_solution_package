import { sections } from "../NCC";
import NCCFooter from "../NCC/NCCFooter";
import NCCHeader from "../NCC/NCCHeader";
import { title } from "./LenhSanXuat.constant";
import LenhSanXuatBody from "./LenhSanXuatBody";

export default function LenhSanXuat({ setEditUser, setIsOpen }: any) {return (
        <div className='flex flex-col w-full h-full'>
            <NCCHeader 
                setEditUser={setEditUser}
                setIsOpen={setIsOpen}
            />
            <LenhSanXuatBody 
                sections={sections}
                title={title}
                setEditUser={setEditUser}
                setIsOpen={setIsOpen}
            />
            <NCCFooter />
        </div>
    )
}