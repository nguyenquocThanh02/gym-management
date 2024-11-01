import { z } from "zod";

export const registerRule = z
  .object({
    fullname: z.optional(z.string()),
    account: z.string().min(2).max(50),
    dateOfBirth: z.optional(z.string()),
    email: z
      .string()
      .trim()
      .min(1, {
        message: "Email là bắt buộc.",
      })
      .email({
        message: "Định dạng email không hợp lệ.",
      }),
    password: z
      .string()
      .trim()
      .min(8, {
        message: "Mật khẩu phải có ít nhất 8 ký tự.",
      })
      .regex(/^(?=.*[a-z])/, {
        message: "Mật khẩu phải chứa ít nhất một ký tự chữ thường.",
      })
      .regex(/^(?=.*[A-Z])/, {
        message: "Mật khẩu phải chứa ít nhất một ký tự chữ hoa.",
      })
      .regex(/^(?=.*\d)/, {
        message: "Mật khẩu phải chứa ít nhất một chữ số.",
      })
      .regex(/^(?=.*[@$!%*?&])/, {
        message: "Mật khẩu phải chứa ít nhất một ký tự đặc biệt (@$!%*?&).",
      }),
    confirmPassword: z.string().trim(),
    phone: z
      .string()
      .trim()
      .refine(
        (value) =>
          /^\+?(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/.test(
            value
          ),
        {
          message: "Số điện thoại không hợp lệ.",
        }
      ),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp.",
        path: ["confirmPassword"],
      });
    }
  });

export const loginRule = z.object({
  account: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
});

export const emailRule = z.object({
  email: z
    .string()
    .trim()
    .min(1, {
      message: "Email là bắt buộc.",
    })
    .email({
      message: "Định dạng email không hợp lệ.",
    }),
});

export const registerPackageRule = z.object({
  fullName: z.optional(z.string()),
  timeStart: z.union([z.date(), z.string(), z.number()]),
  email: z
    .string()
    .trim()
    .min(1, {
      message: "Email là bắt buộc.",
    })
    .email({
      message: "Định dạng email không hợp lệ.",
    }),
  phone: z
    .string()
    .trim()
    .refine(
      (value) =>
        /^\+?(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/.test(
          value
        ),
      {
        message: "Số điện thoại không hợp lệ.",
      }
    ),
});

export const ptRule = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(30, "Name must be less than 100 characters"),
  experienceYears: z.union([
    z
      .number()
      .min(0, "Experience years must be a positive number")
      .max(50, "Experience years must be less than 50"),
    z
      .string()
      .regex(/^\d+$/, "Experience years must be a valid number")
      .transform((value) => parseInt(value, 10))
      .refine((value) => value >= 0 && value <= 50, {
        message: "Experience years must be between 0 and 50",
      }),
  ]),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number must be less than 15 characters"),
  specialty: z
    .string()
    .min(1, "Specialty is required")
    .max(50, "Specialty must be less than 50 characters"),
  address: z
    .string()
    .min(1, "Address is required")
    .max(255, "Address must be less than 255 characters"),
  email: z.string().email("Invalid email address").optional(),
  profileImage: z.string().optional(),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
});

export const deviceRule = z.object({
  name: z.string().min(1).max(100),
  type: z.string().min(1).max(50),
  lastMaintenance: z.union([z.date().optional(), z.string().optional()]),
  purchaseDate: z.union([z.date().optional(), z.string().optional()]),
  maintenanceInterval: z.union([
    z
      .number()
      .min(0, "Số năm kinh nghiệm phải là một số dương")
      .max(50, "Số năm kinh nghiệm phải nhỏ hơn 50"),
    z
      .string()
      .regex(/^\d+$/, "Số năm kinh nghiệm phải là một số hợp lệ")
      .transform((value) => parseInt(value, 10))
      .refine((value) => value >= 0 && value <= 50, {
        message: "Số năm kinh nghiệm phải nằm trong khoảng từ 0 đến 50",
      }),
  ]),
  description: z.string().max(500),
  serialNumber: z.string().optional(),
});

export const packageRule = z.object({
  name: z.string().min(1).max(100),
  type: z.string().optional(),
  sessionWithPT: z.union([z.number().optional(), z.string().optional()]),
  description: z.string().optional(),
  suitableFor: z.string().optional(),
  price: z.union([
    z.number().min(0, "Giá phải là một số không âm"),
    z.string().regex(/^\d+(\.\d{1,2})?$/, "Giá phải là một số hợp lệ"),
  ]),
  duration: z.union([
    z.number().min(0, "Thời gian phải là một số không âm"),
    z.string().regex(/^\d+$/, "Thời gian phải là một số hợp lệ"),
  ]),
  stock: z.union([z.number().optional(), z.string().optional()]),
});

export const discountRule = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(30, "Name must be less than 120 characters"),
  percent: z.union([
    z.number().min(0, "Percent must be a non-negative number"),
    z.number().max(100, "Percent must be a smaller than 100"),
    z.string().regex(/^\d+$/, "Percent must be a valid number"),
  ]),
  validFrom: z.union([z.date(), z.string()]),
  validTo: z.union([z.date(), z.string()]),
  description: z.string().optional(),
  packages: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export const articalRule = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500),
  coverImage: z.any().refine(
    (files) => {
      return Array.from(files).every((file) => file instanceof File);
    },
    { message: "Mong đợi là 1 tệp ảnh" }
  ),
});

export const statusChangeArticalRule = z.object({
  statusChange: z.string(),
});

export const profileRule = z.object({
  fullName: z.optional(z.string()),
  accountName: z.string().min(2).max(50),
  dateOfBirth: z.optional(z.string()),
  email: z
    .string()
    .trim()
    .min(1, {
      message: "Email là bắt buộc.",
    })
    .email({
      message: "Định dạng email không hợp lệ.",
    }),
  phone: z
    .string()
    .trim()
    .refine(
      (value) =>
        /^\+?(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/.test(
          value
        ),
      {
        message: "Số điện thoại không hợp lệ.",
      }
    ),
});

export const changePasswordRule = z
  .object({
    password: z.string().min(2).max(50),
    newPassword: z
      .string()
      .trim()
      .min(8, {
        message: "Mật khẩu phải có ít nhất 8 ký tự.",
      })
      .regex(/^(?=.*[a-z])/, {
        message: "Mật khẩu phải chứa ít nhất một ký tự chữ thường.",
      })
      .regex(/^(?=.*[A-Z])/, {
        message: "Mật khẩu phải chứa ít nhất một ký tự chữ hoa.",
      })
      .regex(/^(?=.*\d)/, {
        message: "Mật khẩu phải chứa ít nhất một chữ số.",
      })
      .regex(/^(?=.*[@$!%*?&])/, {
        message: "Mật khẩu phải chứa ít nhất một ký tự đặc biệt (@$!%*?&).",
      }),
    confirmNewPassword: z.string().trim(),
  })
  .superRefine(({ confirmNewPassword, newPassword }, ctx) => {
    if (confirmNewPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp.",
        path: ["confirmNewPassword"],
      });
    }
  });

export const resetPasswordRule = z
  .object({
    password: z
      .string()
      .trim()
      .min(8, {
        message: "Mật khẩu phải có ít nhất 8 ký tự.",
      })
      .regex(/^(?=.*[a-z])/, {
        message: "Mật khẩu phải chứa ít nhất một ký tự chữ thường.",
      })
      .regex(/^(?=.*[A-Z])/, {
        message: "Mật khẩu phải chứa ít nhất một ký tự chữ hoa.",
      })
      .regex(/^(?=.*\d)/, {
        message: "Mật khẩu phải chứa ít nhất một chữ số.",
      })
      .regex(/^(?=.*[@$!%*?&])/, {
        message: "Mật khẩu phải chứa ít nhất một ký tự đặc biệt (@$!%*?&).",
      }),
    confirmPassword: z.string().trim(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp.",
        path: ["confirmPassword"],
      });
    }
  });
