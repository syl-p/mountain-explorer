export default function Layout({children}) {
    return <>
        <header className="fixed top-0 left-0 w-full z-50 text-white flex space-x-12 p-6">
            <a className="block flex-1">
                <img src="./svg-logo.svg" className="w-10 h-10"/>
            </a>
            <div>
                ui...
            </div>
        </header>
        {children}
        <footer className="fixed top-0 left-0 w-full z-50 text-white">
            
        </footer>
    </>
}