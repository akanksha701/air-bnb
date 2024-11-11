import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import { prisma } from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
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
    }),
    CredentialsProvider({
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
    async signIn({ user, account, profile }:any) {
      try {
        if (account?.provider === "github" || account?.provider === "google") {
          if (!user?.email) {
            console.error("No email provided from OAuth provider");
            return false;
          }
          
          // Check if user exists
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });
  
          if (!existingUser) {
            // Ensure all required fields are present
            if (!user.email || !account.providerAccountId) {
              console.error("Missing required fields for user creation");
              return false;
            }
  
            const newUser = await prisma.user.create({
              data: <any>{
                email: user.email,
                name: user.name || profile?.login || user.email.split('@')[0],
                image: user.image || null,
                emailVerified: new Date(),
              },
            });
            if (account.provider && account.type) {
              await prisma.account.create({
                data: {
                  userId: newUser.id,
                  type: account.type,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  access_token: account.access_token || null,
                  token_type: account.token_type || null,
                  scope: account.scope || null,
                  id_token: account.id_token || null,
                  expires_at: account.expires_at || null,
                },
              });
            }
          }
        }
        return true;
      } catch (error) {
        console.error("Sign in error:", error);
        return false;
      }
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id
      }
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    }
  },
  debug: process.env.NODE_ENV === "development",
  
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 