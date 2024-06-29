"use server";

import { revalidatePath } from "next/cache";
import { signOut, signIn, auth } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export const signInAction = async () => {
  await signIn("google", { redirectTo: "/account" });
};

export const signOutAction = async () => {
  await signOut({ redirectTo: "/" });
};

export async function updateGuestAction(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in to update your profile");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  if (!/^[a-zA-z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please enter a valid national ID");

  const updateData = { nationalID, nationality, countryFlag };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session?.user?.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
  // return data;
}

export async function deleteReservationAction(bookingId) {
  await new Promise((res) => setTimeout(res, 2000));

  const session = await auth();

  if (!session)
    throw new Error("You must be logged in to delete a reservation");

  const guestBookings = await getBookings(session?.user?.guestId);
  const guestBookingIdx = guestBookings.map((booking) => booking.id);

  if (!guestBookingIdx.includes(bookingId))
    throw new Error("You can only delete your own reservations");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function updateBookingAction(formData) {
  const bookingId = Number(formData.get("bookingId"));
  // Point: 1) Authentication check
  const session = await auth();
  if (!session) throw new Error("You must be logged in to update your booking");

  // Point: 2) Validate booking id / Authorization check
  const guestBookings = await getBookings(session?.user?.guestId);
  const guestBookingIdx = guestBookings.map((booking) => booking.id);
  if (!guestBookingIdx.includes(bookingId))
    throw new Error("You can only update your own booking");

  // Point: 3) Update booking
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  // Point: 4) Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  // Point: 5) Error handling
  if (error) throw new Error("Booking could not be updated");

  // Point: 6) Revalidation
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  // Point: 7) Redirecting
  redirect("/account/reservations");
}

export async function createBookingAction(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("you must be logged in ");

  const newBooking = {
    ...bookingData,
    guestId: session?.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extraPrice: 0,
    totalPrice: bookingData?.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);
  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}
