// sdk/src/resources/reversal/types.ts

export type ReversalRequestBody = {
  Initiator: string;
  SecurityCredential: string;
  CommandID: 'TransactionReversal';
  TransactionID: string;
  Amount: string;
  OriginalConcersationID: string;
  PartyA: string;
  RecieverIdentifierType: '11';
  ReceiverParty: string;
  ResultURL: string;
  QueueTimeOutURL: string;
  Remarks?: string;
  Occasion?: string;
};

export type ReversalResponse = {
  OriginatorConversationID: string;
  ConversationID: string;
  ResponseCode: string;
  ResponseDescription: string;
};