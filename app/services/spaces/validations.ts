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
