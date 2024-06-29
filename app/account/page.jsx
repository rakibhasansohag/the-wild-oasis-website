import React from "react";
import { auth } from "../_lib/auth";

export const metadata = {
  title: "Account - The Wild Oasis",
  description: "Learn more about Your Account in The Wild Oasis",
  openGraph: {
    title: "Account - The Wild Oasis",
    description: "Learn more about Your Account in The Wild Oasis",

    siteName: "The Wild Oasis",
    type: "website",
  },
};

// TODO: ADDED MORE PROFILE options
const Page = async () => {
  const session = await auth();

  const firstName = session.user.name.split(" ")[0];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-accent-400 mb-7">
        Welcome, {firstName}!
      </h2>
    </div>
  );
};

export default Page;
