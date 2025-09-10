// components/shared/ResourceInfoTitle.tsx
export default function ResourceInfoTitle({ title }: any) {
  return (
    <div className="h-[calc(100%/7)] w-full bg-[#fafafa] flex items-center px-2">
      <span className="font-semibold text-[16px]">
        {`Chi tiết ${title}`}
      </span>
    </div>
  );
}
