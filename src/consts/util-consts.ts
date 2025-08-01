export const DEFAULT_CURRENCY = "$";
export const PAGE_LIMIT = 10;
export const API_BASE_URL = `${process.env.API_BASE_URL}`;

export const CUSTOMER_TYPES = {
  MEMBER: "MEMBER",
  NON_MEMBER: "NON_MEMBER",
  STAFF: "STAFF",
  ADMIN_USER: "ADMIN_USER",
};

export const CART_TYPES = {
  PRODUCT: "product",
  ROOM: "room",
  LOCKER: "locker",
};

export const MASTER_KEY = {
  LOCKER_TYPES: "lockertypes",
  ROOM_TYPES: "roomtypes",
  ROOM_STATUS: "roomstatus",
  LOCKER_STATUS: "lockerstatus",
};

//CSS Consts
export const disabledStyle =
  "opacity-50 pointer-events-none cursor-not-allowed";

export const baseTabClass = "px-6 py-4 focus-visible:outline-none";
export const selectedClass =
  "border-b-2 font-semibold bg-complementary text-black";
export const unselectedClass = "text-muted-foreground";

export const backdropCss =
  "fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center";

export const roomStatusColors: Record<string, string> = {
  "in service": "bg-green-600",
  "out of service": "bg-gray-500",
  occupied: "bg-red-600",
  available: "bg-green-400",
  "dirty room": "bg-yellow-600",
  "clean room": "bg-blue-500",
};

export const lockerStatusColors: Record<string, string> = {
  available: "bg-green-400",
  "not available": "bg-red-600",
};
