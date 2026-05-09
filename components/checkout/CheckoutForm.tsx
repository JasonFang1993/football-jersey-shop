"use client";

import { useState } from "react";
import { FormField } from "./FormField";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/lib/cart-store";
import type { CheckoutFormData } from "@/lib/types";

const INITIAL_FORM: CheckoutFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};

type PaymentMethod = "alipay" | "stripe";

export function CheckoutForm() {
  const [form, setForm] = useState<CheckoutFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("stripe");
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice());
  const clearCart = useCartStore((state) => state.clearCart);

  const updateField = (field: keyof CheckoutFormData) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.zip.trim()) newErrors.zip = "ZIP code is required";
    if (!form.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStripeCheckout = async () => {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items,
        email: form.email,
      }),
    });

    const result = await response.json() as { success: boolean; error?: string; data?: { url: string } };

    if (!result.success) {
      throw new Error(result.error || "Failed to create checkout session");
    }

    clearCart();
    window.location.href = result.data!.url;
  };

  const handleAlipayCheckout = async () => {
    const response = await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items,
        totalAmount: totalPrice,
      }),
    });

    const result = await response.json() as { success: boolean; error?: string; data?: { paymentUrl: string; params: Record<string, string> } };

    if (!result.success) {
      throw new Error(result.error || "支付请求失败");
    }

    const { paymentUrl, params } = result.data!;

    const formEl = document.createElement("form");
    formEl.method = "POST";
    formEl.action = paymentUrl;
    formEl.style.display = "none";

    Object.entries(params).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value as string;
      formEl.appendChild(input);
    });

    document.body.appendChild(formEl);
    clearCart();
    formEl.submit();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);

    try {
      if (paymentMethod === "stripe") {
        await handleStripeCheckout();
      } else {
        await handleAlipayCheckout();
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert(error instanceof Error ? error.message : "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          label="First Name"
          name="firstName"
          value={form.firstName}
          onChange={updateField("firstName")}
          error={errors.firstName}
          required
          placeholder="John"
        />
        <FormField
          label="Last Name"
          name="lastName"
          value={form.lastName}
          onChange={updateField("lastName")}
          error={errors.lastName}
          required
          placeholder="Doe"
        />
      </div>

      <FormField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={updateField("email")}
        error={errors.email}
        required
        placeholder="john@example.com"
      />

      <FormField
        label="Phone"
        name="phone"
        type="tel"
        value={form.phone}
        onChange={updateField("phone")}
        placeholder="+1 (555) 000-0000"
      />

      <FormField
        label="Address"
        name="address"
        value={form.address}
        onChange={updateField("address")}
        error={errors.address}
        required
        placeholder="123 Main St"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormField
          label="City"
          name="city"
          value={form.city}
          onChange={updateField("city")}
          error={errors.city}
          required
          placeholder="New York"
        />
        <FormField
          label="State"
          name="state"
          value={form.state}
          onChange={updateField("state")}
          placeholder="NY"
        />
        <FormField
          label="ZIP Code"
          name="zip"
          value={form.zip}
          onChange={updateField("zip")}
          error={errors.zip}
          required
          placeholder="10001"
        />
      </div>

      <FormField
        label="Country"
        name="country"
        value={form.country}
        onChange={updateField("country")}
        error={errors.country}
        required
        placeholder="United States"
      />

      <div className="mt-6 p-4 bg-surface border border-border rounded-lg">
        <p className="text-sm font-medium text-foreground mb-3">Payment Method</p>
        <div className="space-y-2">
          <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-background transition-colors">
            <input
              type="radio"
              name="paymentMethod"
              value="stripe"
              checked={paymentMethod === "stripe"}
              onChange={() => setPaymentMethod("stripe")}
              className="w-4 h-4 text-accent"
            />
            <div className="flex-1">
              <p className="text-sm font-medium">Credit/Debit Card</p>
              <p className="text-xs text-muted">Visa, Mastercard, Apple Pay, Google Pay</p>
            </div>
            <svg className="w-8 h-5" viewBox="0 0 32 20" fill="none">
              <rect width="32" height="20" rx="3" fill="#635BFF"/>
              <path d="M13.5 12.5L14.5 7.5H16.5L15.5 12.5H13.5Z" fill="white"/>
              <path d="M20 7.5L18 12.5H16L18 7.5H20Z" fill="white"/>
              <path d="M24 7.5H22.5L21 10L19.5 7.5H18L20.5 12.5H22L24 7.5Z" fill="white"/>
            </svg>
          </label>
          <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-background transition-colors">
            <input
              type="radio"
              name="paymentMethod"
              value="alipay"
              checked={paymentMethod === "alipay"}
              onChange={() => setPaymentMethod("alipay")}
              className="w-4 h-4 text-accent"
            />
            <div className="flex-1">
              <p className="text-sm font-medium">Alipay</p>
              <p className="text-xs text-muted">支付宝支付</p>
            </div>
            <svg className="w-8 h-5" viewBox="0 0 32 20" fill="none">
              <rect width="32" height="20" rx="3" fill="#1677FF"/>
              <text x="16" y="13" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Pay</text>
            </svg>
          </label>
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full mt-6" disabled={isProcessing}>
        {isProcessing
          ? "Processing..."
          : `Pay $${(totalPrice / 100).toFixed(2)}`}
      </Button>
    </form>
  );
}
