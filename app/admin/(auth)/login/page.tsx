import { ModeToggle } from "@/components/custom/mode-toggle";
import LoginForm from "@/components/forms/login-form";

const Login = () => {
  return (
    <div className="relative min-h-screen">
      {/* ModeToggle in the top-right corner */}
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
