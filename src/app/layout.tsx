import type { Metadata } from "next";
import "@/styles/globals.css";
import QueryProvider from "./providers";

export const metadata: Metadata = {
  title: "GlobalNomad",
  description: "GlobalNomad",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}