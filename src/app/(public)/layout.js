// IMPORTS
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AuthComponentPageBackground } from "@/Actual-Components/User/AuthPages/backgroundPage";

export default async function Layout({ children }) {
  const token = (await cookies()).get("token")?.value;

  if (token) {
    redirect("/");
  }
  return (
    <>
      <AuthComponentPageBackground>{children}</AuthComponentPageBackground>
    </>
  );
}
