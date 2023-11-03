"use client"

import { createContract } from "@/lib/actions/contract.actions"
import { Button } from "../ui/button"



interface Props {
    // name: string,
    // datestart: string,
    // dateend: string,
    // images: string,
    // notes: string | null,
    // stages: string,
    userId: string
}

function Termin({userId}:Props){
    const _createContract = () => {
        console.log(userId)
        createContract({
            name: "Termin1",
            author:userId,
            dateStart:"01.01.2001",
            dateEnd:"01.02.2002",
            note:"Notes123",
            stages:({"Stage1":true,"Stage2":false})
        })
    }

    return(
    <article className={`flex w-full flex-col rounded-xl`}>

        <Button className="bg-dark-2 max-w-max" onClick={_createContract}>Termin Einfügen</Button>

        {/* <div className="flex flex-row  justify-normal">
        <div className="flex flex-col m-4 gap-3">
        <h2 className="text-light-1"> {name}</h2>
        <div className="ml-4 ">
            <h2 className="text-light-1 mb-3"> {`Stages`}</h2>
            <h2 className="text-light-1"> {`Input`}</h2>
        </div>
       
        <h2 className="text-light-1"> {`${datestart}-${dateend}`}</h2>
           
        </div>
        <div className="flex flex-col m-4 gap-3 max-w-fit max-h-fit bg-slate-500">
        <h2 className="text-light-1"> {`Images`}</h2>

        </div>
        </div> */}
        
    </article>
    
        )

}

export default Termin