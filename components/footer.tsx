import Logo from "@/components/Logo";


const Footer = () => {
    return (
        <footer>
            <div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:justify-center md:py-0 border-t border-b-gray-700">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-10 md:px-0">
                    <Logo />
                    <div className="hidden md:block h-[50px] w-1 bg-gray-500"></div>
                    <p className="text-center text-sm leading-loose md:text-left">Build by @ Learning platform 2025</p>
                </div>
            </div>
        </footer>
    )
}
export default Footer
