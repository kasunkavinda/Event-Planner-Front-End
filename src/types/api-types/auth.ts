import { z } from "zod";
import { ApiResponse, apiResponseSchema } from "../util-types";

export const LoginResponseSchema = z.object({
  eventPlanner: z.string(),
});

export type Login = z.infer<typeof LoginResponseSchema>;
export type LoginResponse = ApiResponse<Login>;
export const PaginatedLoginResponseSchema =
  apiResponseSchema(LoginResponseSchema);
