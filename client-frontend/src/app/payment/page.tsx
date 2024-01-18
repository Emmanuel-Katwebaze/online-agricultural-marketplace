"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { savePaymentMethod } from "../../../redux/slices/cartSlice";
import CheckOutWizard from "@/components/CheckOutWizard";

export default function PaymentMethodPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const { shippingAddress, paymentMethod } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }
    setValue("paymentMethod", paymentMethod);
  }, [paymentMethod, router, setValue, shippingAddress.address]);

  const submitHandler = ({ paymentMethod }: any) => {
    //work on this type
    dispatch(savePaymentMethod(paymentMethod));
    router.push("/placeorder");
  };
  return (
    <div>
      <CheckOutWizard activeStep={2} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Payment Method</h1>
        {["Paypal", "Stripe", "CashOnDelivery"].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              key={payment}
              className="p-2 outline-none focus:ring-0"
              id={payment}
              type="radio"
              value={payment}
              {...register("paymentMethod", {
                required: "Please select payment method",
              })}
            />
            <label className="p-2" htmlFor={payment}>
              {payment}
            </label>
            {errors.paymentMethod && (
              <div className="text-red-500">
                {errors.paymentMethod.message as string}
                {/* {errors.paymentMethod.message} gives Type 'string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined' is not assignable to type 'ReactNode'.
  Type 'FieldError' is not assignable to type 'ReactNode'.
    Type 'FieldError' is missing the following properties from type 'ReactPortal': children, props, keyts(2322) */}
              </div>
            )}
          </div>
        ))}
        <div className="mb-4 flex justify-between">
            <button onClick={() => router.push('/shipping')} type="button" className="default-button">Back</button>
            <button className="primary-button">Next</button>
        </div>
      </form>
    </div>
  );
}
