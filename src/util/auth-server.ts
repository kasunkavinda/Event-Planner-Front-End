export async function fetchWithAuth(
  input: RequestInfo,
  userId: string | null = null, // Accept the token as a parameter
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
