import { PropsWithChildren } from "react";

export default function BodyMainContainer({ children }: PropsWithChildren) {
    return <body className="flex flex-col antialiased w-full h-full min-h-screen">
        {children}
    </body>;
}
