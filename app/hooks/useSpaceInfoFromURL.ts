import { useRouter } from "@blitzjs/core"

export const useSpaceInfoFromURL = () => {
  const router = useRouter()
  return (router.params as unknown) as {
    user: string
    space: string
  }
}
