const Index = (props: { title: string, value: string, icon: string }) => {
    return (
        <div className="">
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-xs dark:bg-secondary-800">
                <div
                    className="p-4 mr-4 text-theme5-500 bg-theme5-100 rounded-full dark:text-theme5-100 dark:bg-theme5-500"
                >
                    <i className={props.icon}></i>
                </div>
                <div className="">
                    <p
                        className="mb-2 text-sm font-medium text-secondary-600 dark:text-secondary-400"
                    >
                        {props.title}
                    </p>
                    <p
                        className="text-lg font-semibold text-secondary-700 dark:text-secondary-200"
                    >
                        {props.value}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Index