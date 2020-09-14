import { passportAuth } from "blitz"
import { Strategy as GitHubStrategy, Profile as GitHubProfile } from "passport-github2"
import db from "db"
import { VerifyCallback } from "passport-oauth2"

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
        scope: ["user:email"],
      },
      async function (
        token: string,
        refreshToken: string,
        profile: GitHubProfile,
        done: VerifyCallback
      ) {
        const { username, displayName } = profile
        if (!username) {
          return done(new Error("username not found in GitHub profile"))
        }
        const pictureURL = profile.photos && profile.photos[0]?.value
        const email = profile.emails && profile.emails[0]?.value
        if (!email) {
          return done(new Error("email not found in GitHub profile"))
        }

        const user = await db.user.upsert({
          where: { socialId: profile.id },
          create: {
            email,
            name: username,
            displayName,
            pictureURL,
            socialId: profile.id,
          },
          update: {
            socialId: profile.id,
          },
        })
        done(null, { publicData: { userId: user.id, roles: [user.role] } })
      }
    ),
  ],
})
