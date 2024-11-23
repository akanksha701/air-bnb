import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import CredentialsProvider, { CredentialsConfig } from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import NextAuth, { Account, User } from "next-auth";
import { prisma } from "@/app/libs/prismadb";
import { OAuthConfig } from "next-auth/providers/oauth";


// Define the AuthOptions interface
const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      allowDangerousEmailAccountLinking: true,
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile: (profile) => {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/",
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user }: { user: User; account: Account | null }) {
      // Ensure user has an ID
      if (!user.id) {
        console.error("User ID is missing");
        return false;
      }
      return true;
    },
    async jwt({ token, user, account }:{token:{ id:string,accessToken:string}; user: User; account: {access_token:string} }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
interface AuthOptions{
  providers: (OAuthConfig<GithubProfile> | OAuthConfig<GoogleProfile> | CredentialsConfig<{
    email: {
        label: string;
        type: string;
    };
}>)[];
secret: string | undefined;
}
// Export the NextAuth handler as the default export
const handler = NextAuth(authOptions as AuthOptions);
export { handler as GET, handler as POST };