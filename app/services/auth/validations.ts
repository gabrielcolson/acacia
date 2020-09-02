import * as z from "zod"

export const RegisterInput = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
})
export type RegisterInputType = z.infer<typeof RegisterInput>

export const LoginInput = z.object({
  email: z.string().email(),
  password: z.string(),
})
export type LoginInputType = z.infer<typeof LoginInput>
