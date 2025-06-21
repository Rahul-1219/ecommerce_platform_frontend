"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { CircleUserRound, Menu, X } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Button } from "../ui/button";
import { CartIcon } from "./cart/cart-icon";
import { SearchBox } from "./search-box";
import { useRouter } from "next/navigation";

export function Header({ categories, products }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [openCategory, setOpenCategory] = React.useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const router = useRouter();
  const toggleCategory = (categoryId: string) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Desktop Navigation */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            MyStore
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
              {categories?.data?.map((category) => (
                <NavigationMenuItem key={category._id}>
                  <NavigationMenuTrigger className="capitalize">
                    {category.name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {category?.subcategories?.map((sub) => (
                        <ListItem
                          key={sub._id}
                          title={sub.name}
                          href={`/filter?s=${sub._id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            router.push(`/filter?s=${sub._id}`, {
                              scroll: false,
                            });
                          }}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Search and User Actions */}
        <div className="flex items-center gap-2">
          {/* Desktop Search */}
          <SearchBox products={products?.data} />
          {/* Mobile Search */}
          <div className="sm:hidden">
            <SearchBox
              isMobile
              isOpen={isSearchOpen}
              onOpenChange={setIsSearchOpen}
              products={products?.data}
            />
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <Button variant="ghost" size="icon" asChild>
                <Link href="/profile">
                  <CircleUserRound className="h-5 w-5" />
                  <span className="sr-only">User Profile</span>
                </Link>
              </Button>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
            )}
            <CartIcon count={1} />

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation with Accordion */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 left-0 right-0 bg-background border-t shadow-lg md:hidden z-10"
            >
              <div className="p-4">
                {/* Accordion Menu */}
                <Accordion
                  type="single"
                  collapsible
                  className="w-full border-none shadow-none"
                >
                  {categories?.data?.map((category) => (
                    <AccordionItem
                      key={category._id}
                      value={category._id}
                      className="border-none"
                    >
                      <AccordionTrigger className="capitalize hover:no-underline py-2">
                        {category.name}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-2 pl-4">
                          {category?.subcategories?.map((sub) => (
                            <Link
                              key={sub._id}
                              href={`/filter?s=${sub._id}`}
                              className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none",
            "transition-colors hover:bg-accent hover:text-accent-foreground",
            "focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
