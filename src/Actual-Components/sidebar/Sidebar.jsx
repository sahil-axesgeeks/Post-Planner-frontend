"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { Facebook, Linkedin, Instagram } from "lucide-react";
import LinkedAccounts from "../LinkedAccounts/LinkedAccounts";
// import { useDispatch } from "react-redux";
// import { FacebookLoginThunk } from "@/redux/thunks/facebookThunks/FacebookLoginThunk";

export function AppSidebar() {
  // const dispatch = useDispatch();

  const items = [
    {
      title: "Connect Facebook",
      action: "facebook",
      icon: Facebook,
    },
    {
      title: "Connect Instagram",
      action: "instagram",
      icon: Instagram,
    },
    {
      title: "Connect LinkedIn",
      action: "linkedin",
      icon: Linkedin,
    },
  ];

  // const AUTH_URLS = {
  //   facebook: "http://localhost:5000/auth/facebook/login ",
  //   instagram: "http://localhost:5000/auth/instagram/login",
  //   linkedin: "http://localhost:5000/auth/linkedin/login",
  // };

  // const handleAction = (action) => {
  //   const url = AUTH_URLS[action];

  //   if (!url) {
  //     console.error("Unknown action:", action);
  //     return;
  //   }

  //   window.location.href = url;
  // };

  const handleAction = async (action) => {
    try {
      console.log(action);
      const res = await fetch(`http://localhost:5000/auth/facebook/Login`, {
        method: "GET",
        credentials: "include", // send your JWT cookie
      });
      const data = await res.json();
      console.log(data, "THE DATA🚂🚡🚡🚡🚡🚠🚠🚠🚟🚟");

      window.location.href = data.url; // redirect to OAuth
    } catch (err) {
      console.error("Failed to get OAuth URL", err);
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>SCHEDULE</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={() => handleAction(item.action)}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            <div className="mt-5 flex flex-col">
              <div>Connected Accounts</div>
              <div>
                <LinkedAccounts></LinkedAccounts>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
