// oxlint-disable-next-line import/no-relative-parent-imports
import "../styles.css";
import type { ReactNode } from "react";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <body className="m-auto max-w-2xl">
      <Analytics />
      <SpeedInsights />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <main className="min-h-screen p-6 pt-3 md:pt-6">
          {children}
          <Footer />
        </main>
      </ThemeProvider>
    </body>
  );
}

export const getConfig = () => ({
  render: "static",
});
