export const TextField = ({ label, value, onChange, placeholder, ...rest }: any) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type="text"
      className="w-full border rounded-lg px-3 py-2"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      {...rest}
    />
  </div>
);

export const NumberField = ({ label, value, onChange, ...rest }: any) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type="number"
      className="w-full border rounded-lg px-3 py-2"
      value={value ?? 0}
      onChange={(e) => onChange(Number(e.target.value))}
      {...rest}
    />
  </div>
);

export const SelectField = ({ label, value, onChange, options = [], ...rest }: any) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select
      className="w-full border rounded-lg px-3 py-2"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    >
      <option value="">-- Chọn --</option>
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export const TextareaField = ({ label, value, onChange, rows = 3, ...rest }: any) => (
  <div className="col-span-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <textarea
      className="w-full border rounded-lg px-3 py-2"
      rows={rows}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  </div>
);
