import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trendly | Dashboard",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
