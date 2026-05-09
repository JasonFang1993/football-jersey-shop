import { createHash } from "crypto";

interface Env {
  YPAY_URL: string;
  YPAY_PID: string;
  YPAY_KEY: string;
  YPAY_NOTIFY_URL: string;
  YPAY_RETURN_URL: string;
}

interface CartItem {
  productId: string;
  name: string;
  image: string;
  size: string;
  price: number;
  quantity: number;
}

interface PaymentRequest {
  items: CartItem[];
  totalAmount: number;
}

function generateOrderNo(): string {
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

function generateSign(params: Record<string, string>, key: string): string {
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

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    const body: PaymentRequest = await request.json();
    const { items, totalAmount } = body;

    if (!items || items.length === 0) {
      return Response.json(
        { success: false, error: "购物车为空" },
        { status: 400, headers: corsHeaders }
      );
    }

    const orderNo = generateOrderNo();
    const productNames = items.map((item) => item.name).join(", ");
    const amount = (totalAmount / 100).toFixed(2);

    const signParams: Record<string, string> = {
      pid: env.YPAY_PID,
      type: "alipay",
      out_trade_no: orderNo,
      notify_url: env.YPAY_NOTIFY_URL,
      return_url: `${env.YPAY_RETURN_URL}?orderNo=${orderNo}`,
      name: productNames,
      money: amount,
      sitename: "Football Jersey Shop",
    };

    const sign = generateSign(signParams, env.YPAY_KEY);

    const allParams: Record<string, string> = {
      ...signParams,
      sign_type: "MD5",
      sign,
    };

    return Response.json({
      success: true,
      data: {
        orderNo,
        paymentUrl: `${env.YPAY_URL}/submit.php`,
        params: allParams,
      },
    }, { headers: corsHeaders });
  } catch (error) {
    console.error("Payment API error:", error);
    return Response.json(
      { success: false, error: "支付请求处理失败" },
      { status: 500, headers: corsHeaders }
    );
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
