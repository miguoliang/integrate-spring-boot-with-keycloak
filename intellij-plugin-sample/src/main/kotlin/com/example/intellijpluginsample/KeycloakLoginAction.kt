package com.example.intellijpluginsample

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.intellij.openapi.actionSystem.AnAction
import com.intellij.openapi.actionSystem.AnActionEvent
import com.intellij.openapi.ui.Messages
import org.apache.http.client.HttpClient
import org.apache.http.client.entity.UrlEncodedFormEntity
import org.apache.http.client.methods.HttpPost
import org.apache.http.impl.client.HttpClients
import org.apache.http.message.BasicNameValuePair

class KeycloakLoginAction : AnAction() {

    companion object {
        const val KEYCLOAK_SERVER_URL: String = "http://localhost:8080"
        const val REALM: String = "myapp"
        const val CLIENT_ID: String = "mycli"
    }

    override fun actionPerformed(e: AnActionEvent) {
        // Code to perform when the action is triggered
        val httpClient = HttpClients.createDefault()
        httpClient.use { client ->
            client.execute(
                HttpPost("$KEYCLOAK_SERVER_URL/realms/$REALM/protocol/openid-connect/auth/device")
                    .apply {
                        addHeader("Content-Type", "application/x-www-form-urlencoded")
                        entity = UrlEncodedFormEntity(
                            listOf(
                                BasicNameValuePair("client_id", CLIENT_ID),
                            )
                        )
                    }
            ).use { response ->
                val content = response.entity.content.bufferedReader().use { it.readText() }
                val objectMapper = jacksonObjectMapper()
                val json = objectMapper.readTree(content)
                val deviceCode = json["device_code"].asText()
                val verificationUriComplete = json["verification_uri_complete"].asText()
                Messages.showDialog(
                    "Please visit the following URL to login: $verificationUriComplete",
                    "Login",
                    arrayOf("OK"),
                    0,
                    Messages.getInformationIcon()
                )
                val accessToken = getToken(client, deviceCode)
                if (accessToken != null) {
                    Messages.showMessageDialog("Access Token: $accessToken", "Success", Messages.getInformationIcon())
                } else {
                    Messages.showMessageDialog("Failed to get access token", "Error", Messages.getErrorIcon())
                }
            }
        }
    }

    private fun getToken(client: HttpClient, deviceCode: String): String? {
        val response = client.execute(
            HttpPost("$KEYCLOAK_SERVER_URL/realms/$REALM/protocol/openid-connect/token")
                .apply {
                    addHeader("Content-Type", "application/x-www-form-urlencoded")
                    entity = UrlEncodedFormEntity(
                        listOf(
                            BasicNameValuePair("client_id", CLIENT_ID),
                            BasicNameValuePair("device_code", deviceCode),
                            BasicNameValuePair("grant_type", "urn:ietf:params:oauth:grant-type:device_code"),
                        )
                    )
                }
        )
        if (response.statusLine.statusCode != 200) {
            return null
        }
        val content = response.entity.content.bufferedReader().use { it.readText() }
        val objectMapper = jacksonObjectMapper()
        val json = objectMapper.readTree(content)
        val accessToken = json["access_token"].asText()
        return accessToken
    }

    override fun update(e: AnActionEvent) {
        // Code to check whether the action is enabled
    }
}

