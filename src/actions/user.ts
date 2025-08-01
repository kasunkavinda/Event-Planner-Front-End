"use server";

import { LoginEventPlanner, LoginUser } from "@/types/api-types/auth";
import { ApiResponse } from "@/types/util-types";
import { extractFormFields } from "@/util/form";

export async function loginEventPlanner(
  prevState: unknown,
  formData: FormData
): Promise<ApiResponse<LoginEventPlanner>> {
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
    message: "Event planner logged in successfully.",
  };
}

export async function loginUser(
  prevState: unknown,
  formData: FormData
): Promise<ApiResponse<LoginUser>> {
  const { valid, values } = extractFormFields(formData, ["user"]);

  if (!valid) {
    return {
      isSuccess: false,
      data: null,
      message: "Missing or invalid form values.",
    };
  }

  return {
    isSuccess: true,
    data: { user: values.user },
    message: "User logged in successfully.",
  };
}
