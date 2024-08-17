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

export const registerPackageRule = z.object({
  fullname: z.optional(z.string()),
  timestart: z.optional(z.string()),
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
