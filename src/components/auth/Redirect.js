import { useEffect } from "react"
import { useLocation } from "react-router";
import login from "../../scripts/auth/login";

const Redirect = () => {

    let location = useLocation();
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const code = query.get("code");

        if (code == null) {
            return
        }

        login(code)
    });

    return <div>
        Recieved<br/>
    </div>
}

export default Redirect