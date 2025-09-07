import { ModeToggle } from "@/components/custom/mode-toggle";
import LoginForm from "@/components/forms/login-form";

const Login = () => {
  return (
    <div className="relative min-h-screen p-4">
      {/* ModeToggle in the top-right corner */}
      <LoginForm />
    </div>
  );
};

export default Login;
