import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#030712]">
      {/* Clerk ka built-in Sign Up component */}
      <SignUp 
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