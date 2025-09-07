export const dynamic = "force-dynamic";
import { ForgotPassword } from "@/components/user/forgot-password";
export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ForgotPassword />
      </div>
    </div>
  );
}
