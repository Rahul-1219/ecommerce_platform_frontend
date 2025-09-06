"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { verifyStripePayment } from "../(user)/action";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "failed" | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      router.replace("/");
      return;
    }
    async function verifyPayment() {
      try {
        setLoading(true);
        const res = await verifyStripePayment({ sessionId });
        if (res?.status) {
          setStatus("success");
          setLoading(false);

          // Auto redirect to home after 3s
          setTimeout(() => {
            router.push("/");
          }, 3000);
        } else {
          setStatus("failed");
          setError(res?.message || "Payment verification failed.");
          setLoading(false);
        }
      } catch (err: any) {
        setStatus("failed");
        setError(
          err.message || "Something went wrong while verifying payment."
        );
        setLoading(false);
      }
    }
    verifyPayment();
  }, [sessionId, router]);

  return (
    <div className="flex justify-center items-start px-4 pt-28">
      <Card className="w-full max-w-md h-auto shadow-xl rounded-2xl border-2 bg-grey-100">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Payment Verification
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center space-y-6">
          {loading && (
            <div className="flex flex-col items-center">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-3" />
              <p className="text-gray-600 font-medium">
                Verifying your payment, please wait...
              </p>
            </div>
          )}

          {!loading && status === "success" && (
            <div className="flex flex-col items-center">
              <CheckCircle2 className="h-14 w-14 text-green-600 mb-3" />
              <h2 className="text-xl font-semibold text-green-700">
                Payment Successful
              </h2>
              <p className="text-gray-600 text-center mt-2">
                Your payment has been verified. Redirecting...
              </p>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Please don’t close this tab, browser, or window until the
                process is complete.
              </p>
            </div>
          )}

          {!loading && status === "failed" && (
            <div className="flex flex-col items-center w-full">
              <XCircle className="h-14 w-14 text-red-600 mb-3" />
              <h2 className="text-xl font-semibold text-red-700">
                Payment Failed
              </h2>

              <p className="text-gray-600 text-center mt-2 w-full break-words px-4">
                {error}
              </p>

              <Button
                onClick={() => router.push("/")}
                variant="default"
                className="mt-4 w-full"
              >
                Go to shopping
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
