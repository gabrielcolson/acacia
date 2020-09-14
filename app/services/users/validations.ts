import * as z from "zod"

export const UpdateUsernameInput = z.object({
  name: z.string(),
})
export type UpdateUsernameInputType = z.infer<typeof UpdateUsernameInput>

export const UpdateDisplayNameInput = z.object({
  displayName: z.string(),
})
export type UpdateDisplayNameInputType = z.infer<typeof UpdateDisplayNameInput>
