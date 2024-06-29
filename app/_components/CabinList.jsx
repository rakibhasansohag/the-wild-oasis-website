import React from "react";
import { unstable_noStore as noStore } from "next/cache";

import CabinCard from "./CabinCard";
import { getCabins } from "@/app/_lib/data-service";
import { notFound } from "next/navigation";

const CabinList = async ({ filter }) => {
  // noStore();

  const cabins = await getCabins();
  //TODO Make a good error message or text with some text to refresh
  if (!cabins.length) {
    // notFound();
    throw new Error("Cabins could not be loaded");
  }
  let displayedCabins;

  if (filter === "all") displayedCabins = cabins;
  if (filter === "small")
    displayedCabins = cabins?.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === "medium")
    displayedCabins = cabins?.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  if (filter === "large")
    displayedCabins = cabins?.filter((cabin) => cabin.maxCapacity >= 8);

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
      {displayedCabins?.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
};

export default CabinList;
