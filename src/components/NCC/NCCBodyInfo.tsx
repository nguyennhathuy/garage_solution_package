import InfoTitle from "./InfoTitle";

export default function NCCBodyInfo({ sections, title }: any) {
    return (
        <div className="w-full h-[50%] flex flex-col border-[0.5px] border-[#ccc]">
            <InfoTitle 
                title={title}
            />
            <div className="flex-1 overflow-y-auto pb-[20px]">
                {
                    sections.map(
                    (m: any, i: any) => {
                        return (
                        <div key={i} className="bg-white mt-[20px] ml-[10px]">
                            <h2 className="text-blue-600 font-semibold text-sm">{m.title}</h2>
                            <div className="text-sm flex flex-wrap mt-[10px] pl-[10px] gap-y-[5px] border-l-[0.5px] border-[#ccc]">
                            {
                                m.fields.map(
                                    (n: any, j: any) => {
                                        return (
                                        <p 
                                            className={`text-gray-500 basis-1/${m.cols}`} 
                                            key={j}
                                        >
                                            {`${n.label}: `}
                                            <span className="text-black font-medium">{`${n.value}`}</span>
                                        </p>
                                        )
                                    }
                                )
                            }
                            </div>
                        </div>
                        );
                    }
                    )
                }
            </div>
        </div>
    );
}