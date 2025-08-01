import { z } from "zod";
import {
  paginatedResponseSchema,
  PaginatedResponse,
  ApiResponse,
  apiResponseSchema,
} from "../util-types";

export const EventSchema = z.object({
  id: z.string(),
  eventPlanner: z.string(),
  eventName: z.string(),
  date: z.string(),
  time: z.string(),
  location: z.string(),
  description: z.string(),
  maxRsvpCount: z.number(),
  rsvpCurrentCount: z.number(),
});

export type Event = z.infer<typeof EventSchema>;
export type PaginatedEventResponse = PaginatedResponse<Event>;
export const PaginatedEventResponseSchema =
  paginatedResponseSchema(EventSchema);

export type EventResponse = ApiResponse<Event>;
export const eventResponseSchema = apiResponseSchema(EventSchema);
