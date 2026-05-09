interface Env {
  STRIPE_SECRET_KEY: string;
}

interface CartItem {
  productId: string;
  name: string;
  image: string;
  size: string;
  price: number;
  quantity: number;
}

interface CheckoutRequest {
  items: CartItem[];
  email: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    const body: CheckoutRequest = await request.json();
    const { items, email } = body;

    if (!items || items.length === 0) {
      return Response.json(
        { success: false, error: "Cart is empty" },
        { status: 400, headers: corsHeaders }
      );
    }

    const origin = new URL(request.url).origin;

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image.startsWith("http") ? item.image : `${origin}${item.image}`],
          metadata: {
            size: item.size,
            productId: item.productId,
          },
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));

    const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        "payment_method_types[]": "card",
        "mode": "payment",
        "success_url": `${origin}/checkout/confirmation?session_id={CHECKOUT_SESSION_ID}`,
        "cancel_url": `${origin}/checkout`,
        "customer_email": email,
        "metadata[items]": JSON.stringify(items.map((i) => ({
          productId: i.productId,
          name: i.name,
          size: i.size,
          quantity: i.quantity,
        }))),
        ...Object.fromEntries(
          lineItems.flatMap((item, i) => [
            [`line_items[${i}][price_data][currency]`, item.price_data.currency],
            [`line_items[${i}][price_data][product_data][name]`, item.price_data.product_data.name],
            [`line_items[${i}][price_data][product_data][images][0]`, item.price_data.product_data.images[0]],
            [`line_items[${i}][price_data][unit_amount]`, String(item.price_data.unit_amount)],
            [`line_items[${i}][quantity]`, String(item.quantity)],
          ])
        ),
      }),
    });

    const session = await stripeResponse.json() as { id: string; url: string; error?: { message: string } };

    if (session.error) {
      throw new Error(session.error.message);
    }

    return Response.json({
      success: true,
      data: {
        sessionId: session.id,
        url: session.url,
      },
    }, { headers: corsHeaders });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return Response.json(
      { success: false, error: "Failed to create checkout session" },
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
