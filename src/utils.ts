// sdk/src/utils.ts

import { Buffer } from 'buffer';

export function generateSTKPushPassword(
  businessShortCode: string,
  passkey: string,
  timestamp: string
): string {
  const combined = `${businessShortCode}${passkey}${timestamp}`;
  return Buffer.from(combined).toString('base64');
}

export function formatTimestamp(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = ('0' + (now.getMonth() + 1)).slice(-2);
  const day = ('0' + now.getDate()).slice(-2);
  const hour = ('0' + now.getHours()).slice(-2);
  const minute = ('0' + now.getMinutes()).slice(-2);
  const second = ('0' + now.getSeconds()).slice(-2);
  return `${year}${month}${day}${hour}${minute}${second}`;
}