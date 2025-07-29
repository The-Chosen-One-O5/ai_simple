import Chat from "@/components/Chat";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] flex justify-center">
      <div className="w-full max-w-6xl">
        <Chat />
      </div>
    </main>
  );
}
