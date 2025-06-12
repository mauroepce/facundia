import Link from "next/link";
import { Button } from "@workspace/ui/components/button";

export function LoginButton() {
  return (
    <Button asChild variant="ghost" size="default" className="rounded-full">
      <Link href="/login">Login</Link>
    </Button>
  );
}

export function RegisterButton() {
  return (
    <Button asChild variant="default" size="default" className="custom-login-class rounded-full">
      <Link href="/register">Sign Up</Link>
    </Button>
  );
}
