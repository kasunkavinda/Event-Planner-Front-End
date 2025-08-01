import { z } from "zod";

export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export type PaginationProp = {
  page: number;
};

// export type ActionReturnType<T> = {
//   success: boolean;
//   data: T | null;
//   message: string;
// };

export type PaginatedResponse<T> = {
  isSuccess: boolean;
  data: T[] | null;
  message: string | null;
  page: number | null;
  pageSize: number | null;
  totalPages: number | null;
  totalCount: number | null;
};

export type ApiResponse<T> = {
  isSuccess: boolean;
  data: T | null;
  message: string | null;
};

export const paginatedResponseSchema = <T extends z.ZodTypeAny>(
  itemSchema: T
) =>
  z.object({
    isSuccess: z.boolean(),
    data: z.array(itemSchema),
    message: z.string().nullable(),
    page: z.number(),
    pageSize: z.number().nullable(),
    totalPages: z.number().nullable(),
    totalCount: z.number().nullable(),
  });

export const apiResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    isSuccess: z.boolean(),
    data: itemSchema,
    message: z.string().nullable(),
  });
