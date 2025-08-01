import React from "react";
import UpdateEventForm from "../components/update-event-form";

const UpdateEventPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <div>
      <UpdateEventForm id={id} />
    </div>
  );
};

export default UpdateEventPage;
