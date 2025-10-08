import { ReactNode, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export default function Container({ children, className, ...rest }: Props) {
    return (
        <div
            className={`flex flex-col justify-center mx-auto px-4 max-w-[1200px] ${className || ""}`}
            {...rest}
        >
            {children}
        </div>
    );
}
