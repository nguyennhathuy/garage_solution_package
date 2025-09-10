// components/shared/ResourceFooter.tsx
export default function ResourceFooter() {
  return (
    <div className="mb-[5px] w-full h-[42px] flex items-center justify-between">
      <div className="rounded-lg p-2 h-[32px] bg-gray-100 content-center text-sm">
        20 dòng
      </div>
      <div className="w-64 h-[32px] content-center text-right text-sm">
        Hiển thị 1 - 1 / 1 kết quả
      </div>
    </div>
  );
}
