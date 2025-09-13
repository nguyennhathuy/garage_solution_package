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
                className={`w-full rounded-lg border px-3 py-2 ${suffix ? "pr-14" : ""} text-sm ${error ? "border-red-400" : "border-gray-300"}`}
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

// ===== Inline Table/Grid field (có ô computed & canh phải) =====
const TableField = ({
    label,
    value = [],
    onChange,
    columns = [],
    addRowLabel = "Thêm dòng",
    defaultRow,
    formValues, // toàn bộ form values - nếu options là function
    error,
    footer, // optional: { showSumFor: 'tien_nhap' }
}: any) => {
    const rows = Array.isArray(value) ? value : [];

    const fmt = (n: any) => {
        if (n === "" || n === null || n === undefined || Number.isNaN(n)) return "";
        const x = typeof n === "number" ? n : Number(n);
        if (Number.isNaN(x)) return "";
        return new Intl.NumberFormat("vi-VN").format(x);
    };

    const makeNewRow = () => {
        if (typeof defaultRow === "function") return defaultRow(formValues);
        const r: any = {};
        (columns || []).forEach((c: any) => {
            if (c.type === "number") r[c.key] = c.default ?? 0;
            else r[c.key] = c.default ?? "";
        });
        return r;
    };

    const updateCell = (ri: number, key: string, v: any) => {
        const next = [...rows];
        next[ri] = { ...(next[ri] || {}), [key]: v };
        onChange(next);
    };

    const removeRow = (ri: number) => {
        const next = [...rows];
        next.splice(ri, 1);
        onChange(next);
    };

    const addRow = () => onChange([...(rows || []), makeNewRow()]);

    const getOptions = (col: any, row: any, idx: number) => {
        if (typeof col?.options === "function") {
            try {
                return col.options({ formValues, row, rowIndex: idx }) ?? [];
            } catch {
                return [];
            }
        }
        return col?.options ?? [];
    };

    const computeVal = (col: any, row: any) => {
        if (typeof col?.compute === "function") {
            try {
                return col.compute({ row, formValues });
            } catch {
                return "";
            }
        }
        return "";
    };

    const alignClass = (a?: "left" | "center" | "right") =>
        a === "right" ? "text-right" : a === "center" ? "text-center" : "text-left";

    const Cell = ({ col, row, ri }: any) => {
        const val = row?.[col.key];
        const base =
            "w-full rounded-lg border px-2 py-1 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500";

        if (col.type === "computed") {
            const v = computeVal(col, row);
            return <div className={`${alignClass(col.align)} text-gray-900`}>{fmt(v)}</div>;
        }

        if (col.type === "select") {
            const opts = getOptions(col, row, ri);
            return (
                <select
                    className={`${base} ${alignClass(col.align)}`}
                    value={val ?? ""}
                    onChange={(e) => updateCell(ri, col.key, e.target.value)}
                >
                    <option value="">{col.placeholder ?? "-- Chọn --"}</option>
                    {opts.map((o: any) => (
                        <option key={String(o.value)} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>
            );
        }

        if (col.type === "number") {
            return (
                <input
                    type="number"
                    inputMode="decimal"
                    className={`${base} ${alignClass(col.align)}`}
                    value={val ?? ""}
                    onChange={(e) => updateCell(ri, col.key, e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder={col.placeholder}
                />
            );
        }

        // default: text
        return (
            <input
                type="text"
                className={`${base} ${alignClass(col.align)}`}
                value={val ?? ""}
                onChange={(e) => updateCell(ri, col.key, e.target.value)}
                placeholder={col.placeholder}
            />
        );
    };

    const sumForKey = (key?: string) => {
        if (!key) return 0;
        return rows.reduce((acc: number, r: any) => {
            const col = (columns || []).find((c: any) => c.key === key);
            const v = col?.type === "computed" ? computeVal(col, r) : r?.[key];
            const num = typeof v === "number" ? v : Number(v || 0);
            return acc + (Number.isNaN(num) ? 0 : num);
        }, 0);
    };

    return (
        <div>
            {label && <label className="block text-xs text-gray-600 mb-1">{label}</label>}

            <div className="rounded-xl border border-gray-200 overflow-hidden">
                <div className="flex items-center justify-between bg-slate-50 px-3 py-2">
                    <div className="text-sm font-semibold text-gray-900">{label}</div>
                    <button
                        type="button"
                        onClick={addRow}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-100"
                    >
                        {addRowLabel}
                    </button>
                </div>

                <div className="w-full overflow-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                {(columns || []).map((c: any) => (
                                    <th
                                        key={c.key}
                                        style={c.width ? { width: c.width } : undefined}
                                        className={`px-3 py-2 ${alignClass(c.align)} font-medium text-gray-700 border-b`}
                                    >
                                        {c.label}
                                    </th>
                                ))}
                                <th className="px-3 py-2 text-right font-medium text-gray-700 border-b w-12"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.length === 0 ? (
                                <tr>
                                    <td colSpan={(columns || []).length + 1} className="px-3 py-3 text-center text-gray-500">
                                        Chưa có dữ liệu. Bấm “{addRowLabel}”.
                                    </td>
                                </tr>
                            ) : (
                                rows.map((row: any, ri: number) => (
                                    <tr key={ri} className="odd:bg-white even:bg-gray-50">
                                        {(columns || []).map((c: any) => (
                                            <td key={c.key} className={`px-3 py-2 align-middle border-b ${alignClass(c.align)}`}>
                                                <Cell col={c} row={row} ri={ri} />
                                            </td>
                                        ))}
                                        <td className="px-3 py-2 border-b text-right">
                                            <button
                                                type="button"
                                                onClick={() => removeRow(ri)}
                                                className="rounded-md border border-gray-300 bg-white px-2 py-1 hover:bg-gray-100"
                                                title="Xóa dòng"
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                        {footer?.showSumFor && (
                            <tfoot>
                                <tr className="bg-gray-50">
                                    {(columns || []).map((c: any) => {
                                        if (c.key === footer.showSumFor) {
                                            return (
                                                <td key={c.key} className={`px-3 py-2 font-semibold ${alignClass("right")} border-t`}>
                                                    {fmt(sumForKey(c.key))}
                                                </td>
                                            );
                                        }
                                        return <td key={c.key} className="px-3 py-2 border-t" />;
                                    })}
                                    <td className="px-3 py-2 border-t" />
                                </tr>
                            </tfoot>
                        )}
                    </table>
                </div>
            </div>

            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
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
    table: TableField,
};

const resolve = (fnOrVal: any, values: any) =>
    typeof fnOrVal === "function" ? fnOrVal(values) : fnOrVal;
// Responsible for rendering a single field configuration
const FieldRenderer = ({ field, values, setValue, errors }: any) => {
    const Comp = FIELD_MAP[field?.type];
    const [opts, setOpts] = useState<any>(Array.isArray(field?.options) ? field.options : []);

    // khóa phụ thuộc options
    const depKey = JSON.stringify((field?.dependsOn || []).map((k: string) => values[k]));
    useEffect(() => {
        let active = true;
        (async () => {
            if (typeof field?.options === "function") {
                try {
                    const res = await field.options(values);
                    if (active) setOpts(res ?? []);
                } catch (e) {
                    console.error(`[options:${field?.name}]`, e);
                }
            }
        })();
        return () => { active = false; };
    }, [depKey]); // ✅ gọn

    if (!field || !Comp) return null;
    if (typeof field.visibleWhen === "function" && !field.visibleWhen(values)) return null;

    const common = {
        label: resolve(field.label, values),
        value: values[field.name],
        onChange: (v: any) => {
            setValue(field.name, v);
            field.onChange?.(v, values, setValue);
        },
        placeholder: resolve(field.placeholder, values),
        options: opts,
        rows: field.rows,
        suffix: resolve(field.suffix, values),
        checked: !!values[field.name],
        error: errors[field.name],
    };
    const extraProps: any = {};
    if (field.type === "table") {
        extraProps.columns = resolve(field.columns, values);
        extraProps.addRowLabel = field.addRowLabel;
        extraProps.defaultRow = field.defaultRow;
        extraProps.formValues = values;
        extraProps.footer = field.footer; // nếu muốn hiển thị tổng
    }
    const colSpan = resolve(field.colSpan, values);
    const colSpanClass = colSpan ? `md:col-span-${colSpan}` : "";

    return (
        <div className={colSpanClass}>
            <Comp {...common} {...extraProps} />
            {errors[field.name] && (
                <div className="mt-1 text-xs text-red-600">{errors[field.name]}</div>
            )}
        </div>
    );
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
    const isSectionVisible = (s: any) =>
        typeof s?.visibleWhen === "function" ? !!s.visibleWhen(values) : true;
    // ⬇ THÊM: đổi tab đang active nếu nó bị ẩn đi do điều kiện
    useEffect(() => {
        const visible = sections.filter(isSectionVisible);
        if (visible.length && !visible.some((s: any) => s.key === activeNav)) {
            setActiveNav(visible[0].key);
        }
        // optional: đảm bảo state "open" có key cho section mới xuất hiện
        setOpen((prev: any) => {
            const next = { ...prev };
            visible.forEach((s: any) => {
                if (typeof next[s.key] === "undefined") next[s.key] = s.defaultOpen !== false;
            });
            return next;
        });
    }, [values, sections]); // ⬅ PHẢI có values để chạy lại khi chọn tính chất/mục đích


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
                    {sections.filter(isSectionVisible).map((s: any) => (
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
                    {sections.filter(isSectionVisible).map((s: any) => {
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
                                    {s.fields?.map((f: any) => (
                                        <FieldRenderer
                                            key={f.name}
                                            field={f}
                                            values={values}
                                            setValue={setValue}
                                            errors={errors}
                                        />
                                    ))}
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
        loai_hang: "",
        muc_dich: "",
        code: "",
        name: "",
        dvt: "",
        gia_ban: "",
        gia_von: "",
        thoi_gian_chuan: "",
        group_service: "",
        nhom_dich_vu: "",
        nhom_vat_tu: "",
        nhom_phu_tung: "",
        loai_vat_tu: "",
        loai_phu_tung: "",
        ton_kho_toi_thieu: "",
        isQuickSell: false,
        lockSalePrice: false,
        isActive: true,
        images: [],
        dinh_muc_vat_tu: [],
        dinh_muc_cong: [],
    },
    validate: (v: any) => {
        const err: any = {};
        if (!v.name || !v.name.trim()) err.name = "Vui lòng nhập tên SP, DV";
        if (!v.dvt) err.dvt = "Vui lòng chọn đơn vị tính";
        if (Object.keys(err).length) throw err;
    },
    serialize: (v: any) => ({
        loai_hang: v.loai_hang || null,
        muc_dich: v.muc_dich || null,
        code: v.code?.trim() || null,
        name: v.name?.trim(),
        dvt: v.dvt || null,
        gia_ban: v.gia_ban === "" ? null : Number(v.gia_ban),
        gia_von: v.gia_von === "" ? null : Number(v.gia_von),
        thoi_gian_chuan: v.thoi_gian_chuan || null,
        group_service: v.group_service || null,
        nhom_dich_vu: v.nhom_dich_vu || null,
        nhom_vat_tu: v.nhom_vat_tu || null,
        nhom_phu_tung: v.nhom_phu_tung || null,
        loai_vat_tu: v.loai_vat_tu || null,
        loai_phu_tung: v.loai_phu_tung || null,
        ton_kho_toi_thieu:
            v.ton_kho_toi_thieu === "" || v.ton_kho_toi_thieu === undefined
                ? null
                : Number(v.ton_kho_toi_thieu),
        is_quick_sell: !!v.isQuickSell,
        lock_sale_price: !!v.lockSalePrice,
        is_active: !!v.isActive,
        dinh_muc_vat_tu: Array.isArray(v.dinh_muc_vat_tu) ? v.dinh_muc_vat_tu : [],
        dinh_muc_cong: Array.isArray(v.dinh_muc_cong) ? v.dinh_muc_cong : [],
    }),
    sections: [
        {
            key: "tinh_chat",
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
                    onChange: (_val: any, _values: any, setValue: any) => {
                        const resetToEmpty = [
                            "muc_dich",
                            "code", "name", "dvt",
                            "gia_ban", "gia_von", "thoi_gian_chuan",
                            "group_service",
                            "nhom_dich_vu", "nhom_vat_tu", "nhom_phu_tung",
                            "loai_vat_tu", "loai_phu_tung",
                            "ton_kho_toi_thieu",
                        ];
                        resetToEmpty.forEach((k) => setValue(k, ""));
                        setValue("isQuickSell", false);
                        setValue("lockSalePrice", false);
                        setValue("isActive", true);
                        setValue("images", []);
                    },
                },

            ],

        },
        {
            key: "muc_dich",
            title: "Mục đích sử dụng",
            cols: 1,
            visibleWhen: (v: any) => !!v.loai_hang,
            fields: [
                {
                    name: "muc_dich",
                    label: "Mục đích",
                    type: "radio",
                    options: (values: any) => {
                        const mapping: Record<string, { label: string; value: string }[]> = {
                            service: [
                                { label: "Bán cho khách", value: "ban_cho_khach" },
                                { label: "Mua để bán lại", value: "mua_de_ban_lai" },
                                { label: "Mua dùng nội bộ", value: "mua_dung_noi_bo" },
                            ],
                            parts: [
                                { label: "Hàng để bán", value: "hang_de_ban" },
                                { label: "Hàng ký gửi", value: "hang_ky_gui" },
                            ],
                            materials: [
                                { label: "Bán lẻ", value: "ban_le" },
                                { label: "Tiêu hao (dùng cho dịch vụ)", value: "tieu_hao" },
                                { label: "Cả hai", value: "ca_hai" },
                            ],
                            office: [
                            ],
                        };
                        return mapping[values.loai_hang] || [
                            { label: "Bán cho khách", value: "ban_cho_khach" },
                            { label: "Mua để bán lại", value: "mua_de_ban_lai" },
                            { label: "Mua dùng nội bộ", value: "mua_dung_noi_bo" },
                            { label: "Bán lẻ", value: "ban_le" },
                            { label: "Tiêu hao", value: "tieu_hao" },
                            { label: "Cả hai", value: "ca_hai" },
                            { label: "Hàng để bán", value: "hang_de_ban" },
                            { label: "Hàng ký gửi", value: "hang_ky_gui" },
                        ];
                    },
                    dependsOn: ["loai_hang"],
                },
            ],
        },
        {
            key: "info",
            title: "Thông tin chung",
            cols: 3,
            visibleWhen: (v: any) => !!v.loai_hang && !!v.muc_dich,
            fields: [
                // dịch vụ, vật tư, phụ tùng
                {
                    type: "text",
                    name: "code",
                    label: (v: any) =>
                        v.loai_hang === "materials"
                            ? "Mã vật tư"
                            : v.loai_hang === "parts"
                                ? "Mã phụ tùng"
                                : "Mã dịch vụ",
                    visibleWhen: (v: any) =>
                        (v.loai_hang === "service" &&
                            ["ban_cho_khach", "mua_de_ban_lai", "mua_dung_noi_bo"].includes(v.muc_dich)) ||
                        v.loai_hang === "materials" ||
                        v.loai_hang === "parts",
                },
                {
                    type: "text",
                    name: "name",
                    label: (v: any) => (
                        <>
                            {v.loai_hang === "materials"
                                ? "Tên vật tư"
                                : v.loai_hang === "parts"
                                    ? "Tên phụ tùng"
                                    : "Tên dịch vụ"}{" "}
                            <span className='text-red-500'>*</span>
                        </>
                    ),
                    visibleWhen: (v: any) =>
                        (v.loai_hang === "service" &&
                            ["ban_cho_khach", "mua_de_ban_lai", "mua_dung_noi_bo"].includes(v.muc_dich)) ||
                        v.loai_hang === "materials" ||
                        v.loai_hang === "parts",
                },
                {
                    type: "select",
                    name: "dvt",
                    label: <>
                        Đơn vị tính <span className='text-red-500'>*</span>
                    </>,
                    options: [
                        { label: "Cái", value: "cai" },
                        { label: "Kg", value: "kg" },
                        { label: "Thùng", value: "thung" },
                        { label: "Bao", value: "bao" },
                    ],
                    visibleWhen: (v: any) =>
                        (v.loai_hang === "service" &&
                            ["ban_cho_khach", "mua_de_ban_lai", "mua_dung_noi_bo"].includes(v.muc_dich)) ||
                        v.loai_hang === "materials" ||
                        v.loai_hang === "parts",
                },
                {
                    type: "number",
                    name: "gia_ban",
                    label: "Giá bán (chưa VAT)",
                    placeholder: "0",
                    suffix: "VND",
                    visibleWhen: (v: any) =>
                        (v.loai_hang === "service" && v.muc_dich === "ban_cho_khach") ||
                        v.loai_hang === "parts",
                },
                {
                    type: "number",
                    name: "gia_von",
                    label: "Giá nhập",
                    placeholder: "0",
                    suffix: "VND",
                    visibleWhen: (v: any) =>
                        (v.loai_hang === "service" && v.muc_dich === "ban_cho_khach") ||
                        v.loai_hang === "materials" ||
                        v.loai_hang === "parts",
                },
                {
                    type: "datetime",
                    name: "thoi_gian_chuan",
                    label: "Thời gian chuẩn",
                    visibleWhen: (v: any) => v.loai_hang === "service" && v.muc_dich === "ban_cho_khach",
                },
                {
                    type: "select",
                    name: "nhom_dich_vu",
                    label: "Nhóm dịch vụ",
                    options: [
                        { label: "Dịch vụ", value: "service" },
                        { label: "Sản phẩm bán", value: "product" },
                        { label: "Công cụ dụng cụ", value: "tool" },
                    ],
                    visibleWhen: (v: any) =>
                        v.loai_hang === "service" &&
                        ["ban_cho_khach", "mua_de_ban_lai", "mua_dung_noi_bo"].includes(v.muc_dich),
                },
                {
                    type: "select",
                    name: "nhom_vat_tu",
                    label: "Nhóm vật tư",
                    options: [
                        { label: "Nhóm vật tư test", value: "Nhóm vật tư test" },
                        { label: "Nhóm vật tư test", value: "Nhóm vật tư test" },
                        { label: "Nhóm vật tư test", value: "Nhóm vật tư test" },
                    ],
                    visibleWhen: (v: any) => v.loai_hang === "materials",
                },
                {
                    type: "select",
                    name: "loai_vat_tu",
                    label: "Loại vật tư",
                    options: [
                        { label: "Loại vật tư test", value: "Loại vật tư test" },
                        { label: "Loại vật tư test", value: "Loại vật tư test" },
                        { label: "Loại vật tư test", value: "Loại vật tư test" },
                    ],
                    visibleWhen: (v: any) => v.loai_hang === "materials",
                },
                {
                    type: "select",
                    name: "nhom_phu_tung",
                    label: "Nhóm phụ tùng",
                    options: [
                        { label: "Nhóm phụ tùng test", value: "Nhóm phụ tùng test" },
                        { label: "Nhóm phụ tùng test", value: "Nhóm phụ tùng test" },
                        { label: "Nhóm phụ tùng test", value: "Nhóm phụ tùng test" },
                    ],
                    visibleWhen: (v: any) => v.loai_hang === "parts",
                },
                {
                    type: "select",
                    name: "loai_phu_tung",
                    label: "Loại phụ tùng",
                    options: [
                        { label: "Loại phụ tùng test", value: "Loại phụ tùng test" },
                        { label: "Loại phụ tùng test", value: "Loại phụ tùng test" },
                        { label: "Loại phụ tùng test", value: "Loại phụ tùng test" },
                    ],
                    visibleWhen: (v: any) => v.loai_hang === "parts",
                },
                {
                    type: "number",
                    name: "ton_kho_toi_thieu",
                    label: "Tồn kho tối thiểu",
                    placeholder: "0",
                    suffix: null,
                    visibleWhen: (v: any) => v.loai_hang === "parts",
                },
            ],
        },
        {
            key: "settings",
            title: "Thiết lập",
            cols: 3,
            visibleWhen: (v: any) => !!v.loai_hang && !!v.muc_dich,
            fields: [
                {
                    type: "checkbox",
                    name: "isQuickSell",
                    label: "Bán nhanh",
                    visibleWhen: (vals: any) => vals.loai_hang === "service",
                },
                {
                    type: "checkbox",
                    name: "lockSalePrice",
                    label: "Không sửa giá bán",
                    visibleWhen: (vals: any) => vals.loai_hang === "service",
                },
                { type: "checkbox", name: "isActive", label: "Còn sử dụng" },
                {
                    type: "checkbox",
                    name: "ton_kho_toi_thieu_thiet_lap",
                    label: "Tồn kho tối thiểu",
                    visibleWhen: (vals: any) => vals.loai_hang === "materials",
                },
            ],
        },
        {
            key: "dinh_muc",
            title: "Định mức",
            cols: 1,
            visibleWhen: (v: any) => !!v.loai_hang && !!v.muc_dich,
            fields: [
                // ===== BẢNG 1: Định mức vật tư (giống ảnh) =====
                {
                    type: "table",
                    name: "dinh_muc_vat_tu",
                    label: "Định mức vật tư",
                    addRowLabel: "Thêm dòng",
                    footer: { showSumFor: "tien_nhap" }, // hiện tổng cột Tiền nhập
                    defaultRow: () => ({
                        ma_vt: "",
                        ten_vt: "",
                        dvt: "",
                        gia_nhap: "",
                        sl_nhap: "",
                        tk_vt: "",
                    }),
                    columns: [
                        { key: "ma_vt", label: "Mã vật tư", type: "text", width: 160 },
                        { key: "ten_vt", label: "Tên vật tư", type: "text", width: 260 },
                        {
                            key: "dvt",
                            label: "ĐVT",
                            type: "select",
                            width: 100,
                            options: [
                                { label: "lít", value: "lít" },
                                { label: "kg", value: "kg" },
                                { label: "cái", value: "cái" },
                                { label: "thùng", value: "thùng" },
                            ],
                        },
                        { key: "gia_nhap", label: "Giá nhập", type: "number", width: 140, align: "right", placeholder: "0" },
                        { key: "sl_nhap", label: "SL nhập", type: "number", width: 120, align: "right", placeholder: "0" },
                        {
                            key: "tien_nhap",
                            label: "Tiền nhập",
                            type: "computed",
                            width: 160,
                            align: "right",
                            // Tiền nhập = Giá nhập * SL nhập
                            compute: ({ row }: any) => {
                                const g = Number(row?.gia_nhap || 0);
                                const q = Number(row?.sl_nhap || 0);
                                return g * q;
                            },
                        },
                        { key: "tk_vt", label: "TK vật tư", type: "text", width: 120 },
                    ],
                },

                // ===== BẢNG 2: Định mức vật tư phụ (cùng cấu trúc) =====
                {
                    type: "table",
                    name: "dinh_muc_vat_tu_phu",
                    label: "Định mức vật tư (khác)",
                    addRowLabel: "Thêm dòng",
                    footer: { showSumFor: "tien_nhap" },
                    defaultRow: () => ({
                        ma_vt: "",
                        ten_vt: "",
                        dvt: "",
                        gia_nhap: "",
                        sl_nhap: "",
                        tk_vt: "",
                    }),
                    columns: [
                        { key: "ma_vt", label: "Mã vật tư", type: "text", width: 160 },
                        { key: "ten_vt", label: "Tên vật tư", type: "text", width: 260 },
                        {
                            key: "dvt",
                            label: "ĐVT",
                            type: "select",
                            width: 100,
                            options: [
                                { label: "lít", value: "lít" },
                                { label: "kg", value: "kg" },
                                { label: "cái", value: "cái" },
                                { label: "thùng", value: "thùng" },
                            ],
                        },
                        { key: "gia_nhap", label: "Giá nhập", type: "number", width: 140, align: "right", placeholder: "0" },
                        { key: "sl_nhap", label: "SL nhập", type: "number", width: 120, align: "right", placeholder: "0" },
                        {
                            key: "tien_nhap",
                            label: "Tiền nhập",
                            type: "computed",
                            width: 160,
                            align: "right",
                            compute: ({ row }: any) => {
                                const g = Number(row?.gia_nhap || 0);
                                const q = Number(row?.sl_nhap || 0);
                                return g * q;
                            },
                        },
                        { key: "tk_vt", label: "TK vật tư", type: "text", width: 120 },
                    ],
                },
            ],
        },

        {
            key: "images",
            title: "Hình ảnh",
            cols: 6,
            visibleWhen: (v: any) => !!v.loai_hang && !!v.muc_dich,
            fields: [{ type: "images", name: "images", label: "Hình ảnh (tối đa 6)", slots: 6, colSpan: 6 }],
        },
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