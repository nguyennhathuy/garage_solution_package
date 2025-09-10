import React, { useEffect, useMemo, useRef, useState } from "react";

type Any = any;

export default function ProductServiceModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: Any) {
  const [activeNav, setActiveNav] = useState<
    "info" | "settings" | "images" | "inventory" | "pricing" | "attributes" | "notes"
  >("info");

  const [open, setOpen] = useState<any>({
    info: true,
    settings: true,
    images: true,
    inventory: true,
    pricing: true,
    attributes: true,
    notes: true,
  });

  // ==== NEW: flash viền xanh theo section trong 2s ====
  const [flash, setFlash] = useState<any>({});
  const flashTimers = useRef<Record<string, any>>({});
  useEffect(() => {
    return () => {
      Object.values(flashTimers.current).forEach((t) => clearTimeout(t));
    };
  }, []);
  // ===================================================

  const refs = {
    info: useRef<any>(null),
    settings: useRef<any>(null),
    images: useRef<any>(null),
    inventory: useRef<any>(null),
    pricing: useRef<any>(null),
    attributes: useRef<any>(null),
    notes: useRef<any>(null),
  };

  const overlayRef = useRef<any>(null);

  const defaultForm = useMemo(
    () => ({
      code: "",
      name: "",
      unit: "",
      barcode: "",
      group: "",
      materialType: "",
      basePrice: "",
      costPrice: "",
      taxRate: "",
      origin: "",
      brand: "",
      isService: false,
      isQuickSell: false,
      trackStock: false,
      basePriceExcludesVAT: false,
      isActive: true,
      lockSalePrice: false,
      sku: "",
      location: "",
      shelf: "",
      minQty: "",
      maxQty: "",
      lowStockAlert: false,
      retailPrice: "",
      wholesalePrice: "",
      discountPercent: "",
      vatApplied: true,
      promoStart: "",
      promoEnd: "",
      color: "",
      size: "",
      capacity: "",
      description: "",
      internalNote: "",
      images: [] as (File | string)[],
    }),
    []
  );

  const [form, setForm] = useState<any>(initialData || defaultForm);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) setForm(initialData || defaultForm);
  }, [isOpen, initialData, defaultForm]);

  const handleInput = (e: any) =>
    setForm((s: any) => ({ ...s, [e.target.name]: e.target.value }));
  const handleCheck = (e: any) =>
    setForm((s: any) => ({ ...s, [e.target.name]: e.target.checked }));

  const toggle = (key: typeof activeNav) => setOpen((s: any) => ({ ...s, [key]: !s[key] }));

  const go = (key: typeof activeNav) => {
    setActiveNav(key);
    setOpen((s: any) => ({ ...s, [key]: true })); // mở section nếu đang đóng
    const el = refs[key].current;
    requestAnimationFrame(() => el?.scrollIntoView({ behavior: "smooth", block: "start" }));

    // ==== NEW: bật flash viền xanh 2s ====
    if (flashTimers.current[key]) clearTimeout(flashTimers.current[key]);
    setFlash((s: any) => ({ ...s, [key]: true }));
    flashTimers.current[key] = setTimeout(() => {
      setFlash((s: any) => ({ ...s, [key]: false }));
    }, 500);
    // =====================================
  };

  const handleReset = () => setForm({ ...defaultForm });
  const handleSave = () => onSave?.(form);

  const pickImage = (idx: number) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      setForm((s: any) => {
        const next = [...(s.images || [])];
        next[idx] = file;
        return { ...s, images: next };
      });
    };
    input.click();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onMouseDown={(e) => e.target === overlayRef.current && onClose?.()}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-6"
    >
      <div
        role="dialog"
        aria-modal="true"
        // className="flex h-[90vh] max-h-[90vh] w-[96vw] max-w-[1200px] flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
        className="flex h-[90%] max-h-[90%] w-[90%] flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-3">
          <div className="font-semibold text-[16px]">Thêm sản phẩm & dịch vụ</div>
          <button
            aria-label="Đóng"
            onClick={() => onClose?.()}
            className="grid h-8 w-8 place-items-center rounded-full bg-gray-100 text-xl transition hover:scale-110"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[240px_1fr]">
          {/* Sidebar */}
          <aside className="hidden min-h-0 overflow-auto border-r bg-gray-50 p-2 md:block">
            {[
              ["info", "Thông tin chính"],
              ["settings", "Thiết lập"],
              ["images", "Hình ảnh"],
              ["inventory", "Kho & tồn kho"],
              ["pricing", "Giá bán"],
              ["attributes", "Thuộc tính"],
              ["notes", "Ghi chú"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => go(key as any)}
                className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-gray-100 ${activeNav === key ? "bg-indigo-50 font-semibold text-indigo-600" : ""
                  }`}
              >
                {label}
              </button>
            ))}
          </aside>

          {/* Content (scrollable) */}
          <main className="min-h-0 overflow-auto bg-white p-3">
            {/* Thông tin chính */}
            <Accordion
              refEl={refs.info}
              title="Thông tin chính"
              open={open.info}
              onToggle={() => toggle("info")}
              flash={!!flash.info}   // <-- NEW
            >
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <Field label="Mã SP, DV">
                  <input
                    name="code"
                    value={form.code}
                    onChange={handleInput}
                    placeholder="Nhập hoặc tạo tự động"
                    className="h-9 rounded-lg border border-gray-300 px-2 text-sm placeholder:text-gray-400"
                  />
                </Field>

                <Field
                  label={
                    <>
                      Tên SP, DV <span className="text-red-500">*</span>
                    </>
                  }
                >
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleInput}
                    placeholder="Nhập tên sản phẩm, dịch vụ"
                    className="h-9 rounded-lg border border-gray-300 px-2 text-sm placeholder:text-gray-400"
                  />
                </Field>

                <Field
                  label={
                    <>
                      Đơn vị tính <span className="text-red-500">*</span>
                    </>
                  }
                >
                  <select
                    name="unit"
                    value={form.unit}
                    onChange={handleInput}
                    className="h-9 rounded-lg border border-gray-300 px-2 text-sm"
                  >
                    <option value="">Chọn đơn vị tính</option>
                    <option value="cai">Cái</option>
                    <option value="bo">Bộ</option>
                    <option value="lit">Lít</option>
                    <option value="kg">Kg</option>
                  </select>
                </Field>

                <Field label="Mã vạch">
                  <input
                    name="barcode"
                    value={form.barcode}
                    onChange={handleInput}
                    placeholder="Nhập mã vạch (nếu có)"
                    className="h-9 rounded-lg border border-gray-300 px-2 text-sm placeholder:text-gray-400"
                  />
                </Field>

                <Field label="Nhóm SP, DV">
                  <input
                    name="group"
                    value={form.group}
                    onChange={handleInput}
                    placeholder="Chọn nhóm sản phẩm, dịch vụ"
                    list="group-list"
                    className="h-9 rounded-lg border border-gray-300 px-2 text-sm placeholder:text-gray-400"
                  />
                  <datalist id="group-list">
                    <option value="Dầu nhớt" />
                    <option value="Phụ tùng" />
                    <option value="Dịch vụ rửa xe" />
                  </datalist>
                </Field>

                <Field label="Loại vật tư">
                  <input
                    name="materialType"
                    value={form.materialType}
                    onChange={handleInput}
                    placeholder="Chọn loại vật tư"
                    list="material-list"
                    className="h-9 rounded-lg border border-gray-300 px-2 text-sm placeholder:text-gray-400"
                  />
                  <datalist id="material-list">
                    <option value="Nguyên vật liệu" />
                    <option value="Phụ tùng" />
                    <option value="Công cụ dụng cụ" />
                    <option value="Hàng hóa" />
                  </datalist>
                </Field>

                <Field label="Giá bán gốc">
                  <div className="relative">
                    <input
                      name="basePrice"
                      value={form.basePrice}
                      onChange={handleInput}
                      placeholder="Nhập giá bán gốc"
                      inputMode="decimal"
                      className="h-9 w-full rounded-lg border border-gray-300 px-2 pr-14 text-sm placeholder:text-gray-400"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                      VND
                    </span>
                  </div>
                </Field>

                <Field label="Giá vốn">
                  <div className="relative">
                    <input
                      name="costPrice"
                      value={form.costPrice}
                      onChange={handleInput}
                      placeholder="Nhập giá vốn"
                      inputMode="decimal"
                      className="h-9 w-full rounded-lg border border-gray-300 px-2 pr-14 text-sm placeholder:text-gray-400"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                      VND
                    </span>
                  </div>
                </Field>

                <Field label="Thuế suất">
                  <select
                    name="taxRate"
                    value={form.taxRate}
                    onChange={handleInput}
                    className="h-9 rounded-lg border border-gray-300 px-2 text-sm"
                  >
                    <option value="">Chọn thuế suất</option>
                    <option value="0">0%</option>
                    <option value="5">5%</option>
                    <option value="8">8%</option>
                    <option value="10">10%</option>
                  </select>
                </Field>

                <Field label="Xuất xứ">
                  <input
                    name="origin"
                    value={form.origin}
                    onChange={handleInput}
                    placeholder="Chọn xuất xứ"
                    list="origin-list"
                    className="h-9 rounded-lg border border-gray-300 px-2 text-sm placeholder:text-gray-400"
                  />
                  <datalist id="origin-list">
                    <option value="Việt Nam" />
                    <option value="Thái Lan" />
                    <option value="Nhật Bản" />
                    <option value="Hoa Kỳ" />
                  </datalist>
                </Field>

                <Field label="Thương hiệu">
                  <input
                    name="brand"
                    value={form.brand}
                    onChange={handleInput}
                    placeholder="Chọn thương hiệu"
                    list="brand-list"
                    className="h-9 rounded-lg border border-gray-300 px-2 text-sm placeholder:text-gray-400"
                  />
                  <datalist id="brand-list">
                    <option value="Castrol" />
                    <option value="Shell" />
                    <option value="Motul" />
                    <option value="OEM" />
                  </datalist>
                </Field>

                <div />
              </div>
            </Accordion>

            {/* Thiết lập */}
            {/* <Accordion
              refEl={refs.settings}
              title="Thiết lập"
              open={open.settings}
              onToggle={() => toggle("settings")}
              flash={!!flash.settings}  // <-- NEW
            >
              <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-x-5">
                <Check name="isService" checked={!!form.isService} onChange={handleCheck} label="Là dịch vụ" />
                <Check name="isQuickSell" checked={!!form.isQuickSell} onChange={handleCheck} label="Sản phẩm bán nhanh" />
                <Check name="trackStock" checked={!!form.trackStock} onChange={handleCheck} label="Theo dõi tồn kho" />
                <Check
                  name="basePriceExcludesVAT"
                  checked={!!form.basePriceExcludesVAT}
                  onChange={handleCheck}
                  label="Giá gốc chưa bao gồm VAT"
                />
                <Check name="isActive" checked={!!form.isActive} onChange={handleCheck} label="Còn hoạt động" />
                <Check name="lockSalePrice" checked={!!form.lockSalePrice} onChange={handleCheck} label="Không sửa giá bán" />
              </div>
            </Accordion> */}

            {/* Hình ảnh */}
            {/* <Accordion
              refEl={refs.images}
              title="Hình ảnh"
              open={open.images}
              onToggle={() => toggle("images")}
              flash={!!flash.images}  // <-- NEW
            >
              <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
                {Array.from({ length: 6 }).map((_, i) => {
                  const item = form.images?.[i];
                  return (
                    <div
                      key={i}
                      role="button"
                      tabIndex={0}
                      onClick={() => pickImage(i)}
                      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && pickImage(i)}
                      className="grid aspect-square place-items-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:bg-gray-100"
                    >
                      {item ? (
                        typeof item === "string" ? (
                          <img src={item} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <img
                            src={URL.createObjectURL(item)}
                            alt=""
                            onLoad={(e: any) => URL.revokeObjectURL(e.currentTarget.src)}
                            className="h-full w-full object-cover"
                          />
                        )
                      ) : (
                        <span className="text-2xl text-slate-400">+</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </Accordion> */}

            {/* Kho & tồn kho */}
            {/* <Accordion
              refEl={refs.inventory}
              title="Kho & tồn kho"
              open={open.inventory}
              onToggle={() => toggle("inventory")}
              flash={!!flash.inventory}  // <-- NEW
            >
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <Field label="SKU">
                  <input
                    name="sku"
                    value={form.sku}
                    onChange={handleInput}
                    placeholder="Mã quản lý nội bộ"
                    className="h-9 rounded-lg border border-gray-300 px-2 text-sm placeholder:text-gray-400"
                  />
                </Field>
                <Field label="Vị trí kho">
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleInput}
                    placeholder="VD: Kho Nguyên liệu"
                    className="h-9 rounded-lg border border-gray-300 px-2 text-sm placeholder:text-gray-400"
                  />
                </Field>
                <Field label="Mã kệ/ngăn">
                  <input
                    name="shelf"
                    value={form.shelf}
                    onChange={handleInput}
                    placeholder="VD: Kệ A-01"
                    className="h-9 rounded-lg border border-gray-300 px-2 text-sm placeholder:text-gray-400"
                  />
                </Field>
                <Field label="Tồn tối thiểu">
                  <input
                    name="minQty"
                    value={form.minQty}
                    onChange={handleInput}
                    inputMode="numeric"
                    placeholder="0"
                    className="h-9 rounded-lg border border-gray-300 px-2 text-sm"
                  />
                </Field>
                <Field label="Tồn tối đa">
                  <input
                    name="maxQty"
                    value={form.maxQty}
                    onChange={handleInput}
                    inputMode="numeric"
                    placeholder="0"
                    className="h-9 rounded-lg border border-gray-300 px-2 text-sm"
                  />
                </Field>
                <div className="flex items-center">
                  <label className="inline-flex items-center gap-2 text-sm text-gray-900">
                    <input
                      type="checkbox"
                      name="lowStockAlert"
                      checked={!!form.lowStockAlert}
                      onChange={handleCheck}
                      className="h-4 w-4"
                    />
                    <span>Bật cảnh báo sắp hết hàng</span>
                  </label>
                </div>
              </div>
            </Accordion> */}

            {/* Giá bán */}
            {/* <Accordion
              refEl={refs.pricing}
              title="Giá bán"
              open={open.pricing}
              onToggle={() => toggle("pricing")}
              flash={!!flash.pricing}  // <-- NEW
            >
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <Field label="Giá bán lẻ">
                  <div className="relative">
                    <input
                      name="retailPrice"
                      value={form.retailPrice}
                      onChange={handleInput}
                      inputMode="decimal"
                      placeholder="0"
                      className="h-9 w-full rounded-lg border border-gray-300 px-2 pr-14 text-sm"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                      VND
                    </span>
                  </div>
                </Field>
                <Field label="Giá bán sỉ">
                  <div className="relative">
                    <input
                      name="wholesalePrice"
                      value={form.wholesalePrice}
                      onChange={handleInput}
                      inputMode="decimal"
                      placeholder="0"
                      className="h-9 w-full rounded-lg border border-gray-300 px-2 pr-14 text-sm"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                      VND
                    </span>
                  </div>
                </Field>
                <Field label="Chiết khấu (%)">
                  <input
                    name="discountPercent"
                    value={form.discountPercent}
                    onChange={handleInput}
                    inputMode="decimal"
                    placeholder="0"
                    className="h-9 rounded-lg border border-gray-300 px-2 text-sm"
                  />
                </Field>
                <div className="flex items-center">
                  <label className="inline-flex items-center gap-2 text-sm text-gray-900">
                    <input
                      type="checkbox"
                      name="vatApplied"
                      checked={!!form.vatApplied}
                      onChange={handleCheck}
                      className="h-4 w-4"
                    />
                    <span>Áp dụng VAT vào giá bán</span>
                  </label>
                </div>
                <Field label="Bắt đầu KM">
                  <input
                    type="date"
                    name="promoStart"
                    value={form.promoStart}
                    onChange={handleInput}
                    className="h-9 rounded-lg border border-gray-300 px-2 text-sm"
                  />
                </Field>
                <Field label="Kết thúc KM">
                  <input
                    type="date"
                    name="promoEnd"
                    value={form.promoEnd}
                    onChange={handleInput}
                    className="h-9 rounded-lg border border-gray-300 px-2 text-sm"
                  />
                </Field>
              </div>
            </Accordion> */}

            {/* Thuộc tính */}
            {/* <Accordion
              refEl={refs.attributes}
              title="Thuộc tính"
              open={open.attributes}
              onToggle={() => toggle("attributes")}
              flash={!!flash.attributes}  // <-- NEW
            >
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <Field label="Màu sắc">
                  <input
                    name="color"
                    value={form.color}
                    onChange={handleInput}
                    placeholder="Đỏ / Đen / Trắng..."
                    className="h-9 rounded-lg border border-gray-300 px-2 text-sm placeholder:text-gray-400"
                  />
                </Field>
                <Field label="Kích thước">
                  <input
                    name="size"
                    value={form.size}
                    onChange={handleInput}
                    placeholder="S / M / L ..."
                    className="h-9 rounded-lg border border-gray-300 px-2 text-sm placeholder:text-gray-400"
                  />
                </Field>
                <Field label="Dung lượng">
                  <input
                    name="capacity"
                    value={form.capacity}
                    onChange={handleInput}
                    placeholder="256GB / 1L ..."
                    className="h-9 rounded-lg border border-gray-300 px-2 text-sm placeholder:text-gray-400"
                  />
                </Field>
              </div>
            </Accordion> */}

            {/* Ghi chú */}
            {/* <Accordion
              refEl={refs.notes}
              title="Ghi chú"
              open={open.notes}
              onToggle={() => toggle("notes")}
              flash={!!flash.notes}  // <-- NEW
            >
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <Field label="Mô tả">
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleInput}
                    rows={4}
                    placeholder="Mô tả sản phẩm/dịch vụ"
                    className="min-h-[92px] rounded-lg border border-gray-300 p-2 text-sm"
                  />
                </Field>
                <Field label="Ghi chú nội bộ">
                  <textarea
                    name="internalNote"
                    value={form.internalNote}
                    onChange={handleInput}
                    rows={4}
                    placeholder="Hiển thị cho nội bộ"
                    className="min-h-[92px] rounded-lg border border-gray-300 p-2 text-sm"
                  />
                </Field>
                <div />
              </div>
            </Accordion> */}
          </main>
        </div>

        {/* Footer */}
        <div className="grid grid-cols-[1fr_auto] gap-3 border-t p-2">
          <div />
          <div className="inline-flex gap-2">
            <button className="h-9 rounded-lg border border-gray-300 bg-white px-4 text-sm transition hover:bg-gray-100" onClick={() => onClose?.()}>
              Đóng
            </button>
            <button className="h-9 rounded-lg border border-gray-300 bg-white px-4 text-sm transition hover:bg-gray-100" onClick={handleReset}>
              Nhập lại
            </button>
            <button className="h-9 rounded-lg bg-indigo-600 px-4 text-sm text-white transition hover:bg-indigo-800" onClick={handleSave}>
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Helpers (Tailwind only) ---------- */
function Accordion({
  refEl,
  title,
  open,
  onToggle,
  children,
  flash,
}: { refEl: any; title: string; open: boolean; onToggle: () => void; children: React.ReactNode; flash?: boolean }) {
  return (
    <section
      ref={refEl}
      className={`mb-3 rounded-xl border bg-white transition-colors duration-300 ${flash ? "border-[rgb(0,140,255)]" : "border-gray-200"
        }`}
    >
      <button
        aria-expanded={open}
        onClick={onToggle}
        className="flex w-full items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 font-semibold text-gray-900 transition hover:bg-gray-100"
      >
        <Chevron open={open} />
        <span>{title}</span>
      </button>

      {/* Giữ modal cao cố định; phần nội dung accordion animate bằng max-height */}
      <div
        className={`overflow-hidden px-3 transition-[max-height,padding] duration-200 ${open ? "max-h-[1600px] py-3" : "max-h-0 py-0"
          }`}
      >
        {children}
      </div>
    </section>
  );
}

function Field({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-600">{label}</label>
      {children}
    </div>
  );
}

function Check({ name, checked, onChange, label }: Any) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-gray-900 cursor-pointer">
      <input type="checkbox" name={name} checked={checked} onChange={onChange} className="h-4 w-4" />
      <span>{label}</span>
    </label>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" className={`transition-transform ${open ? "rotate-180" : ""}`}>
      <path d="M6 9l6 6 6-6" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}