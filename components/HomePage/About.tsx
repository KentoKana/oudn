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
        handleScroll(); // initialize on load
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Compute horizontal translation for each column
    const leftColTranslate = `${(1 - scrollY) * -100}px`; // starts left, moves to 0
    const rightColTranslate = `${(1 - scrollY) * 100}px`; // starts right, moves to 0

    return (
        <div className="bg-black text-white" ref={sectionRef}>
            <Container className="pt-32 leading-[1.6] text-2xl">
                <div className="flex gap-20">
                    <div
                        className="w-1/3 transition-transform duration-500 ease-out"
                        style={{transform: `translateX(${leftColTranslate})`}}
                    >
                        <PrimaryHeading>
                            What is <em>"Once Upon A Dreadful Night"</em> ?
                        </PrimaryHeading>
                    </div>
                    <div
                        className="w-2/3 transition-transform duration-500 ease-out"
                        style={{transform: `translateX(${rightColTranslate})`}}
                    >
                        <p className="mb-10">
                            <em>"Once Upon A Dreadful Night"</em> is an improvised theater
                            production inspired by the tabletop RPG <em>
                            <a
                                target={"_blank"}
                                href={"https://www.tiltingatwindmills.net/games/dread/"}
                                className={"underline hover:text-red-700 transition-all duration-200"}
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
