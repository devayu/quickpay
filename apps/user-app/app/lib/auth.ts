import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { Session } from "next-auth";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone Number",
          type: "text",
          placeholder: "9977990022",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const existingUser = await db.user.findFirst({
          where: {
            phoneNumber: credentials.phone,
          },
        });
        if (!existingUser) {
          try {
            const newUser = await db.user.create({
              data: {
                phoneNumber: credentials.phone,
                password: hashedPassword,
              },
            });
            return {
              id: newUser.id,
              name: newUser.name,
              email: newUser.email,
            };
          } catch (e) {
            console.error(e);
            return null;
          }
        }
        const passwordValidation = await bcrypt.compare(
          credentials.password,
          hashedPassword
        );
        if (!passwordValidation) return null;
        return {
          id: existingUser?.id,
          email: existingUser?.email,
          name: existingUser?.name,
        };
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "sEcRet",
  callbacks: {
    async session({
      token,
      session,
    }: {
      token: Record<string, unknown>;
      session: Session;
    }) {
      session.user.id = token.sub as string;
      return session;
    },
  },
};
