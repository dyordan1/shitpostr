"use client";

import {
    AppBar, Button, IconButton, Toolbar, Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { toggleDrawer } from "@/store/uiSlice";
import { useDispatch } from "react-redux";
import {
    signIn, signOut, useSession, 
} from "next-auth/react";

export default function Header() {
    const dispatch = useDispatch();
    const {
        data: session, status, 
    } = useSession();

    return (
        <AppBar position="fixed" sx={{ zIndex: 9999 }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={() => dispatch(toggleDrawer())}
                    sx={{
                        mr: 2,
                        display: { md: "none" }, 
                    }}
                >
                    <Menu />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Shitpostr
                </Typography>
                {status === "authenticated"
                    ? <Button onClick={() => signOut()} color="inherit">
                        Logout
                    </Button>
                    : <Button onClick={() => signIn()} color="inherit">
                        Login
                    </Button>}
                <div>
                    {status === "authenticated" && session.user?.name}
                </div>
            </Toolbar>
        </AppBar>
    );
}