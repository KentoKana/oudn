"use client";
import {useEffect, useRef, useState} from "react";
import Container from "@/components/Container";
import {PrimaryHeading} from "@/components/PrimaryHeading";

export default function About() {
    const [scrollY, setScrollY] = useState(0);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const scrollProgress = Math.min(
                1,
                Math.max(0, 1 - rect.top / windowHeight)
            );
            setScrollY(scrollProgress);
        };

        window.addEventListener("scroll", handleScroll, {passive: true});
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const numCols = 4;
    const colWidth = 100 / numCols;

    // Stagger: leftmost column starts first
    const startOffsets = [0, 0.1, 0.2, 0.3];

    // Exaggerated translation distances for stronger visual stagger
    const translateMultipliers = [100, 200, 300, 400]; // left → right

    const getOffsetProgress = (index: number) => {
        const scaledScroll = Math.min(scrollY * 1.1, 1);
        const progress = (scaledScroll - startOffsets[index]) / (1 - startOffsets[index]);
        return Math.max(0, Math.min(1, progress));
    };

    return (
        <div
            ref={sectionRef}
            className="relative bg-black text-white overflow-hidden min-h-screen flex items-center justify-center"
        >
            {/* Background Columns */}
            <div className="absolute inset-0 pointer-events-none flex">
                {[...Array(numCols)].map((_, i) => {
                    const progress = getOffsetProgress(i);
                    const translate = (1 - progress) * translateMultipliers[i];
                    return (
                        <div
                            key={`col-${i}`}
                            className="absolute bottom-0 w-[25%]"
                            style={{
                                left: `${i * colWidth}%`,
                                height: "100%",
                                backgroundColor: "#7a0000",
                                transform: `translateY(${translate}%)`,
                            }}
                        />
                    );
                })}

                {/* Vertical borders between columns */}
                {[...Array(numCols - 1)].map((_, i) => (
                    <div
                        key={`border-${i}`}
                        className="absolute top-0 h-full w-[2px] bg-black"
                        style={{
                            left: `${(i + 1) * colWidth}%`,
                        }}
                    />
                ))}
            </div>

            {/* Foreground Content */}
            <Container className="relative z-10 pt-32 leading-[1.6] text-2xl">
                <div className="flex gap-20">
                    <div
                        className="w-1/3 transition-transform duration-500 ease-out"
                        style={{
                            transform: `translateX(${(1 - scrollY) * -100}px)`,
                        }}
                    >
                        <PrimaryHeading>
                            What is <em>"Once Upon A Dreadful Night"</em>?
                        </PrimaryHeading>
                    </div>
                    <div
                        className="w-2/3 transition-transform duration-500 ease-out"
                        style={{
                            transform: `translateX(${(1 - scrollY) * 100}px)`,
                        }}
                    >
                        <p className="mb-10">
                            <em>"Once Upon A Dreadful Night"</em> is an improvised theater
                            production inspired by the tabletop RPG{" "}
                            <em>
                                <a
                                    target="_blank"
                                    href="https://www.tiltingatwindmills.net/games/dread/"
                                    className="underline hover:text-red-700 transition-all duration-200"
                                >
                                    Dread
                                </a>
                            </em>.
                        </p>
                        <p className="mb-10">
                            The rules of Dread are simple: whenever a player attempts a risky
                            action, they must pull a block from a Jenga tower. Success means
                            they survive… for now. Failure, however, spells doom—their
                            character meets a grisly, unforgettable end.
                        </p>
                        <p className="mb-10">
                            In each performance, the Game Master (GM) guides the players into
                            a new, shadowed world steeped in despair. Together, the players
                            navigate this grim landscape, weaving a haunting tale of how their
                            characters confront dread, danger, and the unknown.
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
}
