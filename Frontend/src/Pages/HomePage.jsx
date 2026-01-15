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
                    <div className="flex justify-center sm:p-18">
                        <svg width="480" height="300" viewBox="0 0 420 260" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="purpleGlow" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stop-color="#8B5CF6" />
                                    <stop offset="100%" stop-color="#A855F7" />
                                </linearGradient>
                                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feDropShadow dx="0" dy="0" stdDeviation="10" flood-color="#8B5CF6" flood-opacity="0.6" />
                                </filter>
                            </defs>
                            <rect width="420" height="260" rx="22" fill="#0B0B0F" />
                            <rect x="12" y="12" width="396" height="236" rx="18"
                                fill="#111113" stroke="#8B5CF6" stroke-opacity="0.5" />
                            <rect x="12" y="12" width="396" height="64" rx="18"
                                fill="url(#purpleGlow)" filter="url(#glow)" />
                            <text x="30" y="48" fill="white" font-size="22" font-weight="700"
                                font-family="Arial, sans-serif">PASSIFY</text>
                            <text x="30" y="66" fill="#E9D5FF" font-size="12"
                                font-family="Arial, sans-serif">Secure Visitor Pass</text>
                            <circle cx="62" cy="128" r="28" fill="#1F1F2B" />
                            <circle cx="62" cy="120" r="8" fill="#8B5CF6" />
                            <rect x="48" y="132" width="28" height="16" rx="8" fill="#8B5CF6" />
                            <text x="110" y="115" fill="white" font-size="18" font-weight="600"
                                font-family="Arial, sans-serif">Akshansh Kakkar</text>
                            <text x="110" y="138" fill="#A1A1AA" font-size="13"
                                font-family="Arial, sans-serif">Visiting • Tech Department</text>
                            <text x="110" y="158" fill="#A1A1AA" font-size="13"
                                font-family="Arial, sans-serif">15 Jan 2026 • 11:30 AM</text>
                            <rect x="300" y="92" width="90" height="90" rx="14"
                                fill="#14141C" stroke="#8B5CF6" stroke-opacity="0.6" />
                            <rect x="312" y="104" width="66" height="66" rx="8" fill="#EEE" />
                            <text x="30" y="220" fill="#6B7280" font-size="12"
                                font-family="Arial, sans-serif">Pass ID • PFY-82917</text>
                            <rect x="280" y="200" width="110" height="36" rx="18"
                                fill="url(#purpleGlow)" filter="url(#glow)" />

                            <text x="312" y="224" fill="white" font-size="14" font-weight="600"
                                font-family="Arial, sans-serif">ACTIVE</text>

                        </svg>

                    </div>
                </section>
            </div>
        </div>
    )
}


export default HomePage