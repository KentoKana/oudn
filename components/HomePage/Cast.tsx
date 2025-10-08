"use client";
import {useCallback, useEffect, useRef, useState} from "react";
import Container from "@/components/Container";
import {PrimaryHeading} from "@/components/PrimaryHeading";
import {Card, CardContent} from "@/components/ui/card";

const images = [
    "https://i.pinimg.com/1200x/2b/ac/37/2bac377e281652d2571fc95f20730f9f.jpg",
    "https://i.pinimg.com/1200x/2b/ac/37/2bac377e281652d2571fc95f20730f9f.jpg",
    "https://i.pinimg.com/1200x/2b/ac/37/2bac377e281652d2571fc95f20730f9f.jpg",
    "https://i.pinimg.com/1200x/2b/ac/37/2bac377e281652d2571fc95f20730f9f.jpg",
    "https://i.pinimg.com/1200x/2b/ac/37/2bac377e281652d2571fc95f20730f9f.jpg",
    "https://i.pinimg.com/1200x/2b/ac/37/2bac377e281652d2571fc95f20730f9f.jpg",
    "https://i.pinimg.com/1200x/2b/ac/37/2bac377e281652d2571fc95f20730f9f.jpg",
];

export default function Cast() {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [scales, setScales] = useState<number[]>(images.map(() => 0.85));

    const setCardRef = useCallback((el: HTMLDivElement | null, index: number) => {
        cardRefs.current[index] = el;
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const newScales = cardRefs.current.map((card) => {
                if (!card) return 0.85;
                const rect = card.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                const distanceFromCenter = Math.abs(rect.top + rect.height / 2 - windowHeight / 2);
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

    const overlapStartScale = 0.95;
    const maxOverlap = 150; // max overlap in px

    return (
        <div className="bg-black text-white">
            <Container className="pt-32 leading-[1.6] text-2xl relative">
                <PrimaryHeading>The Cast</PrimaryHeading>

                {images.map((src, index) => {
                    const topCardScale = scales[0];

                    // Compute overlap once, based on top card scale
                    const overlap =
                        topCardScale < overlapStartScale
                            ? maxOverlap * (1 - (topCardScale - 0.85) / (overlapStartScale - 0.85))
                            : 0;

                    // Translate all cards downward by overlap, except top card
                    const translateY = index === 0 ? 0 : -overlap;

                    return (
                        <div
                            key={index}
                            ref={(el) => setCardRef(el, index)}
                            className="transition-transform duration-200 ease-out"
                            style={{
                                transform: `translateY(${translateY}px) scale(${scales[index]})`,
                                zIndex: index, // bottom-most card on top visually
                                position: "relative",
                            }}
                        >
                            <Card
                                className="p-0 border-none rounded-xl h-[700px] overflow-hidden flex items-center justify-center bg-black">
                                <CardContent className="p-0 w-full h-full flex items-center justify-center">
                                    <img
                                        className="w-full h-full object-cover object-top rounded-xl"
                                        alt={`Game Master ${index + 1}`}
                                        src={src}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    );
                })}
            </Container>
        </div>
    );
}
