// components/shared/ResourceBodyInfo.tsx

import ResourceInfoTitle from "./ResourceInfoTitle";


export default function ResourceBodyInfo({ sections, title }: any) {
  return (
    <div className="w-full h-[50%] flex flex-col border-[0.5px] border-[#ccc]">
      <ResourceInfoTitle title={title} />
      <div className="flex-1 overflow-y-auto pb-[20px]">
        {sections?.map((sec: any, i: number) => (
          <div key={i} className="bg-white mt-[20px] ml-[10px]">
            <h2 className="text-blue-600 font-semibold text-sm">{sec.title}</h2>
            <div className="text-sm flex flex-wrap mt-[10px] pl-[10px] gap-y-[5px] border-l-[0.5px] border-[#ccc]">
              {sec.fields?.map((f: any, j: number) => (
                <p className={`text-gray-500 basis-1/${sec.cols}`} key={j}>
                  {`${f.label}: `}
                  <span className="text-black font-medium">{`${f.value}`}</span>
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
