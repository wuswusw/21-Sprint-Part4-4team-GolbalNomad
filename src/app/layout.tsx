import "@/styles/globals.css";
import { pretendard } from "@/lib/fonts";
import { ModalProvider } from "@/components/common/modal/modal-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        <ModalProvider>{children}</ModalProvider>
      </body>
    </html>
  );
}