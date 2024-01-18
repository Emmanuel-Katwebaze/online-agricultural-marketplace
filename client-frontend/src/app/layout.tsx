import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import App from "@/components/App";
import { StoreProvider } from "../../redux/storeProvide";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agricultural Marketplace",
  description: "An online marketplace for all your agric product needs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <App>{children}</App>
        </StoreProvider>
      </body>
    </html>
  );
}
