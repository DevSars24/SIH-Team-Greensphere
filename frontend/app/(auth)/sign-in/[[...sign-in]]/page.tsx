import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#030712]">
      {/* Clerk ka built-in Sign In component */}
      <SignIn 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-sm normal-case',
            card: 'glass border-white/10'
          }
        }}
      />
    </div>
  );
}