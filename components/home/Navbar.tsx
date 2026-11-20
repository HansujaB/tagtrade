"use client";

import { useState } from "react";
import { Menu, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#controls", label: "Controls" },
  { href: "#launch", label: "Launch" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[76px] max-w-[1360px] items-center justify-between gap-4 px-6 lg:px-12">
        <a href="#top" aria-label="TagTradeX home" className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/tagtradex-lockup-white.svg" alt="TagTradeX" width="162" height="24" className="h-7 w-auto" />
        </a>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-5">
            {links.map((link) => <NavigationMenuItem key={link.href}><NavigationMenuLink href={link.href} className="min-h-11 px-3 text-muted-foreground hover:text-foreground">{link.label}</NavigationMenuLink></NavigationMenuItem>)}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-2">
          <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
            <DialogTrigger render={<Button variant="outline" size="lg" className="min-h-11 min-w-20" />}>Login</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Login is coming</DialogTitle>
                <DialogDescription>Account access is coming. Explore how TagTradeX works on this page.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
                <DialogClose render={<Button render={<a href="#x-example" />} />}>
                  See X example <ArrowUpRight data-icon="inline-end" />
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger render={<Button variant="outline" size="icon-lg" className="min-h-11 min-w-11 md:hidden" aria-label="Open menu" />}><Menu /></SheetTrigger>
            <SheetContent>
              <SheetHeader><SheetTitle>Navigate TagTradeX</SheetTitle><SheetDescription>Explore the landing page.</SheetDescription></SheetHeader>
              <nav className="flex flex-col gap-2 px-4">
                {links.map((link) => <SheetClose key={link.href} render={<Button render={<a href={link.href} />} variant="ghost" className="min-h-11 justify-start" />}>{link.label}</SheetClose>)}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
