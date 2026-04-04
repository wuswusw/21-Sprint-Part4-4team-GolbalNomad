import type { Metadata } from "next";
import "@/styles/globals.css";
import { pretendard } from "@/lib/fonts";
import { ModalProvider } from "@/components/common/modal/modal-provider";
import QueryProvider from "./providers";

export const metadata: Metadata = {
  title: "GlobalNomad",
  description: "GlobalNomad",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        <QueryProvider>
          <ModalProvider>{children}</ModalProvider>
        </QueryProvider>
      </body>

    </html>
  );
}