import { Link } from "react-router-dom";


export default function NotFound () {
    return (
        <>
            <h1>Error 404: Page Not Found</h1>
            <Link to='/'>Torna alla Home</Link>
        </>
    )
}