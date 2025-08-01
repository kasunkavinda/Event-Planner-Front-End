export function formatUpdatedDate(
  dateString: string,
  onlyDate = false
): string {
  if (dateString === "0001-01-01T00:00:00") {
    return "Not Updated";
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const options: Intl.DateTimeFormatOptions = onlyDate
    ? { year: "numeric", month: "long", day: "numeric" }
    : {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };

  return date.toLocaleDateString("en-US", options);
}

export function formatDateConsistent(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  // Use explicit locale and options to ensure consistency between server and client
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export const formatDate = (dateString: string | null): string => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatDateTime = (dateString: string | null): string => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const truncateText = (
  text: string | null | undefined, // Allow null or undefined
  maxWords: number
): { truncated: string; isTruncated: boolean } => {
  if (!text) {
    return { truncated: "", isTruncated: false }; // Return empty string or a default value
  }

  const words = text.split(" ");
  if (words.length > maxWords) {
    return {
      truncated: words?.slice(0, maxWords).join(" ") + "...",
      isTruncated: true,
    };
  }
  return { truncated: text, isTruncated: false };
};

export function classNames(
  ...classes: (string | undefined | null | false)[]
): string {
  return classes.filter(Boolean).join(" ");
}

export function toCents(amount: number) {
  return Math.round(amount * 100);
}

export const formatNumber = (value: number | undefined) =>
  value !== undefined ? value.toFixed(2) : "";

export const roomStatuses: Record<number, { color: string; label: string }> = {
  1: { color: "#00FF00", label: "Available" },
  2: { color: "#FF0000", label: "Dirty" },
  3: { color: "#FFFF00", label: "Occupied" },
  4: { color: "#B0ABA5", label: "Invalid Room" },
};

export const transformKeyToCode = (arr: { key: string; value: string }[]) =>
  arr.map(({ key, value }) => ({ code: key, value }));
