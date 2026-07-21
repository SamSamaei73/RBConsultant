import { useEffect, useState } from "react";
import emailjs from "emailjs-com";

const BRAND = "#3b847d";

const SERVICE_ID = "service_1uhagf2";
const TEMPLATE_ID = "template_v4flhlq";
const PUBLIC_KEY = "TXWvG1eYGG7BWrJco";
const TO_EMAIL = "raziyeh@rbconsultant.co.uk";

const EMPTY_FORM = { name: "", email: "", phone: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [popup, setPopup] = useState(null); // { type: "success" | "error", title, message }

  useEffect(() => {
    if (!popup || popup.type !== "success") return;
    const t = setTimeout(() => setPopup(null), 4000);
    return () => clearTimeout(t);
  }, [popup]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Full name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email address.";
    if (!form.phone.trim()) next.phone = "Phone number is required.";
    if (!form.message.trim()) next.message = "Message is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setStatus("idle");
      setPopup({
        type: "error",
        title: "Missing Information",
        message: "Please fill in all required fields before sending.",
      });
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        },
        PUBLIC_KEY,
      );
      setStatus("success");
      setForm(EMPTY_FORM);
      setPopup({
        type: "success",
        title: "Message Sent",
        message: "Thanks for reaching out — we'll be in touch soon!",
      });
    } catch (err) {
      setStatus("error");
      setPopup({
        type: "error",
        title: "Send Failed",
        message:
          "Something went wrong while sending your message. Please try again.",
      });
    }
  };

  const inputClasses = (field) =>
    `w-full rounded-lg px-4 py-3.5 text-neutral-800 placeholder-neutral-400 outline-none bg-[#f4f2ee] border transition-colors focus:ring-2 ${
      errors[field] ? "border-red-400 focus:ring-red-200" : "border-transparent"
    }`;

  return (
    <div
      className="rounded-2xl bg-white p-6 sm:p-10"
      style={{ boxShadow: "0 16px 50px rgba(0,0,0,.06)" }}
    >
      <div className="flex items-center gap-3">
        <span className="w-1.5 h-7 rounded" style={{ background: BRAND }} />
        <h3 className="text-2xl font-extrabold">Get in Touch</h3>
      </div>
      <p className="mt-4 text-neutral-500 leading-relaxed">
        Fill out the form below and we'll get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className={inputClasses("name")}
              style={{ "--tw-ring-color": BRAND }}
            />
            {errors.name && (
              <p className="mt-1.5 text-xs font-semibold text-red-500">
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className={inputClasses("email")}
              style={{ "--tw-ring-color": BRAND }}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs font-semibold text-red-500">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className={inputClasses("phone")}
            style={{ "--tw-ring-color": BRAND }}
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs font-semibold text-red-500">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="5"
            placeholder="Message"
            className={`${inputClasses("message")} resize-none`}
            style={{ "--tw-ring-color": BRAND }}
          />
          {errors.message && (
            <p className="mt-1.5 text-xs font-semibold text-red-500">
              {errors.message}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-1">
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-md px-8 py-3.5 text-white font-bold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: BRAND }}
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>

      {popup && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-black/50 px-4"
          onClick={() => setPopup(null)}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl"
          >
            <button
              onClick={() => setPopup(null)}
              aria-label="Close"
              className="absolute top-4 right-4 grid place-items-center w-8 h-8 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div
              className="mx-auto grid h-14 w-14 place-items-center rounded-full"
              style={{
                background:
                  popup.type === "success"
                    ? "rgba(59,132,125,.12)"
                    : "rgba(239,68,68,.12)",
              }}
            >
              {popup.type === "success" ? (
                <svg
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={BRAND}
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              ) : (
                <svg
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              )}
            </div>
            <h4 className="mt-5 text-xl font-extrabold">{popup.title}</h4>
            <p className="mt-2 text-neutral-500 leading-relaxed">
              {popup.message}
            </p>
            <button
              onClick={() => setPopup(null)}
              className="mt-7 w-full rounded-md py-3.5 text-white font-bold transition-colors"
              style={{
                background: popup.type === "success" ? BRAND : "#ef4444",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
