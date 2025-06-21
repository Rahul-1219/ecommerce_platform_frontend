"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { sendVerificationCode } from "@/app/(user)/action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

interface VerifyCodeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  verifySentCode: (data: any) => void;
  email?: string;
}

export function VerifyCode({
  open,
  onOpenChange,
  verifySentCode,
  email,
}: VerifyCodeProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });
  const [isVerifyLoading, setIsVerifyLoading] = useState(false);

  const { toast } = useToast();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsVerifyLoading(true);
      const reqData = {
        email: email,
        otp: data.pin,
      };
      // Verify code
      await verifySentCode(reqData);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.message,
        duration: 2000,
      });
    } finally {
      setIsVerifyLoading(false);
    }
  }

  async function onResentCode() {
    try {
      setIsVerifyLoading(false);
      form.reset();
      const sendVerificationCodeReq = {
        email: email,
        type: "email",
      };
      // Send verification code
      const sendCodeRes = await sendVerificationCode(sendVerificationCodeReq);
      if (!sendCodeRes.status) {
        // After successful signup and send verification code, open the verify code dialog
        throw new Error(sendCodeRes.message);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.message,
        duration: 2000,
      });
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[425px]"
        aria-describedby="verify-dialog-description"
      >
        <DialogHeader>
          <DialogTitle>Verify Email</DialogTitle>
          <div className="text-center pt-2">
            <div className="flex flex-col items-center space-y-2">
              <span>We've sent a 6-digit code to</span>
              <div className="flex items-center gap-2">
                <span className="px-2 text-blue-700">{email}</span>
              </div>
            </div>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem className="mx-auto flex flex-col items-center">
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription className="text-center">
                    <span className="px-1">Didn't get code?</span>
                    <span
                      className="underline cursor-pointer text-blue-700 px-1"
                      onClick={onResentCode}
                    >
                      resent
                    </span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isVerifyLoading}>
              {isVerifyLoading ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                "Verify"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
