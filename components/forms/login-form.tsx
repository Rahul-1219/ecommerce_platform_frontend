"use client"; // Ensure this is at the top of the file for client-side rendering
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "@/app/admin/action"; // This is expected to be the login function
import { loginSchema, LoginSchema } from "@/schemas/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ButtonLoading } from "../custom/button-loading";

const LoginForm: React.FC = () => {
  const router = useRouter(); // useRouter should work here, as this is a client-side component
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showLoaderBtn, setShowLoaderBtn] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      setShowLoaderBtn(true);
      const response = await loginUser(data); // Assuming loginUser returns the response with a status
      if (response.status) {
        router.push("/admin"); // Navigate to the home page (or wherever needed)
      } else {
        toast({
          variant: "destructive",
          description: response.message,
          duration: 2000,
        });
      }
    } catch (error: any) {
      setShowLoaderBtn(false);
      toast({
        variant: "destructive",
        description: error.message,
        duration: 2000,
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Field */}
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"} // Toggle password visibility
                          placeholder="Enter your password"
                          {...field}
                          className="pr-12" // Add padding to make space for the button
                        />
                      </FormControl>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-0"
                        onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!showLoaderBtn ? (
                /* Submit Button */
                <Button type="submit" className="w-full">
                  Log In
                </Button>
              ) : (
                <ButtonLoading classes="w-full" />
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
