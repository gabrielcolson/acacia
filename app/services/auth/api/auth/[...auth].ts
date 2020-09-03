import { passportAuth } from "blitz"
import { Strategy as GitHubStrategy } from "passport-github2"
import db from "db"

function assert(condition: any, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

assert(process.env.GITHUB_CLIENT_ID, "You must provide the GITHUB_CLIENT_ID env variable")
assert(process.env.GITHUB_CLIENT_SECRET, "You must provide the GITHUB_CLIENT_SECRET env variable")

export default passportAuth({
  successRedirectUrl: "/dashboard",
  strategies: [
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.BASE_URL}/api/auth/github/callback`,
      },
      async function (_token: any, _tokenSecret: any, profile: any, done: any) {
        const { username, displayName } = profile
        const email = profile.emails && profile.emails[0]?.value
        const pictureURL = profile.photos && profile.photos[0]?.value
        if (!email) {
          return done(new Error("email not found in GitHub profile"))
        }

        const user = await db.user.upsert({
          where: { email },
          create: {
            email,
            name: username,
            displayName,
            pictureURL,
          },
          update: {
            email,
          },
        })
        done(null, { publicData: { userId: user.id, roles: [user.role] } })
      }
    ),
  ],
})
