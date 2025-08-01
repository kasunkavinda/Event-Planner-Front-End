import React, { Suspense } from "react";
import EventsView from "./components/events-view";

const MyEventsPage = async () => {
  return (
    <div>
      <EventsView />
    </div>
  );
};

export default MyEventsPage;
