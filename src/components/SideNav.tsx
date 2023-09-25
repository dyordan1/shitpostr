"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import {
    closeDrawer,
    getDrawerOpen,
} from "@/store/uiSlice";
import {
    useDispatch, useSelector, 
} from "react-redux";
import {
    Approval, Cookie, Visibility, 
} from "@mui/icons-material";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

const items = [
    {
        label: "Look",
        icon: <Visibility />,
    },
    {
        label: "Make",
        icon: <Cookie />,
    },
    {
        label: "Template",
        icon: <Approval />,
    },
];

export default function SideNav(props: Props) {
    const drawerOpen = useSelector(getDrawerOpen);
    const dispatch = useDispatch();
    const { window } = props;

    const drawer = (
        <div>
            <Toolbar /> {/* This is to push the content below the header */}
            <Divider />
            <List>
                {items.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const container =
      window !== undefined ? () => window().document.body : undefined;

    return (
        <Box
            component="nav"
            sx={{
                width: { md: drawerWidth },
                flexShrink: { md: 0 }, 
            }}
            aria-label="mailbox folders"
        >
            <Drawer
                container={container}
                variant="temporary"
                open={drawerOpen}
                onClose={() => dispatch(closeDrawer())}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: {
                        xs: "block",
                        md: "none", 
                    },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth, 
                    },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: {
                        xs: "none",
                        md: "block", 
                    },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth, 
                    },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
}