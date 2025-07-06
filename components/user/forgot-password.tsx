"use client";

import {
  forgotPassword,
  sendVerificationCode,
  verifyCode,
} from "@/app/(user)/action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeftIcon,
  Loader2Icon,
  LockKeyholeIcon,
  MailIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Form validation schemas
const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const codeSchema = z.object({
  code: z.string().min(6, "Verification code must be 6 characters"),
});

const passwordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const ForgotPassword = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [isSendCode, setIsSendCode] = useState(false);
  const [isVerifyCode, setIsVerifyCode] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const totalSteps = 3;
  const { toast } = useToast();
  const router = useRouter();
  // Forms for each step
  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const codeForm = useForm({
    resolver: zodResolver(codeSchema),
    defaultValues: { code: "" },
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const stepTitles = [
    "Reset your password",
    "Verify your email",
    "Create new password",
  ];
  const stepDescriptions = [
    "Enter your email to receive a verification code",
    "Check your email for the 6-digit code",
    "Create a strong new password for your account",
  ];

  const onEmailSubmit = async (data: z.infer<typeof emailSchema>) => {
    try {
      setIsSendCode(true);
      const sendCodeReq = {
        email: data.email,
        type: "email",
      };
      const sendCodeRes = await sendVerificationCode(sendCodeReq);
      if (sendCodeRes.status) {
        setEmail(data.email);
        setStep(1);
      } else {
        // After successful signup and send verification code, open the verify code dialog
        throw new Error(sendCodeRes.message);
      }
      setIsSendCode(false);
    } catch (error: any) {
      setIsSendCode(false);
      toast({
        variant: "destructive",
        title: error.message,
        duration: 2000,
      });
    }
  };

  const onCodeSubmit = async (data: z.infer<typeof codeSchema>) => {
    try {
      setIsVerifyCode(true);
      const verifyCodeReq = {
        email: email,
        otp: data.code,
      };
      // Verify code
      const response = await verifyCode(verifyCodeReq, true);
      if (response.status) {
        setToken(response.data.token);
        setStep(2);
      } else {
        throw new Error(response.message);
      }
      setIsVerifyCode(false);
    } catch (error: any) {
      setIsVerifyCode(false);
      toast({
        variant: "destructive",
        title: error.message,
        duration: 2000,
      });
    }
  };

  const onPasswordSubmit = async (data: z.infer<typeof passwordSchema>) => {
    try {
      setIsResetPassword(true);
      const forgotPasswordReq = {
        password: data.newPassword,
      };
      // Verify code
      const response = await forgotPassword(forgotPasswordReq, token);
      console.log(response);
      if (response.status) {
        router.push("/login");
        // Reset all forms
        emailForm.reset();
        codeForm.reset();
        passwordForm.reset();
      } else {
        throw new Error(response.message);
      }
      setIsResetPassword(false);
    } catch (error: any) {
      setIsResetPassword(false);
      toast({
        variant: "destructive",
        title: error.message,
        duration: 2000,
      });
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl border  shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-center text-gray-900">
              {stepTitles[step]}
            </h1>
            <p className="text-muted-foreground text-center mt-2">
              {stepDescriptions[step]}
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center justify-center mb-8">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2",
                    index <= step
                      ? "bg-primary text-white border-primary"
                      : "bg-white border-gray-300 text-gray-400"
                  )}
                >
                  {index + 1}
                </div>
                {index < totalSteps - 1 && (
                  <div
                    className={cn(
                      "w-12 h-1",
                      index < step ? "bg-primary" : "bg-gray-200"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Email */}
          {step === 0 && (
            <Form {...emailForm}>
              <form
                onSubmit={emailForm.handleSubmit(onEmailSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            placeholder="your@email.com"
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSendCode}
                >
                  {isSendCode ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    "Send Verification Code"
                  )}
                </Button>
              </form>
            </Form>
          )}

          {/* Step 2: Verification Code */}
          {step === 1 && (
            <Form {...codeForm}>
              <form
                onSubmit={codeForm.handleSubmit(onCodeSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={codeForm.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification Code</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <LockKeyholeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            placeholder="123456"
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    size="lg"
                    onClick={handleBack}
                  >
                    <ArrowLeftIcon className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    size="lg"
                    disabled={isVerifyCode}
                  >
                    {isVerifyCode ? (
                      <Loader2Icon className="animate-spin" />
                    ) : (
                      "Verify Code"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {/* Step 3: New Password */}
          {step === 2 && (
            <Form {...passwordForm}>
              <form
                onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <LockKeyholeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            placeholder="••••••••"
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <LockKeyholeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            placeholder="••••••••"
                            type="password"
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex space-x-3">
                  <Button
                    type="submit"
                    className="flex-1"
                    size="lg"
                    disabled={isResetPassword}
                  >
                    {isResetPassword ? (
                      <Loader2Icon className="animate-spin" />
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          )}
          <div className="mt-4 text-center text-sm">
            Remember your password?{" "}
            <a href="/login" className="font-medium text-primary underline">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
