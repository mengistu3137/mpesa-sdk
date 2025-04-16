export type RegisterURLRequestBody = {
  ShortCode: string;
  ResponseType: 'Completed' | 'Cancelled';
  ConfirmationURL: string;
  ValidationURL: string;
};
export type RegisterURLResponse = {
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
};