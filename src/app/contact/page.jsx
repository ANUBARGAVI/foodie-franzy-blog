"use client";
import { FaEnvelope, FaPhone } from "react-icons/fa";

export default function ContactPage() {
  return (
    <main className="p-6 bg-gray-100 min-h-screen font-serif flex items-center justify-center">
      <section className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-extrabold mb-4 text-indigo-600">Contact Us</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Have any questions or suggestions? Reach out to us at:
        </p>

        <div className="mt-6 space-y-4">
          <p className="text-lg font-semibold text-gray-900 flex items-center justify-center gap-2">
            <FaEnvelope className="text-indigo-600" /> contact@ourblog.com
          </p>
          <p className="text-lg font-semibold text-gray-900 flex items-center justify-center gap-2">
            <FaPhone className="text-indigo-600" /> 8072541491
          </p>
        </div>
      </section>
    </main>
  );
}
