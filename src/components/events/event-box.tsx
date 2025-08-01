"use client";

import { deleteEvents, updateEvents } from "@/actions/events";
import Button from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { useStoredEventPlanner } from "@/hooks/useStoredEventPlanner";
import { useStoredUser } from "@/hooks/useStoredUser";
import Link from "next/link";
import React, { useActionState, useCallback, useEffect, useState } from "react";
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
  rsvpCurrentCount: number;
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
  rsvpCurrentCount,
}: EventBoxProps) => {
  const [hasRsvped, setHasRsvped] = useState(false);
  const [localRsvpCount, setLocalRsvpCount] = useState(rsvpCurrentCount);

  const [deleteEventState, deleteEventFormAction, deleteEventIsPending] =
    useActionState(deleteEvents, undefined);

  const [updateEventState, updateEventFormAction, updateEventIsPending] =
    useActionState(updateEvents, undefined);

  const eventPlanner = useStoredEventPlanner();
  const user = useStoredUser();

  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      const rsvpedFlag =
        localStorage.getItem(`rsvped-${user}-${id}`) === "true";
      setHasRsvped(rsvpedFlag);
    }
  }, [user, id]);
  const isEventFull = rsvpCurrentCount >= maxRsvpCount;

  const handleRsvpSuccess = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`rsvped-${user}-${id}`, "true");
      setHasRsvped(true);
      setLocalRsvpCount((prev) => prev + 1);
    }
  }, [user, id]);
  useEffect(() => {
    if (!deleteEventState?.isSuccess && deleteEventState?.message) {
      toast.error(deleteEventState.message);
    }
  }, [deleteEventState]);

  useEffect(() => {
    if (updateEventState?.isSuccess) {
      handleRsvpSuccess();
    } else if (!updateEventState?.isSuccess && updateEventState?.message) {
      toast.error(updateEventState.message);
    }
  }, [updateEventState, handleRsvpSuccess]);
  return (
    <div className="bg-primary p-4 m-4">
      <Heading>Event Name: {eventName}</Heading>
      <p>Description: {description}</p>
      <p>Date: {date}</p>
      <p>Time: {time}</p>
      <p>Location: {location}</p>
      <p>
        RSVPs: {localRsvpCount}/{maxRsvpCount}
      </p>
      {!publicEvent ? (
        <div className="mt-2 flex">
          <Link href={`/events/update-events/${id}`}>
            <Button className="mr-2">Edit</Button>
          </Link>
          <form action={deleteEventFormAction}>
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="eventPlanner" value={eventPlanner} />
            <Button>Delete</Button>
          </form>
        </div>
      ) : (
        <div className="mt-2 flex">
          <form action={updateEventFormAction}>
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="eventName" value={eventName} />
            <input type="hidden" name="date" value={date} />
            <input type="hidden" name="time" value={time} />
            <input type="hidden" name="location" value={location} />
            <input type="hidden" name="description" value={description} />
            <input type="hidden" name="maxRsvpCount" value={maxRsvpCount} />
            <input type="hidden" name="eventPlanner" value={eventPlanner} />
            <input type="hidden" name="upTheCount" value={1} />

            <Button
              disabled={user && !hasRsvped && !isEventFull ? false : true}
            >
              RSVP
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EventBox;
