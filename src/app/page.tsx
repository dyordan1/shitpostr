"use client";

import {
    Box, Toolbar, 
} from "@mui/material";
import ClientWrap from "@/components/ClientWrap";
import Header from "@/components/Header";
import MemeGallery from "@/components/MemeGallery";
import SideNav from "@/components/SideNav";

export default function Home() {
    return (
        <ClientWrap>
            <Header />
            <Toolbar /> {/* This is to push the content below the header */}
            <Box sx={{ display: "flex" }}>
                <SideNav />
                <MemeGallery />
            </Box>
        </ClientWrap>
    );
}
