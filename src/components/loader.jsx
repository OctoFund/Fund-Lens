import PLACEHOLDERS from "../common/placeholders";

export default function Loader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.3)" }}>
            <div className="flex flex-col items-center">
                <div className="loader-spinner mb-4"></div>
                <span className="text-white text-lg">{PLACEHOLDERS.home.loader.message}</span>
            </div>
        </div>
    )
}