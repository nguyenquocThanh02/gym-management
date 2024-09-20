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
        message: "Email is required.",
      })
      .email({
        message: "Invalid email format.",
      }),
    password: z
      .string()
      .trim()
      .min(8, {
        message: "Password has at least 8 characters.",
      })
      .regex(/^(?=.*[a-z])/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/^(?=.*\d)/, {
        message: "Password must contain at least one digit.",
      })
      .regex(/^(?=.*[@$!%*?&])/, {
        message:
          "Password must contain at least one special character (@$!%*?&).",
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
          message: "Phone number is invalid.",
        }
      ),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match.",
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
      message: "Email is required.",
    })
    .email({
      message: "Invalid email format.",
    }),
});

export const registerPackageRule = z.object({
  fullName: z.optional(z.string()),
  timeStart: z.union([z.date(), z.string(), z.number()]),
  email: z
    .string()
    .trim()
    .min(1, {
      message: "Email is required.",
    })
    .email({
      message: "Invalid email format.",
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
        message: "Phone number is invalid.",
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
    z.number().min(0, "Price must be a non-negative number"),
    z.string().regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number"),
  ]),
  duration: z.union([
    z.number().min(0, "Duration must be a non-negative number"),
    z.string().regex(/^\d+$/, "Duration must be a valid number"),
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
