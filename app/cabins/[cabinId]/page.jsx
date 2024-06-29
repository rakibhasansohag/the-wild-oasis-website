import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";

import { Suspense } from "react";

// export const metadata = {
//     title : ''
// }

export const generateMetadata = async ({ params }) => {
  const { name } = await getCabin(params?.cabinId);

  return {
    title: `Cabin ${name} `,
    description: `This Is a nice Cabin In Our amazing The Wild Oasis`,
    openGraph: {
      title: `Cabin ${name} `,
      description: `This Is a nice Cabin In Our amazing The Wild Oasis`,
      siteName: "The Wild Oasis",
      type: "website",
    },
  };
};

export async function generateStaticParams() {
  const cabins = await getCabins();

  const idx = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
  return idx;
}

export default async function Page({ params }) {
  const cabin = await getCabin(params?.cabinId);
  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(params.cabinId);

  // Promise.all([settings, bookedDates]).then((values) => {
  //   const [settings, bookedDates] = values;

  //   console.log({ settings, bookedDates });
  // });

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="mb-10 text-5xl font-semibold text-center text-accent-400">
          Reserve {cabin?.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
