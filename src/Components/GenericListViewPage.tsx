import GenericListView from "../CodeModules/GenericListView";


export default function GenericListViewPage(){



    return(

        <>
        <div className="pt-14 ml-24 dark:text-white">
                    <h1 className="text-4xl font-medium">Generic List View</h1>
        
                    <article className="mt-2 text-sm text-gray-700">
                        A reusable data grid component with pagination, debounced search, and dynamic column visibility.
                    </article>
        
                    <section className="mt-12 bg-gray-200 dark:bg-[#1d1c1c] h-50 rounded-lg flex items-center justify-center w-[50%]">
                        <GenericListView/>
                    </section>
        
        
                </div>
        </>
    )
}