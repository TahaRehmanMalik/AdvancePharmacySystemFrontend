import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "../Stripe.css";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../features/order/orderSlice";


const stripePromise = loadStripe("pk_test_51NlrSwIHSZHAfpN8k7S0RQFN37iulRX8SXAWg5MdCwogFnofD1pyJmtG2a8eIAdcPnWVTLmGNIQgivJisareEGS300R9IRD7y4");

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
const currentOrder=useSelector(selectCurrentOrder)
  useEffect(() => {
   
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount:currentOrder.totalAmount,orderId:currentOrder.id }),
     
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}