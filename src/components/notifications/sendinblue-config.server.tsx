import * as SibSDK from '@sendinblue/client';


export const apiInstance = new SibSDK.TransactionalEmailsApi();


export const sendTeamEmail = async (email: string, name: string, params: { [x: string]: any }, templateId: number) => {
    apiInstance.setApiKey(SibSDK.TransactionalEmailsApiApiKeys.apiKey, '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');

    const emailRequestResponse = await apiInstance.sendTransacEmail({
        "sender": {
            "name": "Team Neutron",
            "email": "team@neutron.money"
        },
        "to": [
            {
                "email": email,
                "name": name
            }
        ],
        "params": params,
        "templateId": templateId
    }
    );

    return emailRequestResponse.response;
}