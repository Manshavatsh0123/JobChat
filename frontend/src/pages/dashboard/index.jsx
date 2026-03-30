'use client'

import { getAllPosts } from "@/config/redux/action/postAction";
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export default function Dashboard() {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/login');
        } else {
            console.log("DISPATCHING getAllPosts");
            dispatch(getAllPosts());
        }
    }, [router, dispatch]);

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}