import React, {ReactNode} from 'react'
import Footer from "@/components/footer";

const MainLayout = ({ children } : { children : ReactNode}) => {
    return (
        <div>
            <main className="container mx-auto px-4">
                {children}
            </main>
            <Footer />
        </div>
    )
}
export default MainLayout
