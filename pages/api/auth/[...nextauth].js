import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (credentials.username === "admin" && credentials.password === "password") {
                    return { id: 1, name: "Admin", role: "admin" };
                }
                throw new Error("Invalid Credentials");
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            session.user.role = token.role;
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
});
