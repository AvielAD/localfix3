'use client'
import useModal from "@/Utilities/CustomHooks/useModal"
import useToast from "@/Utilities/CustomHooks/useToast"
import NewModal from '@/NewComponents/Modal'
import NewToast from '@/NewComponents/Toast'

const Index = ()=>{
    const modal1 = useModal()
    const toast1 = useToast()

    return (<>
   <NewModal show={modal1.show}>
            Mensaje Modal
        </NewModal>

        <NewToast show={toast1.toast.show} succedded={toast1.toast.response.Succedded}>
            {toast1.toast.response.Message}
        </NewToast>

        <button onClick={modal1.changeShow}>
            Abrir Modal
        </button>

        <button onClick={()=>toast1.changeToast({Message: "Toast prueba", Succedded: false})}>
            Abrir Toast
        </button>
           
    </>)
}

export default Index
/**

 */