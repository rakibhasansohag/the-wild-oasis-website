"use client";

import { useFormStatus } from "react-dom";

import SpinnerMini from "./SpinnerMini";

const SubmitButton = ({ children, pendingLabel, otherClasses }) => {
  const { pending } = useFormStatus();

  return (
    <button
      className={`px-8 py-4 font-semibold transition-all bg-accent-500 text-primary-800 hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 ${otherClasses}`}
      disabled={pending}
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <SpinnerMini /> {pendingLabel}
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default SubmitButton;
