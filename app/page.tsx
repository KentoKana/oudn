"use client";
import {useEffect, useState} from "react";
import Banner from "@/shows/Dread Noir/Banner";
import About from "@/components/HomePage/About";
import Cast from "@/components/HomePage/Cast";

export default function Home() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll, {passive: true});
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Subtle scale: 0.98 -> 1.0 over 2000px scroll
    const cardScale = Math.min(1, 0.98 + scrollY / 10000);

    return (
        <main>
            {/* Banner */}
            <Banner/>
            <About/>
            <Cast/>
        </main>
    );
}
