import * as z from "zod"

export const CreateSpaceInput = z.object({
  name: z.string().nonempty().max(50),
})
export type CreateSpaceInputType = z.infer<typeof CreateSpaceInput>
