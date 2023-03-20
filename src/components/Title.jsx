
import Logo from "../../src/images/green_ball.svg"

export default function Title({path}) {
    let page = path === "/"? "Home":path === "/profile"?"Profile":"Peep"

    return(
        <div className="col-span-9 bg-slate-50  w-full p-4 grid grid-cols-9 sticky top-0 z-10 bg-opacity-40 items-center md:px-6">
            
            
            <div className="col-span-2 flex   justify-center xl:pl-20">
                <img src={Logo} className="w-12" alt="home Icon" />
            </div>
            <div className="col-span-5 text-2xl font-semibold">{page}</div>
        </div>
    )
}