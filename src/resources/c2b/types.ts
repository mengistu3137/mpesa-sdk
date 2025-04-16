// sdk/src/resources/simulateC2B/types.ts

export type C2BRequestBody = {
  CommandID: 'CustomerPayBillOnline';
  Amount: string;
  Msisdn: string;
  BillRefNumber: string;
  ShortCode: string;
};

export type C2BResponse = {
  ConversationID: string;
  OriginatorConversationID: string;
  ResponseCode: string;
  ResponseDescription: string;
};