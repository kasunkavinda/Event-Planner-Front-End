"use client";
import { loginUser } from "@/actions/user";
import Button from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import FormField from "@/components/ui/input";

import { useRouter } from "next/navigation";

import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

export default function LoginUserPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(loginUser, undefined);

  useEffect(() => {
    if (!state?.isSuccess && state?.message) {
      toast.error(state.message);
    }
    if (state?.isSuccess && state.data) {
      localStorage.setItem("user", state.data.user.toLocaleLowerCase());
      router.push("/public-events");
    }
  }, [state, router]);
  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center py-12 px-3 sm:px-6 overflow-hidden ">
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 z-20">
          <div className="sm:mx-auto sm:w-full sm:max-w-md"></div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-secondary px-6 py-12 shadow-sm rounded-lg sm:px-12">
              <Heading align="center" className="mb-6">
                Public Events
              </Heading>
              <form action={formAction} className="space-y-6">
                <FormField
                  label="User name"
                  id="user"
                  name="user"
                  type="text"
                  className="my-2"
                  required
                />

                <div className="text-center">
                  <Button size="medium">Sign In</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
