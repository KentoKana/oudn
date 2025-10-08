import {ReactNode} from "react";

interface Props {
    children: ReactNode;
}

export const PrimaryHeading = ({children}: Props) => {
    return <h2 className={"text-[2em] font-primary"}>
        {children}
    </h2>
}