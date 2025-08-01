"use client";

import { deleteEvents } from "@/actions/events";
import Button from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { useStoredEventPlanner } from "@/hooks/useStoredEventPlanner";
import Link from "next/link";
import React, { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

interface EventBoxProps {
  publicEvent?: boolean;
  id: string;
  eventName: string;
  date: string;
  time: string;
  location: string;
  description: string;
  maxRsvpCount: number;
}
const EventBox = ({
  publicEvent = false,
  id,
  eventName,
  date,
  time,
  location,
  maxRsvpCount,
  description,
}: EventBoxProps) => {
  const [state, formAction, isPending] = useActionState(
    deleteEvents,
    undefined
  );

  const eventPlanner = useStoredEventPlanner();

  useEffect(() => {
    if (!state?.isSuccess && state?.message) {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <div className="bg-primary p-4 m-4">
      <Heading>Event Name: {eventName}</Heading>
      <p>Description: {description}</p>
      <p>Date: {date}</p>
      <p>Time: {time}</p>
      <p>Location: {location}</p>
      <p>RSVPs: {maxRsvpCount}</p>
      {!publicEvent ? (
        <div className="mt-2 flex">
          <Link href={`/events/update-events/${id}`}>
            <Button className="mr-2">Edit</Button>
          </Link>
          <form action={formAction}>
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="eventPlanner" value={eventPlanner} />
            <Button>Delete</Button>
          </form>
        </div>
      ) : (
        <div className="mt-2 flex">
          <form action={formAction}>
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="eventPlanner" value={eventPlanner} />
            <Button>RSVP</Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EventBox;
