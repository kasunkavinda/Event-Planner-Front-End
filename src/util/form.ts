export function extractFormFields<T extends readonly string[]>(
  formData: FormData,
  keys: T
): { valid: boolean; values: Record<T[number], string> } {
  const values = {} as Record<T[number], string>;
  let valid = true;

  for (const key of keys) {
    const value = formData.get(key);
    if (typeof value !== "string") {
      valid = false;
    } else {
      values[key as T[number]] = value;
    }
  }

  return { valid, values };
}
