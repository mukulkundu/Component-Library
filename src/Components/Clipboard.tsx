import Clip from "../CodeModules/Clip"
import { useRef } from "react"


export default function Clipboard() {

    //These are all the refs used in this page that are used to copy the text of any particular HTML tag.
    const textref = useRef<HTMLInputElement>(null)
    const inputref = useRef<HTMLInputElement>(null)
    const componentCode = useRef(null)
    const importref = useRef(null)
    const hookref = useRef(null)
    const usingref = useRef(null)
    const usingclipref = useRef(null)


    //It is taking value from the textbox and giving to the span tag which is visually hidden because in the clip component, to copy we need textContent from an htmlinputelement type but a textbox input uses .value, so this gives the value to span and then we access it from span only.
    const handleInputChange = () => {
        if (inputref.current && textref.current) {
            textref.current.textContent = inputref.current.value;
        }
    };


    //It contains the code of the main Clip component which is used for the whole Copy to Clipboard functionality
    const code = `
import { useState } from 'react';

type ClipProps = {
  textToCopy: React.RefObject<HTMLElement> | React.RefObject<null>;
};


export default function Clip({textToCopy}:ClipProps){

    const [copied, useCopied] = useState(false);  //used for changing the text of the button

    const handleCopy = () => {

        if(textToCopy.current){
            const text = textToCopy.current.textContent || "";
            navigator.clipboard.writeText(text);
            useCopied(true)  //changes the text to copied from copy
            setTimeout(() => {
                useCopied(false)
            }, 2000);  //it makes the button text back to copy
        }
    }

    return(
        <>
        <button onClick={handleCopy} className="flex items-center duration-200
         hover:bg-gray-300 border-1 px-2 pb-1 rounded-lg
         cursor-pointer">{copied ? "Copied!" : "Copy"}</button>
        </>
    )
}
    `
    //It contains the import statement of useRef used for showcasing in the page
    const importStatement = `
import { useRef } from "react"
    `
    //It contains the default null value ref varialble statement used for showcasing in the page
    const hookStatement = `
const textref = useRef(null)
    `
    //It contains a sample HTML tag with ref to showcase how to use the ref to use the copy functionality
    const usingRef = `
<article className="px-4" ref={textref}>This is the sample text to Copy</article>
    `
    //It contains the statement that is used to use the copy component with a sample ref in it
    const usingClip = `
<Clip textToCopy={textref} />
    `

    return (
        <div className="pt-14 dark:text-white">
            <h1 className="ml-24 text-4xl font-medium">Copy to Clipboard</h1>

            <article className="ml-24 mt-2 text-sm text-gray-700">
                An easy to use component to copy your text from the web page and can also redirect to the respective app if the text is email or phone.
            </article>

            <section className="ml-24 mt-12 bg-gray-200 dark:bg-[#1d1c1c] h-50 rounded-lg flex items-center justify-center w-[50%]">
                <div className="grid gap-3">
                    <p>Enter some text and copy from the button.</p>
                    <div className="flex items-center justify-center">
                        <div>
                            {/* input field which is taking input from user and first ref is taken from here */}
                            <input type="text" onChange={handleInputChange} ref={inputref} className="bg-gray-600 rounded-lg text-white p-2" placeholder="Enter Text" />

                            {/* visually hidden span tag which takes the ref in its ref and then gives to clip component, this enables us to work around the accessing of text using only .textContent in the clip and not altering code of the clip component */}
                            <span
                                ref={textref}
                                className="sr-only"
                                aria-hidden="true"
                            ></span>
                        </div>

                        <Clip textToCopy={textref} />
                    </div>
                </div>
            </section>

            <section className="ml-24 mt-12">
                <h2 className="text-3xl">Usage</h2>
                <article>
                    <ol>
                        <li className="py-4 w-[80%]">
                            <p>1. Create a New tsx file named Clip.tsx and paste the code in it</p>
                            <div className="border rounded-2xl bg-gray-200 dark:bg-[#1d1c1c] py-4 px-8 text-sm">
                                <pre className="flex items-start justify-between">
                                    <code ref={componentCode}>
                                        {code}
                                    </code>
                                    <div className="mt-2">
                                        <Clip textToCopy={componentCode} />
                                    </div>
                                </pre>
                            </div>
                        </li>

                        <li className="py-4 w-[80%]">
                            <p>2. Now, import useRef Hook in the file you want to use the component</p>
                            <div className="border rounded-2xl bg-gray-200 dark:bg-[#1d1c1c] px-8 text-sm">
                                <pre className="flex items-center justify-between">
                                    <code className="flex" ref={importref}>
                                        {importStatement}
                                    </code>
                                    <div>
                                        <Clip textToCopy={importref} />
                                    </div>
                                </pre>
                            </div>
                        </li>

                        <li className="py-4 w-[80%]">
                            <p>3. Create a constant variable and assign it the useRef hook as null</p>
                            <div className="border rounded-2xl bg-gray-200 dark:bg-[#1d1c1c] px-8 text-sm">
                                <pre className="flex items-center justify-between">
                                    <code ref={hookref}>
                                        {hookStatement}
                                    </code>
                                    <div>
                                        <Clip textToCopy={hookref} />
                                    </div>
                                </pre>
                            </div>
                        </li>

                        <li className="py-4 w-[80%]">
                            <p>4. Use the Ref in the text that you want, like in the example</p>
                            <div className="border rounded-2xl bg-gray-200 dark:bg-[#1d1c1c] px-8 text-sm">
                                <pre className="flex items-center justify-between">
                                    <code ref={usingref}>
                                        {usingRef}
                                    </code>
                                    <div>
                                        <Clip textToCopy={usingref} />
                                    </div>
                                </pre>
                            </div>
                        </li>

                        <li className="py-4 w-[80%]">
                            <p>5. Finally, use the Clip component while passing it the Ref hook</p>
                            <div className="border rounded-2xl bg-gray-200 dark:bg-[#1d1c1c] px-8 text-sm">
                                <pre className="flex items-center justify-between">
                                    <code ref={usingclipref}>
                                        {usingClip}
                                    </code>
                                    <div>
                                        <Clip textToCopy={usingclipref} />
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