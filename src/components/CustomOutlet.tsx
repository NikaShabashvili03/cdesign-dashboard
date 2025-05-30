import { Outlet } from "react-router-dom"
import Header from "./Header"
import SafeRoute from "./SafeRoute"

function CustomOutlet() {
    return (
        <SafeRoute>
            <Header/>
            <div className="min-h-[90dvh] h-fit bg-secondary-color">
                <div className="h-full px-2 lg:px-10">
                    <Outlet/>
                </div>
            </div>
        </SafeRoute>
    )
}

export default CustomOutlet
