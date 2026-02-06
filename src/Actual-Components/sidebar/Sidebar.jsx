"use client";

import { useState } from "react";
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

import { Facebook, Linkedin, Instagram, Menu, X } from "lucide-react";
import LinkedAccounts from "../LinkedAccounts/LinkedAccounts";

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile toggle

  const items = [
    { title: "Connect Facebook", action: "facebook", icon: Facebook },
    { title: "Connect Instagram", action: "instagram", icon: Instagram },
    { title: "Connect LinkedIn", action: "linkedin", icon: Linkedin },
  ];

  const handleAction = async (action) => {
    try {
      console.log(action);
      const res = await fetch(`http://localhost:5000/auth/facebook/Login`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data, "OAuth URL");
      window.location.href = data.url;
    } catch (err) {
      console.error("Failed to get OAuth URL", err);
    }
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md border-2 border-red-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <Sidebar
        collapsible="icon"
        className={`fixed top-0 left-0 h-full z-40 transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:h-auto`}
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>SCHEDULE</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => handleAction(item.action)}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>

              <div className="mt-5 flex flex-col">
                <div className="font-semibold mb-2">Connected Accounts</div>
                <LinkedAccounts />
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
