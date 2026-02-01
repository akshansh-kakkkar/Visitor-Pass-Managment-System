import { Link } from "react-router-dom"
import BgGlow2 from "../Components/BgGlow2"

const ReviewCard = ({ name, dept, date, comment }) => (
    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-[#8A5CFF]/50 transition-all duration-300 group">
        <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8A5CFF] to-[#5A36C9] flex items-center justify-center font-bold text-lg text-white">
                {name[0]}
            </div>
            <div>
                <h4 className="font-semibold text-white">{name}</h4>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{dept} • {date}</p>
            </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">"{comment}"</p>
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} className="w-4 h-4 text-[#8A5CFF]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    </div>
)

const HomePage = () => {
    return (

        <div className="bg-[#000000] min-h-screen relative overflow-hidden text-white">
            <BgGlow2 />
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
            </div>


            <div className="relative z-10">
                <div className="flex justify-center items-center p-10">
                    <span className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
                        <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#9b7cff] animate-pulse shadow-[0_0_10px_#9b7cff]" />
                        <span className="text-sm font-medium text-white">
                            New Era of Security
                        </span>
                    </span>
                </div>

                <section id='hero'>
                    <div className='font-bold flex justify-center mt-10' >
                        <h2 className='text-center sm:max-w-4xl text-7xl max-w-2xl sm:text-8xl text-white sm:leading-tight font-bold'>
                            Powering the <span className='text-[#825cff] transition-all hover:drop-shadow-[0_0_15px_rgba(130,92,255,0.5)]'>Modern Security</span>
                        </h2>
                    </div>
                    <div className="flex justify-center p-8 items-center">
                        <p className="text-gray-400 text-lg max-w-md text-center">
                            A unified ecosystem to manage passes, visitors, and security.
                            Built specifically for modern offices.
                        </p>
                    </div>
                    <div className="flex justify-center items-center text-center p-2 gap-5">
                        <Link to='/login' className="text-white bg-[#8d6bff] hover:bg-[#825cff] transition-all hover:scale-105 p-4 px-8 font-bold text-xl rounded-full shadow-[0_0_20px_rgba(141,107,255,0.3)]">
                            Get Started
                        </Link>
                        <Link to='/visitor-register' className="text-white bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm transition-all hover:scale-105 p-4 px-8 font-bold text-xl rounded-full">
                            Register as visitor
                        </Link>
                    </div>
                </section>


                <div className="flex justify-center opacity-20 mt-20"><div className="bg-gradient-to-r from-transparent via-white to-transparent h-px w-[80vw]"></div></div>

                <footer id="contact" className="py-20 px-8">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tighter text-white">PASSIFY</h2>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                                Powering the Modern Security. A unified ecosystem to manage passes, visitors, and security.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg text-white">Company</h3>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-[#825cff] transition-colors">Home</a></li>
                                <li><a href="#about" className="hover:text-[#825cff] transition-colors">About Us</a></li>
                                <li><a href="#reviews" className="hover:text-[#825cff] transition-colors">Reviews</a></li>
                                <li><Link to="/login" className="hover:text-[#825cff] transition-colors">Login</Link></li>
                                <li><a href="https://lordicon.com/" className="hover:text-[#825cff] transition-colors">Icons by Lordicon.com</a></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg text-white">Platform</h3>
                            <p className="text-gray-400 text-sm">
                                Built for high-security environments and modern office spaces.
                            </p>
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto pt-20 mt-20 border-t border-white/5 text-center text-gray-500 text-xs">
                        &copy; 2026 PASSIFY. All Rights Reserved
                    </div>

                </footer>
            </div>
        </div>
    )
}

export default HomePage