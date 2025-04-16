// sdk/src/resources/transactionStatus/types.ts

export type TransactionStatusRequestBody = {
  Initiator: string;
  SecurityCredential: string;
  CommandID: 'TransactionStatusQuery';
  TransactionID?: string;
  OriginalConcersationID?: string;
  PartyA: string;
  IdentifierType: '4';
  ResultURL: string;
  QueueTimeOutURL: string;
  Remarks?: string;
  Occasion?: string;
};

export type TransactionStatusResponse = {
  OriginatorConversationID: string;
  ConversationID: string;
  ResponseCode: string;
  ResponseDescription: string;
};