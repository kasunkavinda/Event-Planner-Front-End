// Util method to streame line native fetch

export async function fetchWithAuth(
  input: RequestInfo,
  userId: string | null = null,
  init: RequestInit = {}
) {
  const headers = {
    ...init.headers,

    "x-eventplanner": userId || "",
    "Content-Type": "application/json",
  };

  return fetch(input, {
    ...init,
    headers,
  });
}
