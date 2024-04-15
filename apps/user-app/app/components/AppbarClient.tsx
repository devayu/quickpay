"use client";
import Appbar from "@repo/ui/appbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export const AppbarClient = () => {
  const session = useSession();
  const router = useRouter();
  return (
    <Appbar
      isAuthenticated={!!session.data?.user}
      onSignIn={signIn}
      onSignOut={async () => {
        await signOut();
        router.push("/api/auth/signin");
      }}
    ></Appbar>
  );
};

export default AppbarClient;
