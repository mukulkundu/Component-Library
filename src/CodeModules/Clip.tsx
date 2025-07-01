import { useState } from 'react';
import CopyImage from '../assets/copy.svg'
import CopyImageDarkMode from '../assets/copy-darkmode.svg'


//It defines that what is the type of prop(texttoCopy) that is coming from the page and then is used with clipboard, it is either an HTML element which have text inside it or it is Null.
type ClipProps = {
    textToCopy: React.RefObject<HTMLElement> | React.RefObject<null>,
    type ?: 'email'|'phone'
};

/*
input, output, computation
*/
export default function Clip({ textToCopy,  }: ClipProps) {

    //This useState is used to change the text of the tooltip used with the copy icon from 'Copy' to 'Copied!' by using a boolean value
    const [copied, setCopied] = useState(false);

    //These are used for the redirection button when hovered on the copy button, if the text is email or phone number a redirect button comes which redirects user to the respective application, tooltiplink is the link which contains the url to redirect and redirect is used to conditionally show the redirect button
    const [tooltipLink, setTooltipLink] = useState<string | undefined>(undefined)
    const [redirect, setRedirect] = useState(false)

    //This function handles the whole redirection that checks if text is a email or phone and then handles the process
    const handleRedirect = () => {

        if (textToCopy.current) {
            const text = textToCopy.current.textContent?.trim() || "";

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^\+?\d{10,15}$/;

            //Regex is used to match the text with required format and on basis of it the required field are setted
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

    const handleCopy = () => {

        //In the if condition the ref prop is taken and its current value is checked for the initialization of the if block, after the initialization the text is kept in the variable 'text', then it is saved on the clipboard using the writeText() command.
        if (textToCopy.current) {
            const text = textToCopy.current.textContent || "";
            navigator.clipboard.writeText(text);

            //After the copying the copied state is change to true and the tooltip shows the text in it as 'Copied!', then a set timeout is used which then changes the boolean false in 2 sec making the tooltip's text back as 'Copy'
            setCopied(true)
            setTimeout(() => {
                setCopied(false)
            }, 2000);
        }
    }

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