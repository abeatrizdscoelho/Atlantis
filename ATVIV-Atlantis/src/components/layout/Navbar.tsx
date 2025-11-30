import { FaUsers, FaHome, FaCalendarCheck } from 'react-icons/fa'; 

export default function Navbar() {
  return (
    <nav className="w-full bg-teal-600 shadow-xl py-4 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
  
        <a href="/"
          className="text-white text-3xl font-bold tracking-widest hover:scale-105 transition duration-300 [font-family:'Cinzel_Decorative',serif] drop-shadow-lg cursor-pointer"
        >
          Atlantis
        </a>

        <div className="flex space-x-8">
          <a href="/clientes"
            className="text-white text-lg font-medium flex items-center hover:text-teal-200 transition duration-200"
          >
            <FaUsers className="mr-2" />
            Clientes
          </a>

          <a href="/acomodacoes"
            className="text-white text-lg font-medium flex items-center hover:text-teal-200 transition duration-200"
          >
            <FaHome className="mr-2" />
            Acomodações
          </a>

          <a href="/hospedagens"
            className="text-white text-lg font-medium flex items-center hover:text-teal-200 transition duration-200"
          >
            <FaCalendarCheck className="mr-2" />
            Hospedagens
          </a>
        </div>
      </div>
    </nav>
  )
}