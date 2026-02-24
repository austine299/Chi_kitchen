import React from "react";
import {
  FaEnvelope,
  FaWhatsapp,
  FaPhone,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

export default function Contact() {
  const email = "Chizobasandra107@gmail.com";
  const phone = "2348135547625"; // your WhatsApp number
  const instagram = "https://www.instagram.com/chikitchen"; // replace with your real link
  const tiktok = "https://www.tiktok.com/@chikitchen"; // replace with your real link

  return (
    <div className="min-h-screen bg-gray-100 py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-10 text-center">

        {/* Title */}
        <h1 className="text-3xl font-bold mb-4">
          Contact Chi Kitchen
        </h1>

        <p className="text-gray-500 mb-10">
          Have questions or want to place a custom order? Reach out to us anytime.
        </p>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">

          {/* Email */}
          <a
            href={`mailto:${email}`}
            className="flex flex-col items-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
          >
            <FaEnvelope className="text-3xl mb-3" />
            <span className="font-semibold">Email</span>
            <span className="text-sm text-gray-500 break-all">{email}</span>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${phone}`}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center p-6 rounded-lg bg-green-50 hover:bg-green-100 transition"
          >
            <FaWhatsapp className="text-3xl mb-3 text-green-600" />
            <span className="font-semibold">WhatsApp</span>
            <span className="text-sm text-gray-500">Chat instantly</span>
          </a>

          {/* Phone */}
          <a
            href={`tel:+${phone}`}
            className="flex flex-col items-center p-6 rounded-lg bg-blue-50 hover:bg-blue-100 transition"
          >
            <FaPhone className="text-3xl mb-3 text-blue-600" />
            <span className="font-semibold">Call Us</span>
            <span className="text-sm text-gray-500">+234 813 554 7625</span>
          </a>

        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-8 mt-6">
          <a
            href={instagram}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center hover:text-pink-500 transition"
          >
            <FaInstagram className="text-4xl" />
            <span className="text-sm mt-1">Instagram</span>
          </a>

          <a
            href={tiktok}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center hover:text-black transition"
          >
            <FaTiktok className="text-4xl" />
            <span className="text-sm mt-1">TikTok</span>
          </a>
        </div>

      </div>
    </div>
  );
}