"use client";

import {
    AppBar, Button, IconButton, Toolbar, Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { toggleDrawer } from "@/store/uiSlice";
import { useDispatch } from "react-redux";

export default function Header() {
    const dispatch = useDispatch();

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
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
}