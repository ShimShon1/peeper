export default function PeepContent({peep}){
    return(
        <div className="p-4 lg:p-8">
            <div className="flex  gap-3 pt-4 ">
                <img className="rounded-[50%] h-14 " src={peep.userPosted.photoURL} alt="user profile picure" />
                <h3 className="font-semibold">{peep.userPosted.displayName}</h3>
            </div>

            <div className="ml-[68px]   space-y-3 relative bottom-6">
                <p>{peep.content}</p>

                <div>

                    {peep.imgLink && <img className=" max-h-80 md:max-h-96 rounded-xl shadow-sm p-2" src={peep.imgLink} alt="" />}

                </div>
            </div>
        </div>

    )
}