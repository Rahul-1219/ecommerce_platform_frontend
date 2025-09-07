import { cookies } from "next/headers";

export const getTokenFromCookies = async (name: string = "token") => {
  const cookieStore = await cookies();
  const token = cookieStore.get(name)?.value;
  return token ? token : null;
};

export const setToken = async (token: string, expiresIn: string) => {
  const cookieStore = await cookies();
  const expirationTime = await getExpirationTime(expiresIn);
  // Set the cookie with 1-day expiration
  cookieStore.set("user-token", token, {
    expires: expirationTime,
    path: "/",
  });
};

export function getExpirationTime(timeStr: string): Date {
  const date = new Date();
  const value = parseInt(timeStr);
  const unit = timeStr.slice(-1);

  switch (unit) {
    case "m":
      date.setMinutes(date.getMinutes() + value);
      break;
    case "h":
      date.setHours(date.getHours() + value);
      break;
    case "d":
      date.setDate(date.getDate() + value);
      break;
    case "y":
      date.setFullYear(date.getFullYear() + value);
      break;
    default:
      date.setDate(date.getDate() + 1);
      break;
  }

  return date;
}

// Util to generate guest session ID
export function generateSessionId() {
  const random = Math.random().toString(36).substring(2, 10);
  const timestamp = Date.now();
  return `guest_${random}_${timestamp}`;
}

// Create session id if not exist
export async function checkAndCreateSessionId() {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get("sessionId")?.value || "";

  if (!sessionId) {
    sessionId = generateSessionId();
    cookieStore.set("sessionId", sessionId, {
      maxAge: 60 * 60 * 24 * 30, // 1 month in seconds
      httpOnly: false,
      secure: false,
      path: "/",
    });
  }

  return sessionId;
}

export const getSessionId = async () => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;
  return sessionId ? sessionId : "";
};
