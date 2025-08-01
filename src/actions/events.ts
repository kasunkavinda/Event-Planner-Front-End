"use server";
import { API_BASE_URL } from "@/consts/util-consts";
import {
  INVLD_DATA_FRMT_RETURN_FRM_SERVR,
  UNEXPCTD_ERR,
} from "@/errors/errors";
import {
  Event,
  eventResponseSchema,
  PaginatedEventResponseSchema,
} from "@/types/api-types/event";
import { ApiResponse, PaginatedResponse } from "@/types/util-types";
import { fetchWithAuth } from "@/util/auth-server";
import { extractFormFields } from "@/util/form";
import { redirect } from "next/navigation";

export async function getEvents(
  eventPlanner: string | null
): Promise<PaginatedResponse<Event>> {
  try {
    const response = await fetchWithAuth(
      `${API_BASE_URL}/events`,
      eventPlanner,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return {
        isSuccess: response.ok,
        data: null,
        message: response.statusText,
        page: null,
        pageSize: null,
        totalPages: null,
        totalCount: null,
      };
    }

    const json = await response.json();

    const parsed = PaginatedEventResponseSchema.safeParse(json);

    if (!parsed.success) {
      return {
        isSuccess: parsed.success,
        data: null,
        message: INVLD_DATA_FRMT_RETURN_FRM_SERVR,
        page: null,
        pageSize: null,
        totalPages: null,
        totalCount: null,
      };
    }

    const { data, page, pageSize, totalPages, totalCount, isSuccess, message } =
      parsed.data;

    return {
      isSuccess,
      data,
      message,
      page,
      pageSize,
      totalPages,
      totalCount,
    };
  } catch (err) {
    console.error(err);
    return {
      isSuccess: false,
      data: null,
      message: err instanceof Error ? err.message : UNEXPCTD_ERR,
      page: null,
      pageSize: null,
      totalPages: null,
      totalCount: null,
    };
  }
}

export async function getEvent(
  eventPlanner: string | null,
  id: string
): Promise<ApiResponse<Event>> {
  try {
    const response = await fetchWithAuth(
      `${API_BASE_URL}/events/${id}`,
      eventPlanner,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return {
        isSuccess: response.ok,
        data: null,
        message: response.statusText,
      };
    }

    const json = await response.json();

    const parsed = eventResponseSchema.safeParse(json);

    if (!parsed.success) {
      return {
        isSuccess: parsed.success,
        data: null,
        message: INVLD_DATA_FRMT_RETURN_FRM_SERVR,
      };
    }

    const { data, isSuccess, message } = parsed.data;

    return {
      isSuccess,
      data,
      message,
    };
  } catch (err) {
    console.error(err);
    return {
      isSuccess: false,
      data: null,
      message: err instanceof Error ? err.message : UNEXPCTD_ERR,
    };
  }
}

export async function createEvents(
  prevState: unknown,
  formData: FormData
): Promise<ApiResponse<Event>> {
  const { valid, values } = extractFormFields(formData, [
    "eventPlanner",
    "eventName",
    "date",
    "time",
    "location",
    "description",
    "maxRsvpCount",
  ]);

  if (!valid) {
    return {
      isSuccess: false,
      data: null,
      message: "Missing or invalid form values.",
    };
  }

  try {
    const response = await fetchWithAuth(
      `${API_BASE_URL}/events`,
      values.eventPlanner,
      {
        method: "POST",
        body: JSON.stringify(values),
      }
    );

    if (!response.ok) {
      return {
        isSuccess: response.ok,
        data: null,
        message: response.statusText,
      };
    }

    const json: ApiResponse<Event> = await response.json();
    const parsed = eventResponseSchema.safeParse(json);

    if (!parsed.success) {
      return {
        isSuccess: parsed.success,
        data: null,
        message: json.message || INVLD_DATA_FRMT_RETURN_FRM_SERVR,
      };
    }

    const { data, isSuccess, message } = parsed.data;
  } catch (err) {
    console.error(err);
    return {
      isSuccess: false,
      data: null,
      message: err instanceof Error ? err.message : UNEXPCTD_ERR,
    };
  }
  redirect("/events/my-events");
}

export async function updateEvents(
  prevState: unknown,
  formData: FormData
): Promise<ApiResponse<Event>> {
  const { valid, values } = extractFormFields(formData, [
    "id",
    "eventPlanner",
    "eventName",
    "date",
    "time",
    "location",
    "description",
    "maxRsvpCount",
  ]);

  if (!valid) {
    return {
      isSuccess: false,
      data: null,
      message: "Missing or invalid form values.",
    };
  }

  try {
    const response = await fetchWithAuth(
      `${API_BASE_URL}/events/${values.id}`,
      values.eventPlanner,
      {
        method: "PUT",
        body: JSON.stringify(values),
      }
    );

    if (!response.ok) {
      return {
        isSuccess: response.ok,
        data: null,
        message: response.statusText,
      };
    }

    const json: ApiResponse<Event> = await response.json();
    const parsed = eventResponseSchema.safeParse(json);

    if (!parsed.success) {
      return {
        isSuccess: parsed.success,
        data: null,
        message: json.message || INVLD_DATA_FRMT_RETURN_FRM_SERVR,
      };
    }

    const { data, isSuccess, message } = parsed.data;
  } catch (err) {
    console.error(err);
    return {
      isSuccess: false,
      data: null,
      message: err instanceof Error ? err.message : UNEXPCTD_ERR,
    };
  }
  redirect("/events/my-events");
}

export async function deleteEvents(
  prevState: unknown,
  formData: FormData
): Promise<ApiResponse<Event>> {
  const { valid, values } = extractFormFields(formData, ["id", "eventPlanner"]);

  if (!valid) {
    return {
      isSuccess: false,
      data: null,
      message: "Missing or invalid form values.",
    };
  }

  try {
    const response = await fetchWithAuth(
      `${API_BASE_URL}/events/${values.id}`,
      values.eventPlanner,
      {
        method: "DELETE",
        body: JSON.stringify(values),
      }
    );

    if (!response.ok) {
      return {
        isSuccess: response.ok,
        data: null,
        message: response.statusText,
      };
    }

    const json: ApiResponse<Event> = await response.json();
    const parsed = eventResponseSchema.safeParse(json);

    if (!parsed.success) {
      return {
        isSuccess: parsed.success,
        data: null,
        message: json.message || INVLD_DATA_FRMT_RETURN_FRM_SERVR,
      };
    }

    const { data, isSuccess, message } = parsed.data;
  } catch (err) {
    console.error(err);
    return {
      isSuccess: false,
      data: null,
      message: err instanceof Error ? err.message : UNEXPCTD_ERR,
    };
  }
  redirect("/events/my-events");
}

export async function getPubliclyAvailableEvents(): Promise<
  PaginatedResponse<Event>
> {
  try {
    const response = await fetchWithAuth(
      `${API_BASE_URL}/events/publicly-available-events`,
      null,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return {
        isSuccess: response.ok,
        data: null,
        message: response.statusText,
        page: null,
        pageSize: null,
        totalPages: null,
        totalCount: null,
      };
    }

    const json = await response.json();

    const parsed = PaginatedEventResponseSchema.safeParse(json);

    if (!parsed.success) {
      return {
        isSuccess: parsed.success,
        data: null,
        message: INVLD_DATA_FRMT_RETURN_FRM_SERVR,
        page: null,
        pageSize: null,
        totalPages: null,
        totalCount: null,
      };
    }

    const { data, page, pageSize, totalPages, totalCount, isSuccess, message } =
      parsed.data;

    return {
      isSuccess,
      data,
      message,
      page,
      pageSize,
      totalPages,
      totalCount,
    };
  } catch (err) {
    console.error(err);
    return {
      isSuccess: false,
      data: null,
      message: err instanceof Error ? err.message : UNEXPCTD_ERR,
      page: null,
      pageSize: null,
      totalPages: null,
      totalCount: null,
    };
  }
}
