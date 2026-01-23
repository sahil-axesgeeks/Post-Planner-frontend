"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

export default function MainNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* HOME */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* FEATURES DROPDOWN */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent className="p-4">
            <ul className="space-y-2">
              <li>
                <Link href="/scheduler">Post Scheduler</Link>
              </li>
              <li>
                <Link href="/analytics">Analytics</Link>
              </li>
              <li>
                <Link href="/automation">Automation</Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* DOCS */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/docs">Docs</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
