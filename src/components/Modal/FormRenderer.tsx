// components/Modal/FormRenderer.tsx
import React, { useMemo, useState } from "react";
import { TextField, NumberField, SelectField, TextareaField } from "./Fields";
import { supabase } from "../../lib/supabase"; // đường dẫn từ components/Modal

const FIELD_MAP: any = {
  text: TextField,
  number: NumberField,
  select: SelectField,
  textarea: TextareaField,
};

type FormRendererProps = {
  schema: any;
  initialData?: any;
  mode?: "create" | "edit";
  onSubmit?: (result: any) => void; // optional: cha vẫn có thể bắt kết quả để đóng modal / reload
  submitLabel?: string;
};

const FormRenderer: React.FC<FormRendererProps> = ({
  schema,
  initialData = {},
  mode = "create",
  onSubmit,
  submitLabel = "Lưu",
}) => {
  const [values, setValues] = useState<any>({ ...(schema?.defaults ?? {}), ...initialData });
  const [errors, setErrors] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);
  const cols = schema?.cols ?? 4;

  const gridStyle = useMemo(
    () => ({ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }),
    [cols]
  );

  const setValue = (name: string, v: any) => setValues((s: any) => ({ ...s, [name]: v }));

  const runValidate = async (v: any) => {
    // Nếu schema có validate (zod/yup/custom) thì dùng, throw nếu lỗi
    if (schema?.validate) {
      const r = await schema.validate(v);
      return r;
    }
  };

  const defaultSerialize = (v: any) => v;
  const serialize = schema?.serialize ?? defaultSerialize;

  const defaultDbSubmit = async (payload: any) => {
    if (!schema?.table) {
      throw new Error(`Schema "${schema?.key ?? "unknown"}" chưa khai báo table hoặc submit handler.`);
    }
    if (mode === "edit" && initialData?.id) {
      const { data, error } = await supabase
        .from(schema.table)
        .update(payload)
        .eq("id", initialData.id)
        .select()
        .single();
      if (error) throw error;
      return { action: "update", record: data };
    } else {
      const { data, error } = await supabase.from(schema.table).insert(payload).select().single();
      if (error) throw error;
      return { action: "insert", record: data };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    try {
      // 1) Validate
      await runValidate(values);

      // 2) Serialize/transform
      const payload = await serialize(values, { mode, initialData });

      // 3) Submit: ưu tiên schema.submit, rồi fallback theo schema.table
      const result =
        (schema?.submit && (await schema.submit(payload, { mode, initialData }))) ||
        (await defaultDbSubmit(payload));

      // 4) AfterSubmit hook (nếu muốn bắn toast/ghi log)
      if (schema?.afterSubmit) await schema.afterSubmit(result, { mode, initialData });

      // 5) Cho component cha biết (để đóng modal / reload)
      onSubmit?.(result);
    } catch (err: any) {
      // Có thể là object {field: message} hoặc Error
      if (err && typeof err === "object" && !("message" in err)) {
        setErrors(err);
      } else {
        setErrors({ _error: err?.message ?? "Có lỗi xảy ra khi lưu." });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4" style={gridStyle}>
      {/* Thông báo lỗi tổng */}
      {errors?._error && (
        <div className={`col-span-${cols} text-red-600 bg-red-50 border border-red-200 p-3 rounded`}>
          {errors._error}
        </div>
      )}

      {schema.fields.map((f: any) => {
        const Comp = FIELD_MAP[f.type];
        if (!Comp) return null;

        // Ẩn/hiện theo điều kiện
        if (typeof f.visibleWhen === "function" && !f.visibleWhen(values)) return null;

        const errorMsg = errors[f.name];

        return (
          <div key={f.name} className={f.colSpan ? `col-span-${f.colSpan}` : ""}>
            <Comp
              label={f.label}
              value={values[f.name]}
              onChange={(v: any) => {
                setValue(f.name, v);
                f.onChange?.(v, values, setValue); // cho phép field tác động lên field khác
              }}
              placeholder={f.placeholder}
              options={typeof f.options === "function" ? f.options(values) : f.options}
              error={errorMsg}
            />
            {errorMsg && <div className="mt-1 text-xs text-red-600">{errorMsg}</div>}
          </div>
        );
      })}

      <div className={`col-span-${cols} flex justify-end mt-4`}>
        <button
          type="submit"
          disabled={submitting}
          className={`px-4 py-2 rounded-lg text-white ${submitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {submitting ? "Đang lưu..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default FormRenderer;
