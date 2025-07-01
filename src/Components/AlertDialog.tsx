import AlertDialogButton from "../CodeModules/AlertDialogButton"
import { useRef } from "react"
import Clip from "../CodeModules/Clip"


export default function AlterDialog() {

    //It contains the code of the main button component that is used for the popup
    const buttonCode = `
import { useState, useEffect } from "react"
import AlertDialogModal from "./AlertDialogModal"



export default function AlertDialogButton(){

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
        {showDialog && <AlertDialogModal closeDialogBox={closeDialogBox}/>}


        <button onClick={() => {showDialogBox()}} className="rounded-lg px-2 py-1 bg-black text-white border-2
         border-white cursor-pointer hover:text-black hover:bg-blue-300 duration-200">Show Dialog</button>
        </>
    )
}
    `
    //Used to copy the above code
    const buttonCodeRef = useRef(null)
    
    //It contains the code of the modal/dialog that popups when clicked on the button
    const modalCode = `
type AlertDialogModalProps = {
  closeDialogBox: () => void;
};

export default function AlertDialogModal({closeDialogBox}: AlertDialogModalProps){

    return(

        <div className="fixed top-0 left-0 w-[100dvw] h-[100dvh] flex items-center justify-center duration-200 
        backdrop-blur-md">
            <section className="w-120 h-50 bg-black rounded-xl p-4">
                <div className="text-white p-2 h-[70%]">
                    <p className="text-2xl font-medium">Are you Sure?</p>
                    <p className="text-sm text-gray-300 my-2">The action cannot be undone.
                     This will permanently cause changes and there would not be any rolling back.</p>
                </div>

                <div className="h-[20%] flex justify-end items-center">
                    <button onClick={closeDialogBox} className="bg-white mx-4 border-2 p-2 rounded-xl
                     text-sm font-medium cursor-pointer hover:bg-gray-400 duration-300
                      border-white">Continue</button> 
                    {/* change the continue button's onclick according to your context */}
                    <button onClick={closeDialogBox} className="text-white mr-4 py-2 px-4 border-2 border-white
                     rounded-xl text-sm font-medium cursor-pointer hover:bg-white 
                     duration-300 hover:text-black">Cancel</button>
                </div>
            </section>
        </div>
    )
}
    `
    //Used to copy the above code
    const modalCodeRef = useRef(null)
    
    //It contains the import statement of the component used for showcasing on the page
    const importStatement = `
import AlertDialogButton from "../AlertDialogButton"
    `
    //Used to copy the above code
    const importStatementRef = useRef(null)

    //It contains the code of the usage of the component for showcasing on the page
    const execution = `
<AlertDialogButton />
    `
    //Used to copy the above code
    const executionRef = useRef(null)



    return (

        <div className="pt-14 ml-24 dark:text-white">
            <h1 className="text-4xl font-medium">Alert Dialog</h1>

            <article className="mt-2 text-sm text-gray-700">
                A popup dialog box that congirms for user permission.
            </article>

            <section className="mt-12 bg-gray-200 dark:bg-[#1d1c1c] h-30 rounded-lg flex items-center justify-center w-[50%]">
                <AlertDialogButton buttonText={'Show Dialog'} mainMsg={'Are you Sure?'} subMsg={'The action cannot be undone. This will permanently cause changes and there would not be any rolling back.'}/>
            </section>

            <section className="mt-12">
                <h2 className="text-3xl">Usage</h2>
                <article>
                            <ol>
                                <li className="py-4 w-[85%]">
                                    <p>1. Create two new tsx files named AlertDialogButton.tsx & AlertDialogModal.tsx and paste the code in it</p>

                                    <p className="pt-4 pb-2 pl-2">AlertDialogButton.tsx</p>
                                    <div className="border rounded-2xl bg-gray-200 dark:bg-[#1d1c1c] py-4 px-8 text-sm">
                                        <pre className="flex items-start justify-between">
                                            <code ref={buttonCodeRef}>
                                                {buttonCode}
                                            </code>
                                            <div className="mt-2">
                                                <Clip textToCopy={buttonCodeRef} />
                                            </div>
                                        </pre>
                                    </div>

                                    <p className="pt-8 pb-2 pl-2">AlertDialogModal.tsx</p>
                                    <div className="border rounded-2xl bg-gray-200 dark:bg-[#1d1c1c] py-4 px-8 text-sm">
                                        <pre className="flex items-start justify-between">
                                            <code ref={modalCodeRef}>
                                                {modalCode}
                                            </code>
                                            <div className="mt-2">
                                                <Clip textToCopy={modalCodeRef} />
                                            </div>
                                        </pre>
                                    </div>
                                </li>
        
                                <li className="py-4 w-[65%]">
                                    <p>2. Import AlertDialogButton to the current file in which you have to use the Alert Dialog.</p>
                                    <div className="border rounded-2xl bg-gray-200 dark:bg-[#1d1c1c] px-8 text-sm">
                                        <pre className="flex items-center justify-between">
                                            <code className="flex" ref={importStatementRef}>
                                                {importStatement}
                                            </code>
                                            <div>
                                                <Clip textToCopy={importStatementRef} />
                                            </div>
                                        </pre>
                                    </div>
                                </li>
        
                                <li className="py-4 w-[65%]">
                                    <p>3. Use the Component in the section nedded and edit the button functionality in the code as per the need.</p>
                                    <div className="border rounded-2xl bg-gray-200 dark:bg-[#1d1c1c] px-8 text-sm">
                                        <pre className="flex items-center justify-between">
                                            <code ref={executionRef}>
                                                {execution}
                                            </code>
                                            <div>
                                                <Clip textToCopy={executionRef} />
                                            </div>
                                        </pre>
                                    </div>
                                </li>
                            </ol>
                        </article>
            </section>
        </div>
    )
}