interface Env {
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature") || "";

    // 简化的签名验证（生产环境应使用完整验证）
    if (!signature) {
      return Response.json(
        { error: "Missing signature" },
        { status: 400 }
      );
    }

    let event;
    try {
      event = JSON.parse(body);
    } catch {
      return Response.json(
        { error: "Invalid payload" },
        { status: 400 }
      );
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        console.log("Payment successful:", session.id);

        // TODO: 处理订单逻辑
        // 1. 更新订单状态
        // 2. 发送确认邮件
        // 3. 更新库存

        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        console.log("PaymentIntent succeeded:", paymentIntent.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return Response.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
};
