import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ ...cabin, bookedDates });
  } catch (error) {}
  return Response.json({ error: "Cabin not found" }, { status: 404 });
}

// export async function POST() {}
