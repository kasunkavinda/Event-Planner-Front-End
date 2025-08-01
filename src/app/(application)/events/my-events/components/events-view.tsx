"use client";
import React, { useEffect, useState } from "react";
import EventBox from "@/components/events/event-box";
import { Event } from "@/types/api-types/event";
import Heading from "@/components/ui/heading";
import Text from "@/components/ui/text";
import Button from "@/components/ui/button";
import StyledLink from "@/components/ui/link";
import { useRouter } from "next/navigation";
import { getEvents } from "@/actions/events";
import Link from "next/link";

const EventsView = () => {
  const router = useRouter();
  const [events, setEvents] = useState<Event[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Protecting route. Ideally this should be done with middleware. but since we have to user local storage, we have to do something like this since, middleware is server and localstorage is client side
  useEffect(() => {
    const eventPlanner = localStorage.getItem("eventPlanner");

    if (!eventPlanner) {
      router.push("/login-event-planner");
    }
  }, [router]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const eventPlanner = localStorage.getItem("eventPlanner");
        const data = await getEvents(eventPlanner);
        if (data.isSuccess) {
          setEvents(data.data);
          console.log("data", data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);
  return (
    <>
      <div className="text-center">
        <Heading align="center">My Events</Heading>
        <Link href={"/events/create-events"}>
          <Button className="my-2">Create New Event</Button>
        </Link>
      </div>
      {!error ? (
        <div className="grid grid-cols-2 gap-4">
          {events?.map((event) => (
            <div key={event.id}>
              <EventBox
                id={event.id}
                eventName={event.eventName}
                description={event.description}
                date={event.date}
                time={event.time}
                location={event.location}
                maxRsvpCount={event.maxRsvpCount}
                rsvpCurrentCount={event.rsvpCurrentCount}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <Text align="center" color="white" className="bg-red-700 p-2">
            {error}
          </Text>
        </div>
      )}

      <div className="text-center">
        <StyledLink href="/public-events">Go to Public Events</StyledLink>
      </div>
    </>
  );
};

export default EventsView;
