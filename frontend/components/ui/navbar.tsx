"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          InnovAI
        </h1>

        <NavigationMenu className="hidden md:block">
          <NavigationMenuList className="flex gap-6 text-sm text-gray-300">
            <NavigationMenuItem>
              <Link href="#">Features</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#">Pricing</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#">About</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex gap-3">
          <Button variant="ghost">Login</Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            Get Started
          </Button>
        </div>

      </div>
    </nav>
  );
}
