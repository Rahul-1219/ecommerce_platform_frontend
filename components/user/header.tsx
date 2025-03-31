"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex justify-between items-center p-4">
      {/* Left Section: Logo and Navigation Links */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <Button className="text-xl font-bold outline-none" variant="ghost">
          MyStore
        </Button>

        {/* Navigation Links (Visible on Medium Screens and Above) */}
        <div className="hidden md:flex gap-4">
          <Button variant="ghost">Men</Button>
          <Button variant="ghost">Women</Button>
          <Button variant="ghost">Kids</Button>
        </div>
      </div>

      {/* Right Section: Search Bar and User Actions */}
      <div className="flex items-center gap-4">
        {/* Search Bar (Hidden on Small Screens) */}
        <Input
          type="text"
          placeholder="Search products..."
          className="hidden sm:block w-48 md:w-64"
        />

        {/* Login and Cart Buttons */}
        <Button variant="ghost">Login</Button>
        <Button variant="ghost">Cart</Button>

        {/* Mobile Menu Button (Visible on Small Screens) */}
        <Button
          variant="ghost"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu Dropdown (Slides Down with Animation) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 right-0 bg-white border-t shadow-lg md:hidden z-10"
          >
            <div className="flex flex-col p-4 gap-2">
              <Button variant="ghost" className="w-full justify-start">
                Men
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Women
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Kids
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
