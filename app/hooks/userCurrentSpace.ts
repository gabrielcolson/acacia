import { useQuery } from "@blitzjs/core"
import { useSpaceInfoFromURL } from "./useSpaceInfoFromURL"
import getSpace from "app/services/spaces/queries/getSpace"

export const useCurrentSpace = () => {
  const { user: ownerName, space: spaceName } = useSpaceInfoFromURL()
  const [space] = useQuery(getSpace, { user: ownerName, space: spaceName })
  return space
}
