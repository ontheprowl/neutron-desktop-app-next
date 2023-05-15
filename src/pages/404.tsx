import { useRouter } from "next/router"
import { useEffect } from "react"




export default function Custom404() {

    const router = useRouter();
    useEffect(()=>{
        router.push('companies')
    })

    return <h1>404 - Page Not </h1>
}