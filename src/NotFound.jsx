import { Navigate } from "react-router-dom";


export default function NotFound () {
    return (
        <>
            <h1>Error 404: Page Not Found</h1>
            <Navigate to='/' />
        </>
    )
}