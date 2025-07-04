import { useNavigate, Link } from "react-router-dom";



export default function NavMenu(){

    const items = [
        {
            name: 'Copy to Clipboard',
            slug: 'copy-to-clipboard'
        },
        {
            name: 'Alert Dialog',
            slug: 'alert-dialog'
        },
        {
            name: 'Theme Toggler',
            slug: 'theme-toggler'
        },
        {
            name: 'Toast',
            slug: 'toast'
        },
        {
            name: 'Counter',
            slug: 'counter'
        },
        {
            name: 'Generic List View',
            slug: 'generic-list-view'
        },
    ]


    const navigate = useNavigate();

    return(
        <div className="h-full flex flex-col">
            <div className="px-4 text-xl h-16 flex items-center justify-center border-b border-gray-500"><Link to='/'>Component Library</Link></div>
            <ul className=" text-lg flex-1 overflow-y-auto">
                {items.map((item) => (
                    <li key={item.name} className=" py-5 px-6 text-lg hover:bg-[#3f3564] cursor-pointer duration-75" onClick={() => navigate(item.slug)}>
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    )

}