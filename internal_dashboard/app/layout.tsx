import type { Metadata } from "next";
import "./globals.css";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import ThemeProviderClient from "@/components/ThemeProviderClient";

import QueryProvider from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "Internal Dashboard",
  description: "Stock Broker Internal Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProviderClient>
            <QueryProvider>{children}</QueryProvider>
          </ThemeProviderClient>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
