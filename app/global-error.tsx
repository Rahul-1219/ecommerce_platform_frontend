"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html className="h-full">
      <body className="flex h-full w-full items-center justify-center bg-gray-50 p-4">
        <Card className="max-w-md w-full text-center shadow-lg rounded-[0.125rem]">
          <CardHeader className="flex flex-col items-center gap-2">
            <AlertCircle className="h-12 w-12 text-customBlack" />
            <CardTitle className="text-lg font-bold text-customBlack">
              Something went wrong!
            </CardTitle>
            <CardDescription className="text-sm text-customBlack">
              {error?.message || "An unexpected error occurred."}
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4 flex justify-center">
            <Button
              variant="default"
              className="rounded-[0.125rem] bg-customBlack"
              onClick={() => reset()}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </body>
    </html>
  );
}
