import { FaTwitter, FaInstagram } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center max-w-3xl mx-auto px-4 py-16 text-center">
      <header className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">Kevin Ma</h1>
        <p className="text-lg text-[var(--muted)]">engineer, utilitarian, bettor</p>
      </header>

      <main className="mb-10">
        <p className="text-xl max-w-lg mx-auto">
          Developer and machine learning enthusiast working on making computers think better. 
          Twitter DMs are the best way to reach me.
        </p>
      </main>

      <footer className="flex gap-6 justify-center">
        <a 
          href="https://x.com/taykv2" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[var(--accent)] hover:opacity-80 transition-opacity"
          aria-label="Twitter"
        >
          <FaTwitter size={28} />
        </a>
        <a 
          href="https://www.instagram.com/keving.ma/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[var(--accent)] hover:opacity-80 transition-opacity"
          aria-label="Instagram"
        >
          <FaInstagram size={28} />
        </a>
      </footer>
    </div>
  );
}
