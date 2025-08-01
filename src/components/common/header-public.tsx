"use client";
import React from "react";
import Text from "@/components/ui/text";
import Heading from "../ui/heading";
import { useStoredEventPlanner } from "@/hooks/useStoredEventPlanner";
import Button from "../ui/button";
import { useRouter } from "next/navigation";

const HeaderPublic = () => {
  const router = useRouter();
  const eventPlanner = useStoredEventPlanner();

  const loginHandler = () => {
    router.push("/login");
  };
  return (
    <div>
      <div className=" bg-secondary p-2 text-center">
        <Heading align="center">Public Events</Heading>
        <Text align="center">Logged in as: {eventPlanner} </Text>
        <Button className="m-2" onClick={loginHandler}>
          Log In
        </Button>
      </div>
    </div>
  );
};

export default HeaderPublic;
