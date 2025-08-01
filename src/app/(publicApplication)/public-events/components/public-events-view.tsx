"use client";
import React, { useEffect, useState } from "react";
import EventBox from "@/components/events/event-box";
import { Event } from "@/types/api-types/event";
import Heading from "@/components/ui/heading";
import Text from "@/components/ui/text";
import { useRouter } from "next/navigation";
import { getPubliclyAvailableEvents } from "@/actions/events";

const PublicEventsView = () => {
  const router = useRouter();
  const [events, setEvents] = useState<Event[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Protecting route. Ideally this should be done with middleware. but since we have to user local storage, we have to do something like this since, middleware is server and localstorage is client side
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.push("/public-events");
    }
  }, [router]);

  useEffect(() => {
    async function fetchPublicEvents() {
      try {
        setLoading(true);

        const data = await getPubliclyAvailableEvents();
        if (data.isSuccess) {
          setEvents(data.data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        console.log("error", err);
        setError("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    }

    fetchPublicEvents();
  }, []);
  return (
    <>
      <div className="text-center">
        <Heading align="center">Public Events</Heading>
      </div>
      {!error ? (
        <div className="grid grid-cols-2 gap-4">
          {events?.map((event) => (
            <div key={event.id}>
              <EventBox
                publicEvent={true}
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
    </>
  );
};

export default PublicEventsView;
