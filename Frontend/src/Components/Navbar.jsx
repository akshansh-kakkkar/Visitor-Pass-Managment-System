import { useState } from "react"
import { HashLink } from "react-router-hash-link"
import { useLocation } from "react-router-dom"
import { Outlet } from "react-router-dom"
const Navbar = () => {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navitem = (hash) =>
    `block bg-[#1e1e1e] p-3 px-5 text-md rounded-3xl font-semibold
   ${(hash === "#" && location.hash === "") ||
      location.hash === hash
      ? "bg-gradient-to-r from-[#6a42d7] to-[#402b78] shadow-lg"
      : "text-white hover:bg-[#2a2a2a]"
    }`

  return (
    <>
      <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5 text-white p-4 transition-all duration-300">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold drop-shadow-[0_0_1px_#ffffff]">
            PASSIFY
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden text-3xl"
          >
            ☰
          </button>

          <ul className="hidden sm:flex gap-5">
            <HashLink smooth to="/#" className={navitem("#")}>HOME</HashLink>
            <HashLink smooth to="/#contact" className={navitem("#contact")}>CONTACT</HashLink>
          </ul>
        </div>


        {open && (
          <ul className="sm:hidden mt-4 flex flex-col gap-3 bg-[#1e1e1e] p-4 rounded-xl">
            <HashLink smooth to="/#" onClick={() => setOpen(false)} className={navitem("#")}>HOME</HashLink>
            <HashLink smooth to="/#contact" onClick={() => setOpen(false)} className={navitem("#contact")}>CONTACT</HashLink>
          </ul>
        )}
      </nav>
      <Outlet />
    </>
  )
}

export default Navbar


