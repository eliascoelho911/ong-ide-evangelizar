export default function Content({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex-1 p-4">
            {children}
        </main>
    )
}