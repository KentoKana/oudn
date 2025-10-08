"use client";
import {useEffect, useState} from "react";
import {Special_Elite} from "next/font/google";
import Container from "@/components/Container";

const headerFont = Special_Elite({
    weight: "400",
});

export default function Banner() {
    const [scrollY, setScrollY] = useState(0);

    // Track scroll for background scaling
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll, {passive: true});
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scale = Math.max(0.5, 1 - scrollY / 1200); // Shrinks to 50% max
    const overlayOpacity = Math.min(1, scrollY / 800); // Black overlay fades in

    // Animate DREAD NOIR letters with diagonal wave
    const text = "DREAD NOIR";
    const [visibleLetters, setVisibleLetters] = useState<boolean[]>(
        Array(text.length).fill(false)
    );

    useEffect(() => {
        const timeoutIds: number[] = [];

        text.split("").forEach((_, i) => {
            const timeout = window.setTimeout(() => {
                setVisibleLetters((prev) => {
                    const copy = [...prev];
                    copy[i] = true;
                    return copy;
                });
            }, i * 100); // stagger: 100ms per letter
            timeoutIds.push(timeout);
        });

        return () => timeoutIds.forEach(clearTimeout);
    }, []);

    return (
        <div className="relative w-screen min-h-screen overflow-hidden bg-black">
            {/* Background image */}
            <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
                style={{
                    backgroundImage:
                        "url('https://www.ilianfilm.com/uploads/1/4/8/2/14825648/sofia-sforza-aep4lybafbs-unsplash_orig.jpg')",
                    transform: `scale(${scale})`,
                    transformOrigin: "center center",
                    transition: "transform 0.1s linear",
                }}
            />

            {/* Black overlay */}
            <div
                className="absolute inset-0 bg-black z-10"
                style={{opacity: overlayOpacity, transition: "opacity 0.1s linear"}}
            />

            {/* Foreground content */}
            <Container>
                <div className="relative z-20 flex flex-col justify-end h-full">
                    <div>
                        <div className="text-white flex flex-col justify-end min-h-[100vh] items-end">
                            <h3 className={"flex items-center text-[1.2em] mb-2"}>
                                <span className={"mr-5"}>Helen Burger Presents: </span>{" "}
                                <span
                                    className="font-primary">Once Upon A Dreadful Night</span>
                            </h3>

                            {/* Cinematic DREAD NOIR */}
                            <h1 className="font-primary text-red-500 text-[7rem] leading-[0.8] flex flex-row flex-wrap">
                                {text.split("").map((letter, i) => (
                                    <span
                                        key={i}
                                        className="inline-block transition-all duration-500 ease-out"
                                        style={{
                                            transform: visibleLetters[i]
                                                ? "translateY(0) translateX(0)"
                                                : `translateY(50px) translateX(${i * 2}px)`,
                                            opacity: visibleLetters[i] ? 1 : 0,
                                        }}
                                    >
      {letter === " " ? "\u00A0" : letter}
    </span>
                                ))}
                            </h1>


                            <h2
                                className="text-[1.5rem] mb-5"
                                style={{fontFamily: headerFont.style.fontFamily}}
                            >
                                October 28th - 30th 2026
                            </h2>
                            <p className="max-w-[500px] bg-red-950/60 p-4">
                                A dark, improvised Eldritch horror set in 1950s New York City, following a
                                troubled detective drawn into a string of inexplicable murders of arcane
                                nature. As the case unfolds, the city itself seems to twist around forbidden
                                knowledge, and the detective is pulled deeper into forces they cannot comprehend.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
