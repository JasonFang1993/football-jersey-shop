import { createHash } from "crypto";

interface Env {
  YPAY_KEY: string;
}

function verifySign(params: Record<string, string>, key: string): boolean {
  const { sign, sign_type, ...rest } = params;

  if (!sign) return false;

  const sortedKeys = Object.keys(rest).sort((a, b) => {
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      if (a.charCodeAt(i) !== b.charCodeAt(i)) {
        return a.charCodeAt(i) - b.charCodeAt(i);
      }
    }
    return a.length - b.length;
  });

  let signStr = "";
  for (const k of sortedKeys) {
    signStr += `${k}=${rest[k]}&`;
  }
  signStr = signStr.slice(0, -1);
  signStr += key;

  const calculatedSign = createHash("md5").update(signStr).digest("hex");
  return calculatedSign === sign;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const formData = await request.formData();
    const params: Record<string, string> = {};

    formData.forEach((value, key) => {
      params[key] = value.toString();
    });

    const { trade_status, out_trade_no } = params;

    if (!verifySign(params, env.YPAY_KEY)) {
      return new Response("fail", { status: 400 });
    }

    if (trade_status === "TRADE_SUCCESS") {
      console.log(`Payment success: orderNo=${out_trade_no}`);
      // TODO: 更新订单状态
    }

    return new Response("success", { status: 200 });
  } catch (error) {
    console.error("Payment notify error:", error);
    return new Response("fail", { status: 500 });
  }
};
