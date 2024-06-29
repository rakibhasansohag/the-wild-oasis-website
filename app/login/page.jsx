import SignInButton from "../_components/SignInButton";

export const metadata = {
  title: "Login",
  description: "Login to access your guest account",
  openGraph: {
    title: "Login ",
    description: "Login to access your guest account",

    siteName: "The Wild Oasis",
    type: "website",
  },
};

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-10 mt-10">
      <h2 className="text-3xl font-semibold">
        Sign in to access your guest area
      </h2>
      <SignInButton />
    </div>
  );
}
