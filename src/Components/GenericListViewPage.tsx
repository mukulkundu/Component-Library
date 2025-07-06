import GenericListView from "../CodeModules/GenericListView";


export default function GenericListViewPage(){



    return(

        <>
        <div className="pt-14 dark:text-white">
                    <h1 className="text-4xl font-medium text-center">Generic List View</h1>
        
                    <article className="mt-2 text-sm text-gray-700 text-center mb-8">
                        A reusable data grid component with pagination, debounced search, and dynamic column visibility.
                    </article>
        
                    
                        <GenericListView/>
                    
        
        
                </div>
        </>
    )
}