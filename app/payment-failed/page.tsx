"use client";
export const dynamic = "force-dynamic";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PaymentFaildPage({ error }: any) {
  const router = useRouter();

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100 px-4 py-10">
      <Card className="w-full max-w-md shadow-lg rounded-2xl border bg-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-red-700">
            Payment Failed
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center space-y-4">
          <XCircle className="h-14 w-14 text-red-600" />

          <p className="text-gray-600 text-center break-words">
            {error || "Unfortunately, your payment could not be processed."}
          </p>

          <Button
            onClick={() => router.push("/cart")}
            variant="default"
            className="w-full"
          >
            Go to Cart
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
