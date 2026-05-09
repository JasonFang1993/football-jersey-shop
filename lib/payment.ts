import { createHash } from "crypto";

interface PaymentParams {
  pid: string;
  type: string;
  out_trade_no: string;
  notify_url: string;
  return_url: string;
  name: string;
  money: string;
}

interface SignResult {
  params: Record<string, string>;
  url: string;
}

export function generateOrderNo(): string {
  const now = new Date();
  const timestamp = now.getFullYear().toString() +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    now.getDate().toString().padStart(2, "0") +
    now.getHours().toString().padStart(2, "0") +
    now.getMinutes().toString().padStart(2, "0") +
    now.getSeconds().toString().padStart(2, "0") +
    now.getMilliseconds().toString().padStart(3, "0");
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  return timestamp + random;
}

export function generateSign(params: Record<string, string>, key: string): string {
  // 按ASCII码排序
  const sortedKeys = Object.keys(params).sort((a, b) => {
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      if (a.charCodeAt(i) !== b.charCodeAt(i)) {
        return a.charCodeAt(i) - b.charCodeAt(i);
      }
    }
    return a.length - b.length;
  });

  let signStr = "";
  for (const k of sortedKeys) {
    signStr += `${k}=${params[k]}&`;
  }

  signStr = signStr.slice(0, -1);
  signStr += key;

  return createHash("md5").update(signStr).digest("hex");
}

export function buildPaymentUrl(paymentParams: PaymentParams): SignResult {
  const { pid, type, out_trade_no, notify_url, return_url, name, money } = paymentParams;
  const key = process.env.YPAY_KEY || "";

  const signParams: Record<string, string> = {
    pid,
    type,
    out_trade_no,
    notify_url,
    return_url,
    name,
    money,
    sitename: "Football Jersey Shop",
  };

  const sign = generateSign(signParams, key);

  const allParams: Record<string, string> = {
    ...signParams,
    sign_type: "MD5",
    sign,
  };

  const baseUrl = process.env.YPAY_URL || "https://www.ezfpy.cn";

  return {
    params: allParams,
    url: `${baseUrl}/submit.php`,
  };
}

export function verifySign(params: Record<string, string>, key: string): boolean {
  const { sign, sign_type, ...rest } = params;

  if (!sign) return false;

  const calculatedSign = generateSign(rest, key);
  return calculatedSign === sign;
}
