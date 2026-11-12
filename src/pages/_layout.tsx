// oxlint-disable-next-line import/no-relative-parent-imports
import "../styles.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import type { ReactNode } from "react";

import { ThemeProvider } from "@/components/theme-provider";

interface RootLayoutProps {
  children: ReactNode;
}

// The homepage owns its full-bleed layout; the reading column + footer live in writing/_layout.
const RootLayout = ({ children }: RootLayoutProps) => (
  <body>
    <Analytics />
    <SpeedInsights />
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  </body>
);

export default RootLayout;

export const getConfig = () => ({
  render: "static",
});
