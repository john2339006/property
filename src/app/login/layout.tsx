export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                rel="stylesheet"
            />
            {children}
        </>
    );
}
