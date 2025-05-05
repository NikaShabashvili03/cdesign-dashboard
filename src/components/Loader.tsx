import { BeatLoader } from "react-spinners"


function Loader() {
    return (
        <div className="flex justify-center items-center h-dvh">
            <BeatLoader
                color="#4c583e"
                size={20}
            />
        </div>
    )
}

export default Loader
