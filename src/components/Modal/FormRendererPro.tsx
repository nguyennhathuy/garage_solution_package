// components/Modal/FormRendererPro.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../../lib/supabase";

// ===== Field components (simple, tailwind-only) =====
const TextField = ({ label, value, onChange, placeholder, error }: any) => (
    <div>
        {label && <label className="block text-xs text-gray-600 mb-1">{label}</label>}
        <input
            type="text"
            className={`w-full rounded-lg border px-3 py-2 text-sm ${error ? "border-red-400" : "border-gray-300"}`}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
        />
    </div>
);

const NumberField = ({ label, value, onChange, placeholder, suffix, error }: any) => (
    <div>
        {label && <label className="block text-xs text-gray-600 mb-1">{label}</label>}
        <div className="relative">
            <input
                type="number"
                inputMode="decimal"
                className={`w-full rounded-lg border px-3 py-2 pr-14 text-sm ${error ? "border-red-400" : "border-gray-300"}`}
                value={value ?? ""}
                onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder={placeholder}
            />
            {suffix && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                    {suffix}
                </span>
            )}
        </div>
    </div>
);

const CheckboxField = ({ label, checked, onChange }: any) => (
    <label className="inline-flex items-center gap-2 text-sm text-gray-900 cursor-pointer">
        <input type="checkbox" checked={!!checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4" />
        <span>{label}</span>
    </label>
);

const SelectField = ({ label, value, onChange, options = [], error }: any) => (
    <div>
        {label && <label className="block text-xs text-gray-600 mb-1">{label}</label>}
        <select
            className={`w-full rounded-lg border px-3 py-2 text-sm ${error ? "border-red-400" : "border-gray-300"}`}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="">-- Chọn --</option>
            {options.map((opt: any) => (
                <option key={String(opt.value)} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    </div>
);

const TextareaField = ({ label, value, onChange, rows = 3, placeholder, error }: any) => (
    <div>
        {label && <label className="block text-xs text-gray-600 mb-1">{label}</label>}
        <textarea
            className={`w-full rounded-lg border p-2 text-sm ${error ? "border-red-400" : "border-gray-300"}`}
            rows={rows}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
        />
    </div>
);

const DateField = ({ label, value, onChange, error }: any) => (
    <div>
        {label && <label className="block text-xs text-gray-600 mb-1">{label}</label>}
        <input
            type="date"
            className={`w-full rounded-lg border px-3 py-2 text-sm ${error ? "border-red-400" : "border-gray-300"}`}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

const RadioField = ({ label, value, onChange, options = [] }: any) => {
    const cols = options.length;
    const gridStyle = { gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` } as any;
    return (
        <div>
            {label && <label className="block text-xs text-gray-600 mb-1">{label}</label>}
            <div className="grid gap-2" style={gridStyle}>
                {options.map((opt: any) => (
                    <label
                        key={String(opt.value)}
                        className="flex items-center gap-2 text-sm text-gray-900 cursor-pointer"
                    >
                        <input
                            type="radio"
                            className="h-4 w-4"
                            value={opt.value}
                            checked={value === opt.value}
                            onChange={() => onChange(opt.value)}
                        />
                        <span>{opt.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

const DateTimeField = ({ label, value, onChange, error }: any) => (
    <div>
        {label && <label className="block text-xs text-gray-600 mb-1">{label}</label>}
        <input
            type="datetime-local"
            className={`w-full rounded-lg border px-3 py-2 text-sm ${error ? "border-red-400" : "border-gray-300"}`}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

const ImagesField = ({ label, value = [], onChange, slots = 6 }: any) => {
    const pickImage = (idx: number) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = () => {
            const file = input.files?.[0];
            if (!file) return;
            const next = [...value];
            next[idx] = file;
            onChange(next);
        };
        input.click();
    };
    return (
        <div>
            {label && <label className="block text-xs text-gray-600 mb-1">{label}</label>}
            <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
                {Array.from({ length: slots }).map((_, i) => {
                    const item = value?.[i];
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
        </div>
    );
};

const FIELD_MAP: any = {
    text: TextField,
    number: NumberField,
    select: SelectField,
    textarea: TextareaField,
    checkbox: CheckboxField,
    date: DateField,
    images: ImagesField,
    radio: RadioField,
    datetime: DateTimeField,
};

// ===== Small UI helpers =====
const Chevron = ({ open }: any) => (
    <svg width="16" height="16" viewBox="0 0 24 24" className={`transition-transform ${open ? "rotate-180" : ""}`}>
        <path d="M6 9l6 6 6-6" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

function Accordion({
    refEl,
    title,
    open,
    onToggle,
    children,
    flash,
    flashColor = "rgb(0,140,255)",
}: any) {
    return (
        <section
            ref={refEl}
            className={`mb-3 rounded-xl border bg-white transition-colors duration-300 ${flash ? "" : "border-gray-200"}`}
            style={flash ? { borderColor: flashColor } : undefined}
        >
            <button
                aria-expanded={open}
                onClick={onToggle}
                className="flex w-full items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 font-semibold text-gray-900 transition hover:bg-gray-100"
            >
                <Chevron open={open} />
                <span>{title}</span>
            </button>
            <div className={`overflow-hidden px-3 transition-[max-height,padding] duration-200 ${open ? "max-h-[1600px] py-3" : "max-h-0 py-0"}`}>
                {children}
            </div>
        </section>
    );
}

// ===== The universal, sectioned form renderer (drop-in replacement for FormRenderer) =====
export default function FormRendererPro({
    schema,
    initialData = {},
    mode = "create",
    onSubmit,
    submitLabel = "Lưu",
    onClose,
}: any) {
    const sections = useMemo(() => {
        if (schema?.sections && Array.isArray(schema.sections)) return schema.sections;
        // Backward-compat: wrap flat fields into a single section
        if (schema?.fields) {
            return [
                { key: "info", title: schema?.title ?? "Thông tin", cols: schema?.cols ?? 4, fields: schema.fields, defaultOpen: true },
            ];
        }
        return [];
    }, [schema]);

    // Build refs per section
    const sectionRefs = useMemo(() => {
        const obj: Record<string, any> = {};
        sections.forEach((s: any) => (obj[s.key] = React.createRef()));
        return obj;
    }, [sections]);

    // open state per section
    const [open, setOpen] = useState<any>({});
    useEffect(() => {
        const defaults: any = {};
        sections.forEach((s: any) => (defaults[s.key] = s.defaultOpen !== false));
        setOpen(defaults);
    }, [sections]);

    // flash state per section
    const [flash, setFlash] = useState<any>({});
    const flashTimers = useRef<Record<string, any>>({});
    useEffect(() => () => Object.values(flashTimers.current).forEach((t) => clearTimeout(t)), []);

    const [activeNav, setActiveNav] = useState<any>(sections?.[0]?.key ?? "info");

    const defaults = useMemo(() => ({ ...(schema?.defaults ?? {}) }), [schema]);
    const [values, setValues] = useState<any>({ ...defaults, ...initialData });
    const [errors, setErrors] = useState<any>({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        setValues({ ...defaults, ...initialData });
        setErrors({});
    }, [initialData, defaults]);

    const setValue = (name: string, v: any) => setValues((s: any) => ({ ...s, [name]: v }));

    const runValidate = async (v: any) => {
        if (schema?.validate) return await schema.validate(v);
    };

    const defaultSerialize = (v: any) => v;
    const serialize = schema?.serialize ?? defaultSerialize;

    const defaultDbSubmit = async (payload: any) => {
        if (!schema?.table) throw new Error(`Schema "${schema?.key ?? "unknown"}" chưa khai báo table hoặc submit handler.`);
        if (mode === "edit" && initialData?.id) {
            const { data, error } = await supabase.from(schema.table).update(payload).eq("id", initialData.id).select().single();
            if (error) throw error;
            return { action: "update", record: data };
        } else {
            const { data, error } = await supabase.from(schema.table).insert(payload).select().single();
            if (error) throw error;
            return { action: "insert", record: data };
        }
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        setErrors({});
        try {
            await runValidate(values);
            const payload = await serialize(values, { mode, initialData });
            const result = (schema?.submit && (await schema.submit(payload, { mode, initialData }))) || (await defaultDbSubmit(payload));
            if (schema?.afterSubmit) await schema.afterSubmit(result, { mode, initialData });
            onSubmit?.(result);
        } catch (err: any) {
            if (err && typeof err === "object" && !("message" in err)) setErrors(err);
            else setErrors({ _error: err?.message ?? "Có lỗi xảy ra khi lưu." });
        } finally {
            setSubmitting(false);
        }
    };

    const go = (key: string) => {
        setActiveNav(key);
        setOpen((s: any) => ({ ...s, [key]: true }));
        const el = sectionRefs[key]?.current;
        requestAnimationFrame(() => el?.scrollIntoView({ behavior: "smooth", block: "start" }));
        if (flashTimers.current[key]) clearTimeout(flashTimers.current[key]);
        setFlash((s: any) => ({ ...s, [key]: true }));
        flashTimers.current[key] = setTimeout(() => setFlash((s: any) => ({ ...s, [key]: false })), 500);
    };

    const renderField = (f: any) => {
        if (!f) return null;
        const Comp = FIELD_MAP[f.type];
        if (!Comp) return null;

        // visibleWhen support
        if (typeof f.visibleWhen === "function" && !f.visibleWhen(values)) return null;

        // dynamic options support (function)
        const [opts, setOpts] = useState<any>(Array.isArray(f.options) ? f.options : []);
        useEffect(() => {
            let active = true;
            const load = async () => {
                if (typeof f.options === "function") {
                    try {
                        const res = await f.options(values);
                        if (active) setOpts(res ?? []);
                    } catch (e) {
                        console.error(`[options:${f.name}]`, e);
                    }
                }
            };
            load();
            return () => {
                active = false;
            };
            // re-run if dependencies defined
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [JSON.stringify(f.dependsOn ? f.dependsOn.map((k: string) => values[k]) : [])]);

        const common = {
            label: f.label,
            value: values[f.name],
            onChange: (v: any) => {
                setValue(f.name, v);
                f.onChange?.(v, values, setValue);
            },
            placeholder: f.placeholder,
            options: opts,
            rows: f.rows,
            suffix: f.suffix,
            checked: !!values[f.name],
            error: errors[f.name],
        };

        // Layout: support colSpan like old renderer
        const colSpanClass = f.colSpan ? `md:col-span-${f.colSpan}` : "";

        return (
            <div key={f.name} className={colSpanClass}>
                <Comp {...common} />
                {errors[f.name] && <div className="mt-1 text-xs text-red-600">{errors[f.name]}</div>}
            </div>
        );
    };

    const handleReset = () => setValues({ ...defaults });

    return (
        <div className="flex h-full min-h-0 flex-col">
            {/* Top alert */}
            {errors?._error && (
                <div className="mb-2 rounded-lg border border-red-200 bg-red-50 p-3 text-red-700">{errors._error}</div>
            )}

            <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[240px_1fr]">
                {/* Sidebar */}
                <aside className="hidden min-h-0 overflow-auto border-r bg-gray-50 p-2 md:block">
                    {sections.map((s: any) => (
                        <button
                            key={s.key}
                            onClick={() => go(s.key)}
                            className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-gray-100 ${activeNav === s.key ? "bg-indigo-50 font-semibold text-indigo-600" : ""
                                }`}
                        >
                            {s.title}
                        </button>
                    ))}
                </aside>

                {/* Content */}
                <main className="min-h-0 overflow-auto bg-white p-3">
                    {sections.map((s: any) => {
                        const cols = s.cols ?? 3;
                        const gridStyle = { gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` } as any;
                        return (
                            <Accordion
                                key={s.key}
                                refEl={sectionRefs[s.key]}
                                title={s.title}
                                open={!!open[s.key]}
                                onToggle={() => setOpen((prev: any) => ({ ...prev, [s.key]: !prev[s.key] }))}
                                flash={!!flash[s.key]}
                                flashColor={schema?.theme?.flashColor}
                            >
                                <div className="grid grid-cols-1 gap-3" style={gridStyle}>
                                    {s.fields?.map((f: any) => renderField(f))}
                                </div>
                            </Accordion>
                        );
                    })}
                </main>
            </div>

            {/* Footer */}
            <div className="grid grid-cols-[1fr_auto] gap-3 p-2 border-t">
                <div />
                <div className="inline-flex gap-2">
                    {onClose && (
                        <button className="h-9 rounded-lg border border-gray-300 bg-white px-4 text-sm transition hover:bg-gray-100" onClick={onClose}>
                            Đóng
                        </button>
                    )}
                    <button className="h-9 rounded-lg border border-gray-300 bg-white px-4 text-sm transition hover:bg-gray-100" onClick={handleReset}>
                        Nhập lại
                    </button>
                    <button
                        className={`h-9 rounded-lg px-4 text-sm text-white ${submitting ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-800"}`}
                        disabled={submitting}
                        onClick={handleSubmit}
                    >
                        {submitting ? "Đang lưu..." : submitLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}


// =====================================================================
// components/Modal/schemas.sectioned.ts (EXAMPLES)
// =====================================================================

export const productServiceSchema: any = {
    key: "ProductService",
    table: "items", // đổi theo tên bảng của bạn
    title: "Sản phẩm & Dịch vụ",
    theme: { flashColor: "rgb(0,140,255)" },
    defaults: {
        isService: false,
        isQuickSell: false,
        trackStock: false,
        basePriceExcludesVAT: false,
        isActive: true,
        lockSalePrice: false,
        vatApplied: true,
        images: [],
        promoStart: null,
        promoEnd: null,
    },
    validate: (v: any) => {
        const err: any = {};
        if (!v.name || !v.name.trim()) err.name = "Vui lòng nhập tên SP, DV";
        if (!v.unit) err.unit = "Vui lòng chọn đơn vị tính";
        if (Object.keys(err).length) throw err;
        if (v.promoStart && v.promoEnd && new Date(v.promoEnd) < new Date(v.promoStart)) {
            err.promoEnd = "Thời điểm kết thúc khuyến mãi phải sau ngày bắt đầu";
        }
    },
    serialize: (v: any) => ({
        code: v.code?.trim() || null,
        name: v.name?.trim(),
        unit_id: v.unit || null,
        barcode: v.barcode?.trim() || null,
        group_id: v.group || null,
        material_type: v.materialType || null,
        base_price: v.basePrice === "" ? null : Number(v.basePrice),
        cost_price: v.costPrice === "" ? null : Number(v.costPrice),
        tax_rate: v.taxRate === "" ? null : Number(v.taxRate),
        origin: v.origin || null,
        brand: v.brand || null,

        is_service: !!v.isService,
        is_quick_sell: !!v.isQuickSell,
        track_stock: !!v.trackStock,
        base_price_excludes_vat: !!v.basePriceExcludesVAT,
        is_active: !!v.isActive,
        lock_sale_price: !!v.lockSalePrice,

        sku: v.sku || null,
        location: v.location || null,
        shelf: v.shelf || null,
        min_qty: v.minQty === "" ? null : Number(v.minQty),
        max_qty: v.maxQty === "" ? null : Number(v.maxQty),
        low_stock_alert: !!v.lowStockAlert,

        retail_price: v.retailPrice === "" ? null : Number(v.retailPrice),
        wholesale_price: v.wholesalePrice === "" ? null : Number(v.wholesalePrice),
        discount_percent: v.discountPercent === "" ? null : Number(v.discountPercent),
        vat_applied: !!v.vatApplied,
        promo_start: v.promoStart || null,
        promo_end: v.promoEnd || null,

        color: v.color || null,
        size: v.size || null,
        capacity: v.capacity || null,

        description: v.description || null,
        internal_note: v.internalNote || null,

        // images: xử lý upload riêng nếu cần
    }),
    sections: [
        {
            key: "type",
            title: "Tính chất",
            cols: 1,
            fields: [
                {
                    name: "loai_hang",
                    label: "Loại hàng",
                    type: "radio",
                    options: [
                        { label: "Dịch vụ", value: "service" },
                        { label: "Phụ tùng", value: "parts" },
                        { label: "Vật tư", value: "materials" },
                        { label: "Văn phòng phẩm", value: "office" },
                    ],
                },
            ],
        },
        {
            key: "info",
            title: "Thông tin chính",
            cols: 3,
            fields: [
                { type: "text", name: "code", label: "Mã SP, DV", placeholder: "Nhập hoặc tạo tự động" },
                { type: "text", name: "name", label: <>Tên SP, DV <span className='text-red-500'>*</span></> },
                {
                    type: "select",
                    name: "unit",
                    label: <>Đơn vị tính <span className='text-red-500'>*</span></>,
                    // lấy từ bảng units
                    options: async () => {
                        const { data, error } = await supabase.from("units").select("id,name").order("name");
                        if (error) throw error;
                        return (data || []).map((r: any) => ({ label: r.name, value: r.id }));
                    },
                },
                { type: "text", name: "barcode", label: "Mã vạch", placeholder: "Nhập mã vạch (nếu có)" },
                {
                    type: "select",
                    name: "group",
                    label: "Nhóm SP, DV",
                    options: async () => {
                        const { data, error } = await supabase.from("item_groups").select("id,name").order("name");
                        if (error) throw error;
                        return (data || []).map((r: any) => ({ label: r.name, value: r.id }));
                    },
                },
                {
                    type: "select",
                    name: "materialType",
                    label: "Loại vật tư",
                    options: [
                        { label: "Nguyên vật liệu", value: "nguyen_vat_lieu" },
                        { label: "Phụ tùng", value: "phu_tung" },
                        { label: "Công cụ dụng cụ", value: "cong_cu_dung_cu" },
                        { label: "Hàng hóa", value: "hang_hoa" },
                    ],
                },
                { type: "number", name: "basePrice", label: "Giá bán gốc", placeholder: "0", suffix: "VND" },
                { type: "number", name: "costPrice", label: "Giá vốn", placeholder: "0", suffix: "VND" },
                {
                    type: "select",
                    name: "taxRate",
                    label: "Thuế suất",
                    options: [
                        { label: "0%", value: 0 },
                        { label: "5%", value: 5 },
                        { label: "8%", value: 8 },
                        { label: "10%", value: 10 },
                    ],
                },
                { type: "text", name: "origin", label: "Xuất xứ" },
                { type: "text", name: "brand", label: "Thương hiệu" },
                { type: "date", name: "promoStart", label: "Ngày bắt đầu khuyến mãi" },
                { type: "datetime", name: "promoEnd", label: "Thời điểm kết thúc khuyến mãi" },
            ],
        },
        {
            key: "settings",
            title: "Thiết lập",
            cols: 3,
            fields: [
                { type: "checkbox", name: "isService", label: "Là dịch vụ" },
                { type: "checkbox", name: "isQuickSell", label: "Sản phẩm bán nhanh" },
                { type: "checkbox", name: "trackStock", label: "Theo dõi tồn kho" },
                { type: "checkbox", name: "basePriceExcludesVAT", label: "Giá gốc chưa bao gồm VAT" },
                { type: "checkbox", name: "isActive", label: "Còn hoạt động" },
                { type: "checkbox", name: "lockSalePrice", label: "Không sửa giá bán" },
            ],
        },
        {
            key: "images",
            title: "Hình ảnh",
            cols: 6,
            fields: [{ type: "images", name: "images", label: "Hình ảnh (tối đa 6)", slots: 6, colSpan: 6 }],
        }
    ],
};

export const DVTSchemaV2: any = {
    key: "DVT",
    ...({} as any),
    table: "units",
    defaults: {},
    sections: [
        {
            key: "info",
            title: "Thông tin chính",
            cols: 1,
            fields: [
                { type: "text", name: "name", label: "Tên đơn vị tính", placeholder: "VD: Kg" },
            ],
        },
    ],
    validate: (v: any) => {
        const err: any = {};
        if (!v.name || !v.name.trim()) err.name = "Vui lòng nhập tên đơn vị";
        if (Object.keys(err).length) throw err;
    },
    serialize: (v: any) => ({ name: v.name?.trim() }),
};

export const ItemGroupSchemaV2: any = {
    key: "SPDV_GROUP",
    table: "item_groups",
    defaults: {},
    sections: [
        {
            key: "info",
            title: "Nhóm SP & DV",
            cols: 1,
            fields: [
                { type: "text", name: "name", label: "Tên nhóm", placeholder: "Nhập tên nhóm sản phẩm, dịch vụ" },
            ],
        },
    ],
    validate: (v: any) => {
        const err: any = {};
        if (!v.name || !v.name.trim()) err.name = "Vui lòng nhập nhóm SP & DV";
        if (Object.keys(err).length) throw err;
    },
    serialize: (v: any) => ({ name: v.name?.trim() }),
};