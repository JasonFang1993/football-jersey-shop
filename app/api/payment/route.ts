import { NextRequest, NextResponse } from "next/server";
import { buildPaymentUrl, generateOrderNo } from "@/lib/payment";
import type { CartItem } from "@/lib/types";

interface PaymentRequest {
  items: CartItem[];
  totalAmount: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentRequest = await request.json();
    const { items, totalAmount } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "购物车为空" },
        { status: 400 }
      );
    }

    const orderNo = generateOrderNo();
    const productNames = items.map((item) => item.name).join(", ");
    const amount = (totalAmount / 100).toFixed(2);

    const pid = process.env.YPAY_PID || "";
    const notifyUrl = process.env.YPAY_NOTIFY_URL || "";
    const returnUrl = process.env.YPAY_RETURN_URL || "";

    const paymentData = buildPaymentUrl({
      pid,
      type: "alipay",
      out_trade_no: orderNo,
      notify_url: notifyUrl,
      return_url: `${returnUrl}?orderNo=${orderNo}`,
      name: productNames,
      money: amount,
    });

    return NextResponse.json({
      success: true,
      data: {
        orderNo,
        paymentUrl: paymentData.url,
        params: paymentData.params,
        debug: {
          pid,
          notifyUrl,
          returnUrl: `${returnUrl}?orderNo=${orderNo}`,
          amount,
        },
      },
    });
  } catch (error) {
    console.error("Payment API error:", error);
    return NextResponse.json(
      { success: false, error: "支付请求处理失败" },
      { status: 500 }
    );
  }
}
