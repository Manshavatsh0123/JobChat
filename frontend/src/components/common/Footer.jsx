function Footer() {
    return (
        <footer className="py-10 px-6 bg-white border-t">
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center">

                <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-[#6366F1] text-white flex items-center justify-center font-bold shadow-md">
                        C
                    </div>
                    <span className="font-semibold text-lg text-gray-900">
                        CareerChat
                    </span>
                </div>

                <p className="text-sm text-gray-500 max-w-md">
                    Connecting professionals with real opportunities. Build your career with authenticity.
                </p>

                <div className="w-full max-w-xs border-t mt-6 pt-4 text-xs text-gray-400">
                    © 2026 CareerChat. All rights reserved.
                </div>

            </div>
        </footer>
    )
}

export default Footer;