'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Dashboard() {
    const router = useRouter()

    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem('token')
            console.log(token);

            if (!token) {
                router.push('/login')
            }
        }
    }, [router])

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}