import { Footer } from "@/components/user/footer";
import Header from "@/components/user/header";
import { UserStoreProvider } from "@/context/user-store";
import type { Metadata } from "next";
import { getUserProfile } from "./action";

export const metadata: Metadata = {
  title: "Trendly",
};

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get user profile data
  const response = await getUserProfile();
  const userProfile = response?.data;
  return (
    <UserStoreProvider initialUser={userProfile}>
      <Header />
      <main className="flex-grow w-full overflow-x-hidden pt-16">
        {children}
      </main>
      <Footer />
    </UserStoreProvider>
  );
}
