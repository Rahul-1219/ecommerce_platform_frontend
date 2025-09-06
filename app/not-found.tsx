"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { XCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full text-center shadow-lg rounded-[0.125rem]">
        <CardHeader className="flex flex-col items-center gap-2">
          <XCircle className="h-12 w-12 text-customBlack" />
          <CardTitle className="text-lg font-bold text-customBlack">
            Page Not Found
          </CardTitle>
          <CardDescription className="text-sm text-customBlack">
            Could not find the requested resource
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4 flex justify-center">
          <Button
            asChild
            className="rounded-[0.125rem] bg-customBlack"
            variant="default"
          >
            <Link href="/">Return Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
