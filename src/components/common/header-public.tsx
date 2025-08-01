"use client";
import React, { useEffect } from "react";
import Text from "@/components/ui/text";
import Heading from "../ui/heading";
import { useStoredEventPlanner } from "@/hooks/useStoredEventPlanner";
import Button from "../ui/button";
import { useRouter } from "next/navigation";
import { useStoredUser } from "@/hooks/useStoredUser";

const HeaderPublic = () => {
  const router = useRouter();
  const user = useStoredUser();

  const loginHandler = () => {
    router.push("/login-user");
  };

  const logoutHandler = () => {
    localStorage.removeItem("user");
    router.push("/login-user");
  };

  return (
    <div>
      <div className=" bg-secondary p-2 text-center">
        <Heading align="center">Public Events</Heading>
        <Text align="center">Logged in as: {user} </Text>
        {!user ? (
          <Button className="m-2" onClick={loginHandler}>
            Log In
          </Button>
        ) : (
          <Button className="m-2" onClick={logoutHandler}>
            Log Out
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeaderPublic;
