import React, {ReactNode} from 'react'

const MainLayout = ({ children } : { children : ReactNode}) => {
    return (
        <div className="container mx-auto px-4">
            <main>
                {children}
            </main>
        </div>
    )
}
export default MainLayout
