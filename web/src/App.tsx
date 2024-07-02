import './App.css'
import {useAuth} from "./useAuth";

const url = new URL(window.location.href);
const auth = useAuth.getState();
if (
    url.searchParams.has("code") &&
    url.searchParams.has("state")
) {
    auth.userManager
        .signinRedirectCallback()
        .then(async () => {
            window.history.replaceState({}, document.title, "/");
            const user = await auth.userManager.getUser();
            auth.setUser(user ?? undefined);
            auth.setAuthenticated(true);
        })
        .catch((err) => {
            console.error(err);
            auth.setUser(undefined);
            auth.setAuthenticated(false);
        });
} else {
    auth.userManager.getUser().then((user) => {
        if (user && !user.expired) {
            auth.setUser(user);
            auth.setAuthenticated(true);
            return;
        }
        auth.setUser(user ?? undefined);
        auth.setAuthenticated(!!user);
    });

}

function App() {
    const auth = useAuth();

    const sayHello = () => {
        console.log(auth.isAuthenticated, auth.user?.access_token)
        fetch("http://localhost:8081/hello", {
            method: "GET",
            headers: !auth.isAuthenticated ? {} : {
                Authorization: `Bearer ${auth.user?.access_token}`,
            },
        }).then(res => {
            if (res.ok) {
                alert("OK")
            } else {
                alert("NG")
            }
        });
    }

    return (
        <>
            {!auth.isAuthenticated && <button onClick={() => auth.userManager.signinRedirect()}>Sign In</button>}
            {auth.isAuthenticated && <button onClick={() => auth.signOut()}>Sign Out, {auth.user?.profile.preferred_username}</button>}
            <button onClick={sayHello}>Hello</button>
        </>
    )
}

export default App
