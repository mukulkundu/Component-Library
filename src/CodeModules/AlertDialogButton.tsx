import { useState, useEffect } from "react"
import AlertDialogModal from "./AlertDialogModal"

type AlertDialogButtonProps = {
    buttonText : string,
    mainMsg : string,
    subMsg : string
}

/*
This function takes the buttonText, mainMag and subMsg as props in it, this function is just used to show the alert popup.
*/
export default function AlertDialogButton({buttonText, mainMsg, subMsg}: AlertDialogButtonProps){

    //Used to show or hide the popup by maintaining a boolean value
    const [showDialog, setShowDialog] = useState(false)
    const closeDialogBox = () => setShowDialog(false)
    const showDialogBox = () => setShowDialog(true)




/*
This useEffect is used to lock the scroll when the alert box appears by using overflow hidden.
*/
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


    /*
    This components returns a button that is then used to open the alert dialog for the final conformation of any task or process.
    */
    return(

        <>
        {showDialog && <AlertDialogModal closeDialogBox={closeDialogBox} headMsg={mainMsg} footMsg={subMsg}/>}


        <button onClick={() => {showDialogBox()}} className="rounded-lg px-2 py-1 bg-black text-white border-2 border-white cursor-pointer hover:text-black hover:bg-blue-300 duration-200">{buttonText}</button>
        </>
    )
}