"use client";
import { Inter } from "next/font/google";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Direction,
  Shadows,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { configTheme } from "@/app/utils/theme/Theme";
import { NextAppDirEmotionCacheProvider } from "@/app/utils/theme/EmotionCache";
import "@/utils/i18n";

const inter = Inter({ subsets: ["latin"] });

const MyApp = ({ children }: { children: React.ReactNode }) => {
  const theme = configTheme();
  return (
    <>
      <NextAppDirEmotionCacheProvider options={{ key: "modernize" }}>
        <ThemeProvider
          theme={createTheme({
            direction: theme.defaultTheme.direction as Direction,
            palette: theme.defaultTheme.palette,
            typography: theme.baseMode.typography,
            shadows: theme.baseMode.shadows as Shadows,
            shape: {
              borderRadius: theme.baseMode.shape.borderRadius,
            },
          })}
        >
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {children}
        </ThemeProvider>
      </NextAppDirEmotionCacheProvider>
      x
    </>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MyApp>{children}</MyApp>
      </body>
    </html>
  );
}
