export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "number" | "textarea" | "select";
  options?: { value: string; label: string }[];
}

export interface ModalFormProps<T> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: FieldConfig[];
  initialData?: Partial<T>;
  onSubmit: (data: T) => void;
}