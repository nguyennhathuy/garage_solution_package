import NCCFooter from "../NCC/NCCFooter";
import NCCHeader from "../NCC/NCCHeader";
import BaoCao5SList from "./5SViewList";

export default function Page5S({ setEditUser, setIsOpen, type, setType }: any) {
    return (
        <div className='flex flex-col w-full h-full'>
            <NCCHeader
                setEditUser={setEditUser}
                setIsOpen={setIsOpen}
                type={type}
                setType={setType}
            />
            <BaoCao5SList/>
            <NCCFooter />
        </div>
    );
}
