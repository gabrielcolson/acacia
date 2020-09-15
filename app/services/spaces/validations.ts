import * as z from "zod"

export const CreateSpaceInput = z.object({
  name: z.string().nonempty().max(50),
})
export type CreateSpaceInputType = z.infer<typeof CreateSpaceInput>

export const GetSpaceInput = z.object({
  user: z.string(),
  space: z.string(),
})
export type GetSpaceInputType = z.infer<typeof GetSpaceInput>

export const AddMemberInput = z.object({
  whereSpace: GetSpaceInput,
  email: z.string().email(),
})
export type AddMemberInputType = z.infer<typeof AddMemberInput>

export const UpdateSpaceNameInput = z.object({
  spaceId: z.string(),
  name: z.string().nonempty().max(50),
})
export type UpdateSpaceNameInputType = z.infer<typeof UpdateSpaceNameInput>

export const DeleteSpaceInput = z.object({
  spaceId: z.string(),
})
export type DeleteSpaceInputType = z.infer<typeof DeleteSpaceInput>
