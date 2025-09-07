"use client";

import { logOut } from "@/app/(user)/action";
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
import { useUserStore } from "@/context/user-store";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { CircleUserRound, LogOut, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import Logo from "../icons/logo";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CartIcon } from "./cart/cart-icon";
import { SearchBox } from "./search-box";

export function HeaderClient({
  categories,
  products,
  isAuthenticated,
  itemCount,
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(isAuthenticated);
  const router = useRouter();
  const { clearUser } = useUserStore();
  React.useEffect(() => {
    setIsLoggedIn(isAuthenticated);
  }, [isAuthenticated]);

  const handleLogout = async () => {
    // Clear token from local storage and log out user
    await logOut();
    clearUser();
    router.push("/login");
  };
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-customBlack text-[#fff] px-4 sm:px-6 md:px-8 lg:px-10 h-16 md:h-20">
      <div className="container flex h-full items-center justify-between">
        {/* Logo and Desktop Navigation */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
              {categories?.data?.map((category) => (
                <NavigationMenuItem key={category._id} className="rounded-none">
                  <NavigationMenuTrigger
                    className="uppercase font-bold text-[14px] text-white !bg-transparent 
             hover:text-white hover:bg-transparent
             focus:text-white focus:bg-transparent
             active:text-white active:bg-transparent
             data-[state=open]:text-white data-[state=open]:bg-transparent"
                  >
                    {category.name}
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
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
        <div className="flex items-center gap-3 md:gap-8">
          {/* Desktop Search */}
          <SearchBox products={products?.data} />

          {/* User Actions */}
          <div className="flex items-center gap-3 md:gap-8">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                  <div>
                    <CircleUserRound className="h-6 w-6" />
                    <span className="sr-only">User Profile</span>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-40 rounded-none font-semibold"
                >
                  <DropdownMenuItem
                    asChild
                    className="cursor-pointer text-[16px]"
                  >
                    <Link href="/profile" className="flex items-center gap-2">
                      <User className="h-6 w-6" strokeWidth={2.8} />
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 cursor-pointer text-[16px]"
                  >
                    <LogOut className="h-6 w-6" strokeWidth={2.8} />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button
                  variant="default"
                  size="sm"
                  className="text-[#fff] uppercase font-bold !bg-transparent !hover:bg-transparent"
                >
                  Login
                </Button>
              </Link>
            )}
            <CartIcon count={itemCount} />

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="md:hidden w-10 h-10 p-0 bg-transparent text-white hover:bg-transparent active:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 flex items-center justify-center cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
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
              className="text-customBlack absolute top-16 left-0 right-0 bg-background border-t shadow-lg md:hidden z-10"
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
                      <AccordionTrigger className="hover:no-underline py-2">
                        <span className="uppercase">{category.name}</span>
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
            "block select-none space-y-1 p-2 leading-none no-underline outline-none",
            "transition-colors hover:bg-accent hover:text-accent-foreground",
            "focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-md font-normal leading-none  hover:font-medium">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
