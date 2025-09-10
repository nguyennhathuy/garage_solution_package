// schemas/product.schema.ts
export const tonKhoSchema: any = {
  title: "Sản phẩm",
  cols: 4,
  defaults: { price: 0, qty: 0 },
  fields: [
    { type: "text", name: "name", label: "Tên sản phẩm", colSpan: 2, placeholder: "VD: Chuột không dây" },
    { type: "number", name: "price", label: "Giá" },
    { type: "text", name: "code", label: "Mã sản phẩm" },

    {
      type: "select",
      name: "category",
      label: "Danh mục",
      options: [
        { label: "Điện tử", value: "electronics" },
        { label: "Quần áo", value: "clothes" },
        { label: "Nội thất", value: "furniture" },
      ],
    },

    { type: "number", name: "qty", label: "Số lượng" },
    { type: "text", name: "supplier", label: "Nhà cung cấp", colSpan: 2 },

    {
      type: "textarea",
      name: "description",
      label: "Mô tả",
      colSpan: 4,
    },

    // Ví dụ conditional field: chỉ hiện khi category = 'electronics'
    {
      type: "text",
      name: "warranty",
      label: "Bảo hành (tháng)",
      visibleWhen: (vals: any) => vals.category === "electronics",
    },
  ],
};

// schemas/product.schema.ts
export const nhapKhoSchema: any = {
  title: "Sản phẩm",
  cols: 4,
  defaults: { price: 0, qty: 0 },
  fields: [
    { type: "text", name: "name", label: "Tên sản phẩm", colSpan: 2, placeholder: "VD: Chuột không dây" },
    { type: "number", name: "price", label: "Giá" },
    { type: "text", name: "code", label: "Mã sản phẩm" },

    {
      type: "select",
      name: "category",
      label: "Danh mục",
      options: [
        { label: "Điện tử", value: "electronics" },
        { label: "Quần áo", value: "clothes" },
        { label: "Nội thất", value: "furniture" },
      ],
    },

    { type: "number", name: "qty", label: "Số lượng" },
    { type: "text", name: "supplier", label: "Nhà cung cấp", colSpan: 2 },

    {
      type: "textarea",
      name: "description",
      label: "Mô tả",
      colSpan: 4,
    },

    // Ví dụ conditional field: chỉ hiện khi category = 'electronics'
    {
      type: "text",
      name: "warranty",
      label: "Bảo hành (tháng)",
      visibleWhen: (vals: any) => vals.category === "electronics",
    },
  ],
};

// schemas/product.schema.ts
export const xuatKhoSchema: any = {
  title: "Sản phẩm",
  cols: 4,
  defaults: { price: 0, qty: 0 },
  fields: [
    { type: "text", name: "name", label: "Tên sản phẩm", colSpan: 2, placeholder: "VD: Chuột không dây" },
    { type: "number", name: "price", label: "Giá" },
    { type: "text", name: "code", label: "Mã sản phẩm" },

    {
      type: "select",
      name: "category",
      label: "Danh mục",
      options: [
        { label: "Điện tử", value: "electronics" },
        { label: "Quần áo", value: "clothes" },
        { label: "Nội thất", value: "furniture" },
      ],
    },

    { type: "number", name: "qty", label: "Số lượng" },
    { type: "text", name: "supplier", label: "Nhà cung cấp", colSpan: 2 },

    {
      type: "textarea",
      name: "description",
      label: "Mô tả",
      colSpan: 4,
    },

    // Ví dụ conditional field: chỉ hiện khi category = 'electronics'
    {
      type: "text",
      name: "warranty",
      label: "Bảo hành (tháng)",
      visibleWhen: (vals: any) => vals.category === "electronics",
    },
  ],
};

// schemas/product.schema.ts
export const kiemKeSchema: any = {
  title: "Sản phẩm",
  cols: 4,
  defaults: { price: 0, qty: 0 },
  fields: [
    { type: "text", name: "name", label: "Tên sản phẩm", colSpan: 2, placeholder: "VD: Chuột không dây" },
    { type: "number", name: "price", label: "Giá" },
    { type: "text", name: "code", label: "Mã sản phẩm" },

    {
      type: "select",
      name: "category",
      label: "Danh mục",
      options: [
        { label: "Điện tử", value: "electronics" },
        { label: "Quần áo", value: "clothes" },
        { label: "Nội thất", value: "furniture" },
      ],
    },

    { type: "number", name: "qty", label: "Số lượng" },
    { type: "text", name: "supplier", label: "Nhà cung cấp", colSpan: 2 },

    {
      type: "textarea",
      name: "description",
      label: "Mô tả",
      colSpan: 4,
    },

    // Ví dụ conditional field: chỉ hiện khi category = 'electronics'
    {
      type: "text",
      name: "warranty",
      label: "Bảo hành (tháng)",
      visibleWhen: (vals: any) => vals.category === "electronics",
    },
  ],
};

export const NCCSchema: any = {
  title: "Sản phẩm",
  cols: 4,
  defaults: { price: 0, qty: 0 },
  fields: [
    { type: "text", name: "name", label: "Tên sản phẩm", colSpan: 2, placeholder: "VD: Chuột không dây" },
    { type: "number", name: "price", label: "Giá" },
    { type: "text", name: "code", label: "Mã sản phẩm" },

    {
      type: "select",
      name: "category",
      label: "Danh mục",
      options: [
        { label: "Điện tử", value: "electronics" },
        { label: "Quần áo", value: "clothes" },
        { label: "Nội thất", value: "furniture" },
      ],
    },

    { type: "number", name: "qty", label: "Số lượng" },
    { type: "text", name: "supplier", label: "Nhà cung cấp", colSpan: 2 },

    {
      type: "textarea",
      name: "description",
      label: "Mô tả",
      colSpan: 4,
    },

    // Ví dụ conditional field: chỉ hiện khi category = 'electronics'
    {
      type: "text",
      name: "warranty",
      label: "Bảo hành (tháng)",
      visibleWhen: (vals: any) => vals.category === "electronics",
    },
  ],
};

export const DVTSchema: any = {
    key: "SPDV",
    ...({} as any),
    table: "item_groups",
    defaults: {},
    sections: [
        {
            key: "info",
            title: "Thông tin chính",
            cols: 1,
            fields: [
                { type: "text", name: "name", label: "Tên nhóm", placeholder: "Nhập tên nhóm sản phẩm, dịch vụ" },
            ],
        },
    ],
    validate: (v: any) => {
        const err: any = {};
        if (!v.name || !v.name.trim()) err.name = "Vui lòng nhập tên nhóm";
        if (Object.keys(err).length) throw err;
    },
    serialize: (v: any) => ({ name: v.name?.trim() }),
};

// export const SPDVSchema: any = {
//   title: "Đơn vị tính",
//   cols: 1,
//   table: "item_groups",
//   defaults: {},
//   fields: [
//     {
//       type: "text",
//       name: "name",
//       label: "Tên nhóm",
//       placeholder: "Nhập tên nhóm sản phẩm, dịch vụ"
//     },
//   ],
//   validate: (v: any) => {
//     const err: any = {};
//     if (!v.name || !v.name.trim()) err.name = "Vui lòng nhập nhóm SP & DV";
//     if (Object.keys(err).length) throw err;
//   },
//   serialize: (v: any) => ({
//     name: v.name?.trim(),
//   }),
//   afterSubmit: ({ action, record }: any) => {
//     console.log(`[DVT] ${action} OK:`, record);
//   },
// };
