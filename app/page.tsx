import Banner from "@/shows/Dread Noir/Banner";
import Container from "@/components/Container";
import {PrimaryHeading} from "@/components/PrimaryHeading";

export default function Home() {
    return (
        <main>
            {/*Banner*/}
            <Banner/>
            <div className={"bg-black text-white"}>
                <Container className={"p-10 leading-[1.6] text-2xl"}>
                    <PrimaryHeading>
                        What is <em>"Once Upon A Dreadful Night"</em> ?
                    </PrimaryHeading>
                    <p className={"mb-5"}>
                        <em>"Once Upon A Dreadful Night"</em> is an improvised theater production inspired by the
                        tabletop
                        RPG <em>Dread</em>.
                    </p>
                    <p className={"mb-5"}>
                        The rules of Dread are simple: whenever a player attempts a risky action, they must pull a block
                        from a Jenga tower.
                        Success means they survive… for now. Failure, however, spells doom—their character meets a
                        grisly,
                        unforgettable end.
                    </p>
                    <p className={"mb-5"}>
                        In each performance, the Game Master (GM) guides the players into a new, shadowed world steeped
                        in
                        despair.
                        Together, the players navigate this grim landscape, weaving a haunting tale of how their
                        characters
                        confront dread, danger, and the unknown.
                    </p>
                </Container>
            </div>
        </main>
    )
}
