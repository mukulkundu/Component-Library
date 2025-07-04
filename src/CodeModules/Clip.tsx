import { useState } from 'react';
import CopyImage from '../assets/copy.svg'
import CopyImageDarkMode from '../assets/copy-darkmode.svg'

type ClipProps = {
    textToCopy: React.RefObject<HTMLElement> | React.RefObject<null>,
    type ?: 'email'|'phone'
};

/*
This function takes textToCopy ref as a prop which contains text from a HTML tag and then converts to string and then is used for further process.
*/
export default function Clip({ textToCopy }: ClipProps) {

    const [copied, setCopied] = useState(false);

    const [tooltipLink, setTooltipLink] = useState<string | undefined>(undefined)
    const [redirect, setRedirect] = useState(false)

    /*
    This function handleRedirect converts the ref to a string and then checks the string to verify if it's a phone number or email and accordingly updates the tooltipLink and redirect.
    */
    const handleRedirect = () => {

        if (textToCopy.current) {
            const text = textToCopy.current.textContent?.trim() || "";

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^\+?\d{10,15}$/;

            if (emailRegex.test(text)) {
                setTooltipLink(`mailto:${text}`);
                setRedirect(true);
            } else if (phoneRegex.test(text)) {
                setTooltipLink(`tel:${text}`);
                setRedirect(true);
            } else {
                setTooltipLink(undefined);
;
                setRedirect(false);
            }
        }

    }

    /*
    In the function handleCopy the ref is converted to string and then is copied to the clipboard and the tooltip's text is managed with the setTimeout, the setCopied is used to manage the text's state in the tooltip of the copty button.
    */
    const handleCopy = () => {

        if (textToCopy.current) {
            const text = textToCopy.current.textContent || "";
            navigator.clipboard.writeText(text);

            setCopied(true)
            setTimeout(() => {
                setCopied(false)
            }, 2000);
        }
    }

    /*
    This component returns a button in which some text's reference have been passed and the button is used to copy the text or redirect to respective application if the text is an email or phone number.
    */
    return (
        <div className='relative inline-block group'>

            {/* It is the tooltip shown above the copy button for the copying*/}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 rounded-md bg-black text-white text-xs px-2   py-1 opacity-0 group-hover:opacity-80 transition-opacity duration-200 pointer-events-none z-10">
                {copied ? "Copied!" : "Copy"}
            </div>


            {/* It is the tooltip shown in the right of the copy button for the redirection*/}
            {redirect && <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 rounded-md bg-white text-blue-700 hover:underline text-xs px-2 py-1 opacity-0 group-hover:opacity-80 transition-opacity duration-200 cursor-pointer z-10">
                <a href={tooltipLink} target='_blank'>Redirect</a>
            </div>}



            {/* It is the copy button used to Copy the text */}
            <button onClick={handleCopy} onMouseEnter={handleRedirect} className="flex items-center justify-center duration-200 hover:bg-gray-400 p-2 rounded-lg cursor-pointer"><figure><img className='w-4 dark:hidden' src={CopyImage} alt="" /><img className='w-4 hidden dark:block' src={CopyImageDarkMode} alt="" /></figure></button>
        </div>
    )
}