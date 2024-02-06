import { AddMenu } from "@/DTOS/menuNav/addmenu"
import { useRouter } from "next/navigation"

const AddMenu=(addMenu: AddMenu)=>{
    const router = useRouter()

    const clickMenu =()=>{
        router.push(addMenu.url)
    }
    return (
        <>
            <div className="float-end">
                <i onClick={()=>{ clickMenu() }} className="bi bi-plus-square" style={{fontSize: "4rem"}}></i>
            </div>
        </>
    )
}

export default AddMenu