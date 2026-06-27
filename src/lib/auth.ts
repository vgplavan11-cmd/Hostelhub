import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { UserRepository } from "./repositories/UserRepository"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@test.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // MOCK AUTHENTICATION LOGIC - Replace with real DB later
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;

        try {
          // Attempt to find user in DynamoDB
          const dbUser = await UserRepository.findByEmail(email);
          if (dbUser) {
            // In a real app, compare hashed password here
            if (password === "password" || dbUser.passwordHash === password) {
              return { 
                id: dbUser.id, 
                name: dbUser.name, 
                email: dbUser.email, 
                role: dbUser.role || "student" // Fallback to student if missing in DB
              };
            }
            return null;
          }
        } catch (error) {
          console.log("DynamoDB lookup failed (likely no table yet), falling back to mock accounts.");
        }

        // MOCK FALLBACK for development
        if (password !== "password") return null;

        if (email === "admin@test.com") {
          return { id: "1", name: "Admin User", email: "admin@test.com", role: "admin" };
        }
        if (email === "warden@test.com") {
          return { id: "2", name: "Warden User", email: "warden@test.com", role: "warden" };
        }
        if (email === "student@test.com") {
          return { id: "3", name: "Student User", email: "student@test.com", role: "student" };
        }

        return null;
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_development_only",
})
