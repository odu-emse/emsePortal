import { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import login from "../../scripts/auth/login";

const Redirect = () => {

    let location = useLocation();
    let history = useHistory()

    useEffect(() => {
        (async () => {
            const query = new URLSearchParams(location.search);
            const code = query.get("code");

            if (code == null) {
                return
            }

            const response = await login(code);
            window.sessionStorage.setItem("accessToken", response.data.data.login.accessToken);
            history.push('/dashboard')
        })();
    });

    return <div>
        Logging in...<br/>
    </div>
}

export default Redirect