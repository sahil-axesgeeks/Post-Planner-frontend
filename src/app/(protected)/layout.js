// import "./global.css';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/Actual-Components/sidebar/Sidebar";
import Navbar from "@/Actual-Components/navbar/navbar";
import ReduxStoreProvider from "@/app/(protected)/Providers/reduxStore/reduxStoreProvider";

export default async function RootLayout({ children }) {
  const cookieStore = await cookies(); // ✅ MUST await
  const token = cookieStore.get("token")?.value; // ✅ now safe
  if (!token) {
    console.log("SERVER IDONT HAVE A TOKEN");
    redirect("/User/Login");
  }
  return (
    // <html lang="en">
    //   <body className="h-screen overflow-hidden">
    <ReduxStoreProvider>
      <SidebarProvider>
        <div className="flex h-screen overflow-hidden">
          <AppSidebar />

          <main className="flex flex-col h-screen w-screen overflow-hidden">
            <div className="flex shrink-0">
              <SidebarTrigger />
              <Navbar />
            </div>

            <div className="flex-1 overflow-y-auto">{children}</div>
          </main>
        </div>
      </SidebarProvider>
    </ReduxStoreProvider>
    //   </body>
    // </html>
  );
}
