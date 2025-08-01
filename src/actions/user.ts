"use server";

import { Login } from "@/types/api-types/auth";
import { ApiResponse } from "@/types/util-types";
import { extractFormFields } from "@/util/form";

export async function loginUser(
  prevState: unknown,
  formData: FormData
): Promise<ApiResponse<Login>> {
  const { valid, values } = extractFormFields(formData, ["eventPlanner"]);

  if (!valid) {
    return {
      isSuccess: false,
      data: null,
      message: "Missing or invalid form values.",
    };
  }

  return {
    isSuccess: true,
    data: { eventPlanner: values.eventPlanner },
    message: "User logged in successfully.",
  };
}
