"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export function CheckoutForm() {
  const router = useRouter();
  const [form, setForm] = useState<CheckoutFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    clearCart();
    router.push("/checkout/confirmation");
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

      <Button type="submit" size="lg" className="w-full mt-6">
        Place Order
      </Button>
    </form>
  );
}
