import { useState, useEffect } from "react"
import AlertDialogModal from "./AlertDialogModal"

type AlertDialogButtonProps = {
    buttonText : string,
    mainMsg : string,
    subMsg : string
}

export default function AlertDialogButton({buttonText, mainMsg, subMsg}: AlertDialogButtonProps){

    //Used to show or hide the popup by maintaining a boolean value
    const [showDialog, setShowDialog] = useState(false)
    const closeDialogBox = () => setShowDialog(false)
    const showDialogBox = () => setShowDialog(true)




    // Lock/unlock scroll when dialog box opens/closes
    useEffect(() => {
        if (showDialog) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showDialog]);


    return(

        <>
        {showDialog && <AlertDialogModal closeDialogBox={closeDialogBox} headMsg={mainMsg} footMsg={subMsg}/>}


        <button onClick={() => {showDialogBox()}} className="rounded-lg px-2 py-1 bg-black text-white border-2 border-white cursor-pointer hover:text-black hover:bg-blue-300 duration-200">{buttonText}</button>
        </>
    )
}