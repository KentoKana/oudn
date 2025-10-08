"use client";
import Link from "next/link";
import {useEffect, useLayoutEffect, useRef, useState} from "react";

export const NavigationBar = () => {
    const [atTop, setAtTop] = useState(true);
    const [widths, setWidths] = useState<number[]>([]);
    const extraRefs = useRef<HTMLSpanElement[]>([]);

    // Track scroll
    useEffect(() => {
        const handleScroll = () => setAtTop(window.scrollY === 0);
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const parts = [
        {first: "O", extra: "nce "},
        {first: "U", extra: "pon "},
        {first: "A", extra: " ", hideInitial: true},
        {first: "D", extra: "readful "},
        {first: "N", extra: "ight"},
    ];

    // Measure widths after initial render
    useLayoutEffect(() => {
        const newWidths = extraRefs.current.map((el) => el?.scrollWidth || 0);
        setWidths(newWidths);
    }, []);

    return (
        <nav
            className={`text-[1.3em] transition-colors duration-500 fixed top-0 w-full z-50 py-3 ${
                atTop ? "bg-transparent text-white" : "bg-black/80 backdrop-blur-sm text-white"
            }`}
        >
            <div className="font-primary max-w-[1200px] flex mx-auto">
                <div className="flex justify-between items-center w-full">

                    {/* Title */}
                    <div className="relative w-full h-10 font-bold whitespace-nowrap flex items-center">
                        <Link href="/" className="inline-block px-5">
                            <div className="inline-flex">
                                {parts.map((part, i) => (
                                    <span key={i} className="inline-flex">
                    {/* First letter stays fixed */}
                                        <span>{!atTop && part.hideInitial ? "" : part.first}</span>

                                        {/* Extra text collapses smoothly */}
                                        {part.extra && (
                                            <span
                                                ref={(el) => {
                                                    if (el) extraRefs.current[i] = el;
                                                }}
                                                style={{
                                                    display: "inline-block",
                                                    overflow: "hidden",
                                                    whiteSpace: "pre",
                                                    maxWidth: atTop
                                                        ? widths[i] !== undefined
                                                            ? `${widths[i]}px`
                                                            : "auto"
                                                        : 0,
                                                    transition: "max-width 0.3s ease",
                                                }}
                                            >
                        {part.extra}
                      </span>
                                        )}
                  </span>
                                ))}
                            </div>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <div className="flex tracking-wide">
                        <Link href="#about" className="hover:text-gray-300 transition-colors px-5">
                            About
                        </Link>
                        <Link href="#settings" className="hover:text-gray-300 transition-colors px-5">
                            Settings
                        </Link>
                        <Link href="#concepts" className="hover:text-gray-300 transition-colors px-5">
                            Concepts
                        </Link>
                    </div>

                </div>
            </div>
        </nav>
    );
};
