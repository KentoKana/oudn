"use client";
import {useCallback, useEffect, useRef, useState} from "react";
import Container from "@/components/Container";
import {PrimaryHeading} from "@/components/PrimaryHeading";
import {Card, CardContent} from "@/components/ui/card";

const castMembers = [
    {
        title: "Game Master",
        name: "Helen Burger",
        image:
            "https://i.pinimg.com/1200x/2b/ac/37/2bac377e281652d2571fc95f20730f9f.jpg",
        description:
            "Helen has been a performer since the age of two, and despite being an incurable academic, she loves to dance, sing, and cavort about like a monkey on caffeine. Blend this together with a fondness for stories, expression, and quiet but genuine human connection, and you get an improviser who tries her darnedest to infuse her performances with a sense of play and authenticity.",
    },
    {
        title: "Player",
        name: "Alice Johnson",
        image: "https://i.pinimg.com/736x/28/5c/80/285c8065efb136f7384c224b4d30601e.jpg",
        description:
            "Alice brings a unique blend of improvisation and physical comedy, captivating audiences with her energy and wit.",
    },
    {
        title: "Player",
        name: "Mark Davis",
        image: "https://i.pinimg.com/736x/08/e4/4f/08e44f2923c1bf90ece540bd3ea9b898.jpg",
        description:
            "Mark weaves tales with a keen eye for detail, bringing characters and worlds to life with every performance.",
    },
    {
        title: "Player",
        name: "Sarah Lee",
        image: "https://i.pinimg.com/736x/b6/2b/b5/b62bb5d124d715fece6901b7e96d87bb.jpg",
        description:
            "Sarah’s musical talents enhance every performance, creating an immersive auditory experience for the audience.",
    },
    {
        title: "Audio",
        name: "Liam Kim",
        image: "https://i.pinimg.com/1200x/0d/02/e6/0d02e6d9eccd0c549215ae0acfec378b.jpg",
        description:
            "Liam’s movement and choreography add dynamic visuals to each act, perfectly complementing the narrative.",
    },
    {
        title: "Lighting",
        name: "Alfred Backster",
        image: "https://i.pinimg.com/736x/44/24/1b/44241b8af3428ea57ed86950911b9e46.jpg",
        description:
            "Alfred ensures the stage is lit to enhance mood, atmosphere, and focus, supporting every performance seamlessly.",
    },
];

export default function Cast() {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [scales, setScales] = useState<number[]>(castMembers.map(() => 0.85));
    const [titleVisible, setTitleVisible] = useState<boolean[][]>(
        castMembers.map((member) => Array(member.name.length).fill(false))
    );

    const setCardRef = useCallback((el: HTMLDivElement | null, index: number) => {
        cardRefs.current[index] = el;
    }, []);

    // Scroll-based scaling
    useEffect(() => {
        const handleScroll = () => {
            const newScales = cardRefs.current.map((card) => {
                if (!card) return 0.85;
                const rect = card.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const distanceFromCenter = Math.abs(
                    rect.top + rect.height / 2 - windowHeight / 2
                );
                const maxDistance = windowHeight / 1.2;
                const progress = Math.max(0, 1 - distanceFromCenter / maxDistance);
                return 0.85 + progress * 0.15;
            });
            setScales(newScales);
        };

        window.addEventListener("scroll", handleScroll, {passive: true});
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Animate name letters on scroll into view
    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        const timeoutIds: number[][] = castMembers.map(() => []);

        cardRefs.current.forEach((card, cardIndex) => {
            if (!card) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        // Clear existing timeouts
                        timeoutIds[cardIndex].forEach(clearTimeout);
                        timeoutIds[cardIndex] = [];

                        if (entry.isIntersecting) {
                            // Animate letters
                            castMembers[cardIndex].name.split("").forEach((_, i) => {
                                const timeout = window.setTimeout(() => {
                                    setTitleVisible((prev) => {
                                        const copy = [...prev];
                                        copy[cardIndex][i] = true;
                                        return copy;
                                    });
                                }, i * 80);
                                timeoutIds[cardIndex].push(timeout);
                            });
                        } else {
                            // Reset letters immediately
                            setTitleVisible((prev) => {
                                const copy = [...prev];
                                copy[cardIndex] = copy[cardIndex].map(() => false);
                                return copy;
                            });
                        }
                    });
                },
                {
                    threshold: 0,
                    rootMargin: "0px 0px -150px 0px", // triggers slightly earlier
                }
            );

            observer.observe(card);
            observers.push(observer);
        });

        return () => {
            observers.forEach((o) => o.disconnect());
            timeoutIds.flat().forEach(clearTimeout);
        };
    }, []);

    const overlapStartScale = 0.95;
    const maxOverlap = 150;

    return (
        <div className="bg-gray-900 text-white">
            <Container className="pt-32 leading-[1.6] text-2xl relative">
                <PrimaryHeading>The Cast</PrimaryHeading>

                {castMembers.map((member, index) => {
                    const topCardScale = scales[0];
                    const overlap =
                        topCardScale < overlapStartScale
                            ? maxOverlap *
                            (1 - (topCardScale - 0.85) / (overlapStartScale - 0.85))
                            : 0;
                    const translateY = index === 0 ? 0 : -overlap;

                    return (
                        <div
                            key={index}
                            ref={(el) => setCardRef(el, index)}
                            className="flex flex-col items-center transition-transform duration-200 ease-out w-full"
                            style={{
                                transform: `translateY(${translateY}px) scale(${scales[index]})`,
                                zIndex: index,
                                position: "relative",
                            }}
                        >
                            <div className={"text-[3rem]"}>
                                <span className={"absolute right-[-11px] top-[-3px] text-white leading-0 z-10"}>+</span>
                                <span className={"absolute left-[-11px] top-[-3px] text-white leading-0 z-10"}>+</span>
                                <span
                                    className={"absolute left-[-11px] bottom-[3px] text-white leading-0 z-10"}>+</span>
                                <span
                                    className={"absolute right-[-11px] bottom-[3px] text-white leading-0 z-10"}>+</span>
                            </div>
                            <Card
                                className="w-full border-dotted p-0 bg-black rounded-none overflow-hidden flex items-center justify-center relative">
                                <CardContent className="w-full flex items-center justify-center relative">
                                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-0">
                                        {Array.from({length: 6}).map((_, i) => (
                                            <div
                                                key={i}
                                                className="border-dotted border border-gray-700 z-0 w-full h-full relative"
                                            >
                                                <span
                                                    className={"text-gray-700 absolute top-[-41px] text-[2em] left-[-13px]"}>+</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-10 p-10 text-white justify-between w-full z-1">
                                        <div className="w-1/2">
                                            {/* Animated Name */}
                                            <h3 className="font-primary text-7xl flex flex-wrap">
                                                {member.name.split("").map((letter, i) => (
                                                    <span
                                                        key={i}
                                                        className="inline-block transition-all duration-500 ease-out"
                                                        style={{
                                                            transform: titleVisible[index][i]
                                                                ? "translateY(0)"
                                                                : "translateY(50px)",
                                                            opacity: titleVisible[index][i] ? 1 : 0,
                                                        }}
                                                    >
                            {letter === " " ? "\u00A0" : letter}
                          </span>
                                                ))}
                                            </h3>
                                            <h4 className="font-secondary">{member.title}</h4>
                                            <hr className="border-white my-3"/>
                                            <p className="text-[1.2rem] leading-[2]">
                                                {member.description}
                                            </p>
                                        </div>
                                        <img
                                            className="w-1/2 object-cover object-center rounded-xl"
                                            alt={member.name}
                                            src={member.image}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    );
                })}
            </Container>
        </div>
    );
}
