// IMPORTS

import { AuthComponentPageBackground } from "@/Actual-Components/User/AuthPages/backgroundPage";

export default function Layout({ children }) {
  return (
    <>
      <AuthComponentPageBackground>{children}</AuthComponentPageBackground>
    </>
  );
}
