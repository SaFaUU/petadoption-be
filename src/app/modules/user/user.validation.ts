import { z } from "zod";

const registerUser = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name field is required",
    }),
    email: z
      .string({
        required_error: "Email field is required",
      })
      .email({
        message: "Email must be a valid email address",
      }),
    password: z.string({
      required_error: "Password field is required",
    }),
  }),
});

const updateUser = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name field is required",
      })
      .optional(),
    email: z
      .string({
        required_error: "Email field is required",
      })
      .email({
        message: "Email must be a valid email address",
      })
      .optional(),
    password: z
      .string({
        required_error: "Password field is required",
      })
      .optional(),
  }),
});

const loginUser = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email field is required",
      })
      .email({
        message: "Email must be a valid email address",
      }),
    password: z.string({
      required_error: "Password field is required",
    }),
  }),
});

const changePassword = z.object({
  body: z.object({
    oldPassword: z
      .string({
        required_error: "Old Password field is required",
      })
      .optional(),
    newPassword: z
      .string({
        required_error: "New Password field is required",
      })
      .optional(),
  }),
});

export const UserValidation = {
  registerUser,
  updateUser,
  loginUser,
  changePassword,
};
