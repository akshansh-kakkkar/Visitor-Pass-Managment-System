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

                <section id="about" className="py-24">
                    <div className="font-bold flex justify-center mt-10">
                        <h2 className="text-center sm:max-w-xl text-3xl max-w-sm sm:text-5xl text-white sm:leading-tight font-bold">
                            Everything you need to <span className='text-[#825cff]'>run your security system.</span>
                        </h2>
                    </div>
                    <div className="flex justify-center p-3 items-center">
                        <p className="text-gray-400 text-center max-w-xl">
                            Passify replaces fragmented tools with a single, powerful visitor management system designed for the modern workplace.
                        </p>
                    </div>

                    <div className="flex justify-center px-4 mt-12">
                        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-3xl p-1 border border-white/10 hover:border-[#8B5CF6]/50 transition-all duration-500 hover:shadow-[0_0_50px_rgba(139,92,246,0.15)] group">
                            <div className="bg-[#0A0A0B] rounded-[22px] overflow-hidden">
                                <div className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] p-5">
                                    <h3 className="text-white font-bold text-xl tracking-wide">PASSIFY</h3>
                                    <p className="text-purple-100/80 text-xs">Secure Visitor Pass</p>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                                <svg className="w-8 h-8 text-[#8B5CF6]" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="text-white font-semibold text-lg">Akshansh Kakkar</h4>
                                                <p className="text-gray-500 text-sm">Visiting • Tech Department</p>
                                                <p className="text-gray-500 text-sm">16 Jan 2026 • 11:30 AM</p>
                                            </div>
                                        </div>
                                        <div className="w-20 h-20 rounded-xl bg-white p-2 flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                            <svg viewBox="0 0 100 100" className="w-full h-full text-black">
                                                <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="2" />
                                                <rect x="20" y="20" width="20" height="20" fill="currentColor" />
                                                <rect x="60" y="20" width="20" height="20" fill="currentColor" />
                                                <rect x="20" y="60" width="20" height="20" fill="currentColor" />
                                                <rect x="45" y="45" width="10" height="10" fill="currentColor" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-8 pt-5 border-t border-white/5">
                                        <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">Pass ID • PFY-82917</p>
                                        <div className="bg-[#8B5CF6]/20 border border-[#8B5CF6]/50 px-4 py-1.5 rounded-full">
                                            <span className="text-[#8B5CF6] font-bold text-xs">ACTIVE</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="flex justify-center opacity-20"><div className="bg-gradient-to-r from-transparent via-white to-transparent h-px w-[80vw]"></div></div>

                <section id="reviews" className="py-24 px-4">
                    <div className="flex justify-center text-center mb-16">
                        <h1 className="text-white text-4xl sm:text-6xl font-bold max-w-xl">Reviews By Our <span className="text-[#825cff]">Customers</span></h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        <ReviewCard name="Akshansh Kakkar" dept="Tech" date="15 Jan 2026" comment="Clean UI, secure entry flow, and overall an excellent visitor system." />
                        <ReviewCard name="Ramesh" dept="Business" date="30 Jan 2026" comment="Intuitive design with a professional look that makes visitor handling fast and stress-free." />
                        <ReviewCard name="Kanika" dept="Design" date="15 Jan 2026" comment="Quick pass generation, smooth verification, and a modern interface that feels secure." />
                        <ReviewCard name="Priyanka" dept="Corporate" date="15 Jan 2026" comment="Excellent attention to detail, combining visual clarity with strong performance." />
                    </div>
                </section>

                <div className="flex justify-center opacity-20"><div className="bg-gradient-to-r from-transparent via-white to-transparent h-px w-[80vw]"></div></div>

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