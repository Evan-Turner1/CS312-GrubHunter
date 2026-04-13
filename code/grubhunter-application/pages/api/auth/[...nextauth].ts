import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { createHash } from "crypto";

const createUserId = (input: string): string => {
  return createHash("sha256").update(input).digest("hex");
};

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token }) {
      if (token.email && !token.fdlst_private_userId) {
        token.fdlst_private_userId = createUserId(token.email);
      }
      return token;
    },
    async session({ session, token }) {
      if (
        session.user?.email &&
        !session.user.fdlst_private_userId
      ) {
        session.user.fdlst_private_userId =
          token.fdlst_private_userId as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);