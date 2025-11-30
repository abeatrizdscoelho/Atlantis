export default function Footer() {
  return (
    <footer className="w-full bg-teal-600 text-white mt-16 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">

        <h2 className="text-2xl font-bold tracking-widest mb-2 [font-family:'Cinzel_Decorative',serif]">
          Atlantis Resort System
        </h2>

        <div className="w-100 h-[2px] bg-white/70 mb-4 rounded-full"></div>

        <p className="text-white/90 text-center text-sm">
          © {new Date().getFullYear()} Atlantis. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}