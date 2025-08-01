"use client";
import { getEvent, updateEvents } from "@/actions/events";
import Button from "@/components/ui/button";
import FormField from "@/components/ui/input";
import { useStoredEventPlanner } from "@/hooks/useStoredEventPlanner";
import React, { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Event } from "@/types/api-types/event";
import { useRouter } from "next/navigation";

interface UpdateEventFormProps {
  id: string;
}

const UpdateEventForm = ({ id }: UpdateEventFormProps) => {
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [state, formAction, isPending] = useActionState(
    updateEvents,
    undefined
  );

  const eventPlanner = useStoredEventPlanner();

  useEffect(() => {
    if (!state?.isSuccess && state?.message) {
      toast.error(state.message);
    }
  }, [state]);

  useEffect(() => {
    async function fetchEvent() {
      try {
        setLoading(true);
        const eventPlanner = localStorage.getItem("eventPlanner");
        const data = await getEvent(eventPlanner, id);
        if (data.isSuccess) {
          setEvent(data.data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        console.log("err", err);
        setError("Failed to fetch event");
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  useEffect(() => {
    const eventPlanner = localStorage.getItem("eventPlanner");

    if (!eventPlanner) {
      router.push("/login-event-planner");
    }
  }, [router]);
  return (
    <div>
      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-2 gap-2">
          <input type="hidden" name="eventPlanner" value={eventPlanner} />
          <input
            type="hidden"
            name="id"
            value={
              event?.id !== null && event?.id !== undefined ? event.id : ""
            }
          />
          <input type="hidden" name="upTheCount" value={0} />
          <FormField
            label="Event Name"
            id="eventName"
            name="eventName"
            type="text"
            className="my-2"
            required
            defaultValue={event?.eventName}
          />

          <FormField
            name="date"
            type="date"
            dateFormat="DD/MM/YYYY"
            className="w-full"
            label="Date"
            defaultValue={event?.date}
          />

          <FormField
            label="Time"
            id="time"
            name="time"
            type="time"
            className="my-2"
            required
            defaultValue={event?.time}
          />

          <FormField
            label="Location"
            id="location"
            name="location"
            type="text"
            className="my-2"
            required
            defaultValue={event?.location}
          />

          <FormField
            label="Description"
            id="description"
            name="description"
            type="text"
            className="my-2"
            required
            defaultValue={event?.description}
          />

          <FormField
            label="Max RSVP Count"
            id="maxRsvpCount"
            name="maxRsvpCount"
            type="number"
            className="my-2"
            required
            defaultValue={event?.maxRsvpCount}
          />
        </div>
        <div>
          <Button size="medium" className="mx-2" onClick={() => router.back()}>
            Back
          </Button>
          <Button size="medium">Save Event</Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEventForm;
