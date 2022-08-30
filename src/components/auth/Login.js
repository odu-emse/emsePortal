const Login = () => {

    const GoogleAuthUrl = (client_id, redirect_uri, scope) => {
        return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=${encodeURIComponent(scope)}`;
    }

    return <div>
        <a href={GoogleAuthUrl(
            "179547029989-eueljn9jl5gqgforq4jpav2qddfhqhlu.apps.googleusercontent.com",
            "http://localhost:3000/redirect",
            "email profile"
        )}>Login With Google</a>
    </div>
}

export default Login;