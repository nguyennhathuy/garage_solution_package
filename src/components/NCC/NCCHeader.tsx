import { PlusIcon } from "@heroicons/react/24/solid";


export default function NCCHeader({ setEditUser, setIsOpen, type }: any) {
    return (
        <div className="mt-[5px] w-full h-[42px] flex items-center justify-between">
            <button
                className="px-2 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 h-[32px] font-semibold text-[12px] flex items-center gap-1"
                onClick={() => {
                    if(type === 'Chụp ảnh sau sản xuất') {
                        setEditUser(null);
                        setIsOpen(true);
                    }
                }}
            >
                <PlusIcon className="w-4 h-4" />
                Thêm
            </button>
            <div className="relative w-64 h-[32px]">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z" />
                    </svg>
                </span>
                <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full h-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#008cff] focus:ring-2 focus:ring-[#008cff]/25"
                />
            </div>
        </div>
    )
}