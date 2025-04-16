export type AccountBalanceRequestBody = {
    Initiator: string;
    SecurityCredential: string;
    CommandID: 'AccountBalance';
    PartyA: string;
    IdentifierType: '4';
    Remarks?: string;
    QueueTimeOutURL: string;
    ResultURL: string;
};
export type AccountBalanceResponse = {
    OriginatorConversationID: string;
    ConversationID: string;
    ResponseCode: string;
    ResponseDescription: string;
};
