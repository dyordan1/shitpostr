"use client";

import * as React from "react";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import createEmotionCache from "@/shared/emotionCache";
import theme from "@/shared/theme";

const cache = createEmotionCache();

type Props = {
    children: React.ReactNode;
  }

export default function ClientWrap({ children } : Props) {
    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </CacheProvider>
    );
}