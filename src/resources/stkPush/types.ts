export type STKPushRequestBody = {
   MerchantRequestID: string;
  BusinessShortCode: string;
  Password: string;
  Timestamp: string;
  TransactionType: 'CustomerPayBillOnline' | 'CustomerBuyGoodsOnline';
  Amount: number;
  PartyA: string; // Customer MSISDN
  PartyB: string; // Business Shortcode
  PhoneNumber: string; // Customer MSISDN
  CallBackURL: string;
  AccountReference: string;
  TransactionDesc: string;
};
export type STKPushResponse = {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
};