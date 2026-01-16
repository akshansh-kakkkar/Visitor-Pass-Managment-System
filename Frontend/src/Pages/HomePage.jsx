import { Link } from "react-router-dom"
const HomePage = () => {
    return (
        <div>
            <div className="flex justify-center items-center p-10">
                <span className="flex items-center gap-2 bg-[#1e1e1e] px-4 py-2 rounded-full text-white">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#9b7cff] animate-pulse shadow-[0_0_10px_#9b7cff]" />
                    <span className="text-sm font-medium">
                        New Era of Security
                    </span>

                </span>
            </div>
            <div>

                <section id=''>
                    <div className='font-bold flex  justify-center mt-15 sm:mt-15' >
                        <h2 className='text-center sm:max-w-4xl text-7xl max-w-2xl sm:text-8xl text-white sm:leading-27 font-bold'>Powering the <span className='text-[#825cff]'>Modern Security</span></h2>
                    </div>
                    <div className="flex justify-center p-8 items-center">
                        <p className="text-[#d7d7d7] text-md max-w-md flex text-center text-md">A unified ecosystem to manage passes, visitors, and security.
                            Built specifically for modern offices.</p>
                    </div>
                    <div className="flex justify-center items-center text-center p-2">
                        <Link to='/login' className="text-white bg-[#8d6bff] hover:bg-[#825cff] p-4 px-5 font-bold text-2xl rounded-4xl">Get Started</Link>
                    </div>
                </section>

                <section id="about" className="h-[260%]">
                    <div className="font-bold flex  justify-center mt-25 sm:mt-33">
                        <h2 className="text-center sm:max-w-xl text-3xl max-w-sm sm:text-5xl text-white sm:leading-15 font-bold">Everything you need to <span className='text-[#825cff]'>run your security system.</span></h2>
                    </div>
                    <div className="flex justify-center p-3 items-center">
                        <p className="text-[#d7d7d7] text-md max-w-xl flex text-center text-sm">Passify replaces fragmented tools with a single, powerful visitor management system designed for the modern workplace.</p>
                    </div>
                    <div className="flex justify-center px-4 sm:p-18">
                        <div className="w-full max-w-md bg-[#0B0B0F] rounded-3xl p-3 border border-[#8B5CF6]/30 hover:border-[#8B5CF6]/60 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(139,92,246,0.2)]">
                            <div className="bg-[#111113] rounded-2xl overflow-hidden border border-[#8B5CF6]/20">

                                <div className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] p-4 shadow-[0_0_30px_rgba(139,92,246,0.4)]">
                                    <h3 className="text-white font-bold text-xl tracking-wide">PASSIFY</h3>
                                    <p className="text-[#E9D5FF] text-xs">Secure Visitor Pass</p>
                                </div>


                                <div className="p-5">
                                    <div className="flex items-start justify-between gap-4">

                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-full bg-[#1F1F2B] flex items-center justify-center border-2 border-[#8B5CF6]/40">
                                                <svg className="w-8 h-8 text-[#8B5CF6]" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="text-white font-semibold text-lg">Akshansh Kakkar</h4>
                                                <p className="text-[#A1A1AA] text-sm">Visiting • Tech Department</p>
                                                <p className="text-[#A1A1AA] text-sm">16 Jan 2026 • 11:30 AM</p>
                                            </div>
                                        </div>


                                        <div className="w-20 h-20 rounded-xl bg-[#14141C] border border-[#8B5CF6]/40 p-2 flex items-center justify-center">
                                            <div className="w-full h-full bg-white rounded-lg p-1">
                                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                                    <rect x="10" y="10" width="25" height="25" fill="#1a1a1a" />
                                                    <rect x="15" y="15" width="15" height="15" fill="white" />
                                                    <rect x="18" y="18" width="9" height="9" fill="#1a1a1a" />
                                                    <rect x="65" y="10" width="25" height="25" fill="#1a1a1a" />
                                                    <rect x="70" y="15" width="15" height="15" fill="white" />
                                                    <rect x="73" y="18" width="9" height="9" fill="#1a1a1a" />
                                                    <rect x="10" y="65" width="25" height="25" fill="#1a1a1a" />
                                                    <rect x="15" y="70" width="15" height="15" fill="white" />
                                                    <rect x="18" y="73" width="9" height="9" fill="#1a1a1a" />
                                                    <rect x="40" y="10" width="5" height="5" fill="#1a1a1a" />
                                                    <rect x="50" y="10" width="5" height="5" fill="#1a1a1a" />
                                                    <rect x="40" y="20" width="5" height="5" fill="#1a1a1a" />
                                                    <rect x="50" y="25" width="5" height="5" fill="#1a1a1a" />
                                                    <rect x="45" y="40" width="10" height="10" fill="#1a1a1a" />
                                                    <rect x="40" y="55" width="5" height="5" fill="#1a1a1a" />
                                                    <rect x="50" y="50" width="5" height="5" fill="#1a1a1a" />
                                                    <rect x="10" y="45" width="5" height="5" fill="#1a1a1a" />
                                                    <rect x="20" y="40" width="5" height="5" fill="#1a1a1a" />
                                                    <rect x="25" y="50" width="5" height="5" fill="#1a1a1a" />
                                                    <rect x="65" y="40" width="5" height="5" fill="#1a1a1a" />
                                                    <rect x="75" y="45" width="5" height="5" fill="#1a1a1a" />
                                                    <rect x="85" y="40" width="5" height="5" fill="#1a1a1a" />
                                                    <rect x="65" y="55" width="5" height="5" fill="#1a1a1a" />
                                                    <rect x="75" y="60" width="5" height="5" fill="#1a1a1a" />
                                                    <rect x="65" y="70" width="10" height="10" fill="#1a1a1a" />
                                                    <rect x="80" y="65" width="10" height="10" fill="#1a1a1a" />
                                                    <rect x="70" y="85" width="5" height="5" fill="#1a1a1a" />
                                                    <rect x="85" y="80" width="5" height="10" fill="#1a1a1a" />
                                                    <rect x="40" y="70" width="5" height="5" fill="#1a1a1a" />
                                                    <rect x="50" y="75" width="5" height="5" fill="#1a1a1a" />
                                                    <rect x="45" y="85" width="5" height="5" fill="#1a1a1a" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#2a2a2a]">
                                        <p className="text-[#6B7280] text-sm">Pass ID • PFY-82917</p>
                                        <div className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] px-5 py-2 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.4)]">
                                            <span className="text-white font-semibold text-sm">ACTIVE</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="flex justify-center"><div className="bg-[#ffffff1e] h-[0.1px] w-[80vw] rounded-full shadow-2xl shadow-white  flex justify-center"></div></div>
                <section id="reviews" className="py-14 px-4">
                    <div className="flex justify-center text-center mb-12">
                        <h1 className="text-white text-4xl sm:text-6xl font-bold max-w-xl">Reviews By Our <span className="text-[#825cff]">Customers</span></h1>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">

                        <div className="group relative bg-[#0E0E11] rounded-3xl p-6 border border-[#8A5CFF]/30 hover:border-[#8A5CFF]/60 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(138,92,255,0.2)]">

                            <div className="bg-gradient-to-r from-[#8A5CFF] to-[#5A36C9] rounded-2xl p-4 mb-5">
                                <h3 className="text-white font-bold text-lg">PASSIFY</h3>
                                <p className="text-[#E6DCFF] text-xs">User Review</p>
                            </div>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-[#8A5CFF] flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">A</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold">Akshansh Kakkar</h4>
                                    <p className="text-[#9CA3AF] text-sm">Tech Department • 15 Jan 2026</p>
                                </div>
                            </div>


                            <p className="text-[#D1D5DB] text-sm leading-relaxed mb-4">
                                "Clean UI, secure entry flow, and overall an excellent visitor system."
                            </p>


                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className="w-5 h-5 text-[#8A5CFF]" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                        </div>

                        <div className="group relative bg-[#0E0E11] rounded-3xl p-6 border border-[#8A5CFF]/30 hover:border-[#8A5CFF]/60 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(138,92,255,0.2)]">

                            <div className="bg-gradient-to-r from-[#8A5CFF] to-[#5A36C9] rounded-2xl p-4 mb-5">
                                <h3 className="text-white font-bold text-lg">PASSIFY</h3>
                                <p className="text-[#E6DCFF] text-xs">User Review</p>
                            </div>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-[#8A5CFF] flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">R</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold">Ramesh</h4>
                                    <p className="text-[#9CA3AF] text-sm">Business Department • 30 Jan 2026</p>
                                </div>
                            </div>

                            <p className="text-[#D1D5DB] text-sm leading-relaxed mb-4">
                                "Intuitive design with a professional look that makes visitor handling fast, reliable, and stress-free."
                            </p>


                            <div className="flex gap-1">
                                {[1, 2, 3, 4].map((star) => (
                                    <svg key={star} className="w-5 h-5 text-[#8A5CFF]" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                <svg className="w-5 h-5 text-[#3a3a3a]" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                        </div>

                        <div className="group relative bg-[#0E0E11] rounded-3xl p-6 border border-[#8A5CFF]/30 hover:border-[#8A5CFF]/60 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(138,92,255,0.2)]">

                            <div className="bg-gradient-to-r from-[#8A5CFF] to-[#5A36C9] rounded-2xl p-4 mb-5">
                                <h3 className="text-white font-bold text-lg">PASSIFY</h3>
                                <p className="text-[#E6DCFF] text-xs">User Review</p>
                            </div>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-[#8A5CFF] flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">K</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold">Kanika</h4>
                                    <p className="text-[#9CA3AF] text-sm">Design Department • 15 Jan 2026</p>
                                </div>
                            </div>


                            <p className="text-[#D1D5DB] text-sm leading-relaxed mb-4">
                                "Quick pass generation, smooth verification, and a modern interface that feels secure and dependable."
                            </p>


                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className="w-5 h-5 text-[#8A5CFF]" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                        </div>


                        <div className="group relative bg-[#0E0E11] rounded-3xl p-6 border border-[#8A5CFF]/30 hover:border-[#8A5CFF]/60 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(138,92,255,0.2)]">

                            <div className="bg-gradient-to-r from-[#8A5CFF] to-[#5A36C9] rounded-2xl p-4 mb-5">
                                <h3 className="text-white font-bold text-lg">PASSIFY</h3>
                                <p className="text-[#E6DCFF] text-xs">User Review</p>
                            </div>


                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-[#8A5CFF] flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">P</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold">Priyanka</h4>
                                    <p className="text-[#9CA3AF] text-sm">Corporate • 15 Jan 2026</p>
                                </div>
                            </div>

                            <p className="text-[#D1D5DB] text-sm leading-relaxed mb-4">
                                "Excellent attention to detail, combining visual clarity with strong performance."
                            </p>


                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className="w-5 h-5 text-[#8A5CFF]" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                        </div>

                    </div>
                </section>
                <div className="flex justify-center"><div className="bg-[#ffffff1e] h-[0.1px] w-[80vw] rounded-full shadow-2xl shadow-white  flex justify-center"></div></div>
            </div>
        </div>
    )
}


export default HomePage