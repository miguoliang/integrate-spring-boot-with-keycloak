import { Log, UserManager, WebStorageStateStore } from "oidc-client-ts";

export const USER_SCOPE: string = "openid";

export const SCOPES = import.meta.env.VITE_OIDC_SOCPES ?? "openid";
// Create cognito sign-up & sign-out url
const query = new URLSearchParams();
query.append("client_id", import.meta.env.VITE_OIDC_CLIENT_ID);
query.append("response_type", "code");
query.append("scope", SCOPES);
query.append(
    "redirect_uri",
    import.meta.env.VITE_OIDC_REDIRECT_URI ?? window.location.origin,
);
export const SIGN_UP_URL =
    import.meta.env.VITE_OIDC_SIGN_UP_URL &&
    `${import.meta.env.VITE_OIDC_SIGN_UP_URL}/?${query.toString()}`;
export const SIGN_OUT_URL =
    import.meta.env.VITE_OIDC_SIGN_OUT_URL ??
    (SIGN_UP_URL && SIGN_UP_URL.replace("signup", "logout"));

// Set oidc-client-ts log level
Log.setLogger(console);
Log.setLevel(Log.DEBUG);

export const userManager = new UserManager({
    authority: import.meta.env.VITE_OIDC_AUTHORITY,
    client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
    redirect_uri:
        import.meta.env.VITE_OIDC_REDIRECT_URI ?? window.location.origin,
    // ...
    revokeTokenTypes: ["refresh_token"],
    automaticSilentRenew: false,
    client_secret: import.meta.env.VITE_OIDC_CLIENT_SECRET,
    scope: SCOPES,
    userStore: new WebStorageStateStore({ store: window.localStorage }),
});