"use client";
import { createEvents } from "@/actions/events";
import Button from "@/components/ui/button";
import FormField from "@/components/ui/input";
import { useStoredEventPlanner } from "@/hooks/useStoredEventPlanner";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

const CreateEventForm = () => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    createEvents,
    undefined
  );

  const eventPlanner = useStoredEventPlanner();

  useEffect(() => {
    if (!state?.isSuccess && state?.message) {
      toast.error(state.message);
    }
  }, [state]);

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
          <FormField
            label="Event Name"
            id="eventName"
            name="eventName"
            type="text"
            className="my-2"
            required
          />

          <FormField
            name="date"
            type="date"
            // placeholder="Date"
            // value={selectedMinDate}
            // onChange={(e) => setSelectedMinDate(e.target.value)}
            // maxDate={selectedMaxDate || getTodayFormatted()}
            dateFormat="DD/MM/YYYY"
            className="w-full"
            label="Date"
            // disabled={isPending}
          />

          <FormField
            label="Time"
            id="time"
            name="time"
            type="time"
            className="my-2"
            required
          />

          <FormField
            label="Location"
            id="location"
            name="location"
            type="text"
            className="my-2"
            required
          />

          <FormField
            label="Description"
            id="description"
            name="description"
            type="text"
            className="my-2"
            required
          />

          <FormField
            label="Max RSVP Count"
            id="maxRsvpCount"
            name="maxRsvpCount"
            type="number"
            className="my-2"
            required
          />
        </div>
        <div>
          <Button
            size="medium"
            className="mx-2"
            onClick={() => router.back()}
            // disabled={isPending}

            // isPending={isPending}
          >
            Back
          </Button>
          <Button
            size="medium"
            // disabled={isPending}

            // isPending={isPending}
          >
            Save Event
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;
