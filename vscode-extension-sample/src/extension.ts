import * as vscode from "vscode";
import { Issuer, generators } from "openid-client";

let outputChannel: vscode.OutputChannel;

export async function activate(context: vscode.ExtensionContext) {
  outputChannel = vscode.window.createOutputChannel("My Extension");
  outputChannel.appendLine("Extension activated!");
  outputChannel.show();

  const keycloakIssuer = await Issuer.discover(
    "http://localhost:8080/realms/myapp/.well-known/openid-configuration"
  );
  const client = new keycloakIssuer.Client({
    client_id: "mycli",
    redirect_uris: [
      "vscode://undefined_publisher.vscode-extension-sample/callback",
    ],
    response_types: ["code"],
    tls_client_certificate_bound_access_tokens: false,
    token_endpoint_auth_method: "none",
  });

  const state = generators.state();
  const codeVerifier = generators.codeVerifier();
  const codeChallenge = generators.codeChallenge(codeVerifier);

  const authorizationUrl = client.authorizationUrl({
    scope: "openid profile email",
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  let disposable = vscode.commands.registerCommand(
    "extension.login",
    async () => {
      vscode.env.openExternal(vscode.Uri.parse(authorizationUrl));
    }
  );

  context.subscriptions.push(disposable);

  context.subscriptions.push(
    vscode.window.registerUriHandler({
      handleUri: async (uri: vscode.Uri) => {
        const params = new URLSearchParams(uri.query);
        const code = params.get("code") ?? undefined;
        const receivedState = params.get("state") ?? undefined;

        const tokenSet = await client.callback(
          "vscode://undefined_publisher.vscode-extension-sample/callback",
          { code, state: receivedState, iss: keycloakIssuer.issuer },
          { code_verifier: codeVerifier, state: receivedState}
        );
        const userInfo = await client.userinfo(tokenSet.access_token ?? "");
        outputChannel.appendLine("TokenSet: " + JSON.stringify(tokenSet));
      },
    })
  );
}

export function deactivate() {
  // Nothing to do
  outputChannel.appendLine("Extension deactivated");
}
