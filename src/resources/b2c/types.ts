// sdk/src/resources/b2c/types.ts

export type B2CRequestBody = {
  OriginatorConversationID: string;
  InitiatorName: string;
  SecurityCredential: string;
  CommandID: 'BusinessPayment' | 'SalaryPayment' | 'PromotionPayment';
  PartyA: string;
  PartyB: string;
  Amount: number;
  Remarks: string;
  Occassion?: string;
  QueueTimeOutURL: string;
  ResultURL: string;
};

export type B2CResponse = {
  ConversationID: string;
  OriginatorConversationID: string;
  ResponseCode: string;
  ResponseDescription: string;
};