"use client";
import React from "react";
import Text from "@/components/ui/text";
import Heading from "../ui/heading";
import { useStoredEventPlanner } from "@/hooks/useStoredEventPlanner";
import Button from "../ui/button";
import { useRouter } from "next/navigation";

const HeaderPrivate = () => {
  const router = useRouter();
  const eventPlanner = useStoredEventPlanner();

  const logoutHandler = () => {
    localStorage.removeItem("eventPlanner");
    router.push("/login");
  };
  return (
    <div>
      <div className=" bg-secondary p-2 text-center">
        <Heading align="center">Event Planner</Heading>
        <Text align="center">Logged in as: {eventPlanner} </Text>
        <Button className="m-2" onClick={logoutHandler}>
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default HeaderPrivate;
