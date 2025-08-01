import { z } from "zod";
import { ApiResponse, apiResponseSchema } from "../util-types";

export const LoginEventPlannerResponseSchema = z.object({
  eventPlanner: z.string(),
});

export type LoginEventPlanner = z.infer<typeof LoginEventPlannerResponseSchema>;
export type LoginEventPlannerResponse = ApiResponse<LoginEventPlanner>;
export const PaginatedLoginEventPlannerResponseSchema = apiResponseSchema(
  LoginEventPlannerResponseSchema
);

export const LoginUserResponseSchema = z.object({
  user: z.string(),
});

export type LoginUser = z.infer<typeof LoginUserResponseSchema>;
export type LoginUserResponse = ApiResponse<LoginUser>;
export const PaginatedLoginUserResponseSchema = apiResponseSchema(
  LoginUserResponseSchema
);
