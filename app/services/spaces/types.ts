import { Space } from "db"

export type SpaceWithUsers = Space & {
  owner: { id: string; name: string; pictureURL: string | null }
  members: { id: string; name: string; pictureURL: string | null }[]
}
