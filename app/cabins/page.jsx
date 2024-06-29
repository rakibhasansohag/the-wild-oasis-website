import React, { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

export const revalidate = 3600;
// export const revalidate = 150;

export const metadata = {
  title: "Cabins - The Wild Oasis",
  description: "Learn more about The Wild Oasis cabins",
  openGraph: {
    title: "Cabins - The Wild Oasis",
    description: "Learn more about The Wild Oasis cabins",

    siteName: "The Wild Oasis",
    type: "website",
  },
};

const Page = async ({ searchParams }) => {
  const filter = searchParams?.capacity ?? "all";
  return (
    <div>
      <h1 className="mb-5 text-4xl font-medium text-accent-400">
        Our Luxury Cabins
      </h1>
      <p className="mb-10 text-lg text-primary-200">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      {/* TODO: Add Animations */}
      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
};

export default Page;
