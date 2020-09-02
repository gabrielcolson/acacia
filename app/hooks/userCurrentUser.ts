import { AuthenticationError, useQuery, useSession } from "blitz"
import getCurrentUser from "app/services/users/queries/getCurrentUser"

export const useMaybeCurrentUser = () => {
  // We wouldn't have to useSession() here, but doing so improves perf on initial
  // load since we can skip the getCurrentUser() request.
  const session = useSession()
  const [user] = useQuery(getCurrentUser, null, { enabled: !!session.userId })
  return user
}

export const useCurrentUser = () => {
  const [user] = useQuery(getCurrentUser, null)
  if (!user) {
    throw new AuthenticationError()
  }
  return user
}
