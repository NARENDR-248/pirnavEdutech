import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useThemeContext } from "../context/ThemeContext";

import CheckoutHeader from "../components/checkout/CheckoutHeader";
import StudentDetailsForm from "../components/checkout/StudentDetailsForm";
import CourseSummaryCard from "../components/checkout/CourseSummaryCard";
import PriceBreakdown from "../components/checkout/PriceBreakdown";
import CouponSection from "../components/checkout/CouponSection";
import PaymentMethodSelector from "../components/checkout/PaymentMethodSelector";
import TrustBadges from "../components/checkout/TrustBadges";
import FAQMini from "../components/checkout/FAQMini";
import TermsAndConditions from "../components/checkout/TermsAndConditions";
import PaymentButton from "../components/checkout/PaymentButton";

import { COURSE_DATA, PRICE_DATA } from "../data/morckData";

/**
 * CheckoutPage
 * Top-level page that orchestrates the full checkout experience:
 * - Student details form (React Hook Form)
 * - Course summary + pricing
 * - Coupon application
 * - Payment method selection
 * - Terms acceptance
 * - Payment initiation
 *
 * Payment flow (steps 6-12 from the spec) are stubbed as async mock
 * functions ready to be wired up to a real backend / Razorpay or
 * Cashfree SDKs.
 */
const CheckoutPage = () => {
  const { isDark } = useThemeContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onBlur" });

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);

  // Watch consent checkboxes to drive the PaymentButton's disabled state
  const agreeTerms = watch("agreeTerms");
  const agreePrivacy = watch("agreePrivacy");

  // ---- Derived final amount (mirrors PriceBreakdown's calculation) ----
  const { originalPrice, discountPercent, gstPercent } = PRICE_DATA;
  const baseDiscount = Math.round((originalPrice * discountPercent) / 100);
  const priceAfterBaseDiscount = originalPrice - baseDiscount;
  const couponDiscount = appliedCoupon
    ? appliedCoupon.type === "percent"
      ? Math.round((priceAfterBaseDiscount * appliedCoupon.value) / 100)
      : appliedCoupon.value
    : 0;
  const taxableAmount = Math.max(originalPrice - baseDiscount - couponDiscount, 0);
  const finalAmount = taxableAmount + Math.round((taxableAmount * gstPercent) / 100);
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(finalAmount);

  // -------------------------------------------------------------
  // MOCK PAYMENT FLOW — replace each step with real API calls
  // -------------------------------------------------------------

  /** Step 6: Create a payment order on the backend */
  const createPaymentOrder = async (studentDetails) => {
    // const res = await fetch("/api/orders/create", { method: "POST", body: JSON.stringify({...}) });
    // return res.json();
    await new Promise((r) => setTimeout(r, 800));
    return { orderId: "order_mock_12345", amount: finalAmount };
  };

  /** Step 7: Open Razorpay/Cashfree checkout modal */
  const openPaymentModal = async (order) => {
    // const rzp = new window.Razorpay({ key: "...", order_id: order.orderId, ... });
    // rzp.open();
    await new Promise((r) => setTimeout(r, 1000));
    return { paymentId: "pay_mock_67890", signature: "mock_signature" };
  };

  /** Step 8: Verify payment signature on the backend */
  const verifyPayment = async (paymentResult) => {
    // const res = await fetch("/api/payments/verify", { method: "POST", body: JSON.stringify(paymentResult) });
    // return res.json();
    await new Promise((r) => setTimeout(r, 500));
    return { verified: true };
  };

  /** Step 9: Generate invoice */
  const generateInvoice = async (orderId) => {
    // await fetch(`/api/invoices/generate/${orderId}`, { method: "POST" });
    await new Promise((r) => setTimeout(r, 300));
  };

  /** Step 10: Enroll student in the course */
  const enrollStudent = async (studentDetails, courseId) => {
    // await fetch("/api/enrollments", { method: "POST", body: JSON.stringify({ studentDetails, courseId }) });
    await new Promise((r) => setTimeout(r, 300));
  };

  /** Step 12: Add course to "My Learnings" dashboard */
  const addToMyLearnings = async (courseId) => {
    // await fetch("/api/my-learnings", { method: "POST", body: JSON.stringify({ courseId }) });
    await new Promise((r) => setTimeout(r, 200));
  };

  /** Step 11: Redirect to success page */
  const redirectToSuccess = (orderId) => {
    // window.location.href = `/checkout/success?order_id=${orderId}`;
   alert("paymentSuccess ")
  };

  // -------------------------------------------------------------
  // Form submit handler — orchestrates the full flow
  // -------------------------------------------------------------
  const onSubmit = async (studentDetails) => {
    try {
      setIsProcessing(true);

      const order = await createPaymentOrder(studentDetails);
      const paymentResult = await openPaymentModal(order);
      const verification = await verifyPayment(paymentResult);

      if (!verification.verified) {
        throw new Error("Payment verification failed");
      }

      await generateInvoice(order.orderId);
      await enrollStudent(studentDetails, COURSE_DATA.id);
      await addToMyLearnings(COURSE_DATA.id);

      redirectToSuccess(order.orderId);
    } catch (err) {
      console.error("Checkout failed:", err);
      // TODO: surface a user-facing error toast/banner
    } finally {
      setIsProcessing(false);
    }
  };

  const consentGiven = Boolean(agreeTerms) && Boolean(agreePrivacy);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-[#030712] text-white" : "bg-slate-50 text-slate-900"}`}>
      {/* Ambient gradient background accents */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
        <CheckoutHeader currentStep={2} />

        <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 lg:gap-8">
            {/* ---------------- Left column ---------------- */}
            <div className="space-y-6 order-2 lg:order-1">
              <StudentDetailsForm register={register} errors={errors} />
              <PaymentMethodSelector selected={paymentMethod} onSelect={setPaymentMethod} />
              <TrustBadges />
              <FAQMini />
            </div>

            {/* ---------------- Right column (sticky on desktop) ---------------- */}
            <div className="space-y-6 order-1 lg:order-2">
              <div className="lg:sticky lg:top-8 space-y-6">
                <CourseSummaryCard course={COURSE_DATA} />
                <CouponSection
                  appliedCoupon={appliedCoupon}
                  onApply={setAppliedCoupon}
                  onRemove={() => setAppliedCoupon(null)}
                />
                <PriceBreakdown priceData={PRICE_DATA} appliedCoupon={appliedCoupon} />
                <TermsAndConditions register={register} errors={errors} />
                <PaymentButton
                  isLoading={isProcessing}
                  disabled={!consentGiven}
                  amountLabel={formattedAmount}
                />
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center text-xs text-slate-500"
        >
          © {new Date().getFullYear()} Pirnav Edutech. All rights reserved. Need help?{" "}
          <a href="#" className={`hover:underline ${isDark ? "text-cyan-400" : "text-cyan-600"}`}>
            Contact support
          </a>
        </motion.footer>
      </div>
    </div>
  );
};

export default CheckoutPage;
