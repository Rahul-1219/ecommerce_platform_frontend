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

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
// .eyJ1c2VySWQiOiI2ODU2YmViYmRiYmNjMzMxMmIzODgyMTkiLCJpYXQiOjE3NTExOTM2NzAsImV4cCI6MTc1MTE5Mzk3MH0
// .QgYbG7gexawBD - Nh1Fc9mYy6ClGKyNwWWermXCC6BFs;

function getExpirationTime(timeStr: string): Date {
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
