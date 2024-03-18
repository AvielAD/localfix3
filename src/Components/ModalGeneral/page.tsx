import { modaldto } from "@/DTOS/modalgeneral/modal.dto"

const Page = (props: modaldto) => {
    return props.show ? (
        <>

            <div  className={`${props.show ? 'd-block' : 'd-none'}`}>
                <div onClick={()=>props.close()} style={{ height: '100vh' }}
                    className="w-100 z-1 position-absolute" >
                    <div className="d-flex h-100 justify-content-center align-items-center">
                        <div onClick={(e) => e.stopPropagation()} className="w-75 h-75 bg-primary rounded-3">
                            <div className="d-flex justify-content-center">
                                <div className="w-75">
                                    {props.children}

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    ) : null
}

export default Page