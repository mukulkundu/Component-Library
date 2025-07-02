//It defines that what is the type of prop(closeDialog) that is coming from the page and then is used for close the popup, it is just a void function that changes the useState of the showDialog to false
type AlertDialogModalProps = {
  closeDialogBox: () => void,
  headMsg : string,
  footMsg : string
};

/*
This function takes headMsg, footMsg and the closeDialogBox function in it as props, the colseDialogBox function is used to close the alert popup.
*/
export default function AlertDialogModal({closeDialogBox, headMsg, footMsg}: AlertDialogModalProps){


    /*
    This components returns the alert dialog which appears when the button is clicked and can be closed by the closeDialogBox function which is in the cancel button and the task to be performed should be placed in the continue button's onClick.
    */
    return(

        <div className="fixed z-50 top-0 left-0 w-[100dvw] h-[100dvh] flex items-center justify-center duration-200 backdrop-blur-md">
            <section className="w-120 h-50 bg-black rounded-xl p-4">
                <div className="text-white p-2 h-[70%]">
                    <p className="text-2xl font-medium">{headMsg}</p>
                    <p className="text-sm text-gray-300 my-2">{footMsg}</p>
                </div>

                <div className="h-[20%] flex justify-end items-center">
                    <button onClick={closeDialogBox} className="bg-white text-black mx-4 border-2 p-2 rounded-xl text-sm font-medium cursor-pointer hover:bg-gray-400 duration-300 border-white">Continue</button> 
                    {/* change the continue button's onclick according to your context */}
                    <button onClick={closeDialogBox} className="text-white mr-4 py-2 px-4 border-2 border-white rounded-xl text-sm font-medium cursor-pointer hover:bg-white duration-300 hover:text-black">Cancel</button>
                </div>
            </section>
        </div>
    )
}