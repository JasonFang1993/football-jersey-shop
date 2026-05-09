import { NextRequest, NextResponse } from "next/server";
import { verifySign } from "@/lib/payment";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const params: Record<string, string> = {};

    formData.forEach((value, key) => {
      params[key] = value.toString();
    });

    const { trade_status, out_trade_no, sign } = params;
    const key = process.env.YPAY_KEY || "";

    if (!verifySign(params, key)) {
      return new NextResponse("fail", { status: 400 });
    }

    if (trade_status === "TRADE_SUCCESS") {
      console.log(`Payment success: orderNo=${out_trade_no}`);
    }

    return new NextResponse("success", { status: 200 });
  } catch (error) {
    console.error("Payment notify error:", error);
    return new NextResponse("fail", { status: 500 });
  }
}
