import { FaTwitter, FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center max-w-3xl mx-auto px-4 py-16 text-center">
      <header className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Kevin Ma</h1>
      </header>

      <main className="mb-10">
        <p className="text-xl max-w-lg mx-auto">
          Developer and machine learning enthusiast working on making computers think better.
        </p>
        <p className="text-lg mt-6">
          Currently: Founding engineer at stealth<br />
          Previously: Software engineer at Othram Inc.
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
          href="https://github.com/kevingma" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[var(--accent)] hover:opacity-80 transition-opacity"
          aria-label="GitHub"
        >
          <FaGithub size={28} />
        </a>
      </footer>
    </div>
  );
}
