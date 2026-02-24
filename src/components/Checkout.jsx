import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import emailjs from "emailjs-com";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    deliveryNote: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  /* ================= EMAIL ================= */
  const sendEmails = () => {
    const itemsHTML = cart
      .map(
        (item) => `
      <table width="100%" style="margin-bottom:12px">
        <tr>
          <td>
            <b>${item.image}</b><br/>
            <b>${item.name}</b><br/>
            Qty: ${item.qty}<br/>
            Type: ${item.type}
          </td>
        </tr>
      </table>
    `,
      )
      .join("");

    const templateParams = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      deliveryNote: form.deliveryNote,
      items: itemsHTML,
      total: "Price will be discussed on WhatsApp",
      
    };

    emailjs.send(
      "service_jfjaobb",
      "template_d9mu9kr",
      templateParams,
      "GUtTtl2HIbADSrZsx",
    );

    emailjs.send(
      "service_jfjaobb",
      "template_maw9ksm",
      templateParams,
      "GUtTtl2HIbADSrZsx",
    );
  };

  /* ================= WHATSAPP ================= */
  const sendWhatsApp = () => {
    const phoneNumber = process.env.REACT_APP_WHATSAPP_NUMBER;
    const baseURL = window.location.origin;

    const itemsText = cart
      .map((item) => {
        let imageURL = "";

        if (item.image.startsWith("http")) {
          imageURL = item.image;
        } else if (item.image.startsWith("data:image")) {
          imageURL = "📷 Image available on website";
        } else {
          imageURL = `${baseURL}${item.image}`;
        }

        return (
          `🟢 *${item.name}*\n` +
          `Qty: ${item.qty}\n` +
          `Type: ${item.type}\n` +
          `${imageURL}\n`
        );
      })
      .join("\n\n");

    const message =
      `🛒 NEW ORDER\n\n` +
      `Name: ${form.name}\n` +
      `Phone: ${form.phone}\n` +
      `Address: ${form.address}\n\n` +
      `${itemsText}\n\n` +
      `Total: Price will be discussed on WhatsApp`;

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  /* ================= PLACE ORDER ================= */
  const placeOrder = () => {
    if (!form.name || !form.phone || !form.address || cart.length === 0) {
      alert("Please complete the form and add items to cart");
      return;
    }

    sendEmails();
    sendWhatsApp();

    clearCart(); // ✅ clear cart

    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      deliveryNote: "",
    });

    alert("Order placed successfully!");
  };

  return (
    <div className="max-w-7xl mx-auto mt-32 p-6 grid lg:grid-cols-2 gap-10">
      <div>
        <h2 className="text-2xl font-bold mb-6">Delivery Details</h2>

        <div className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
          />
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
          />
          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
          />
          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
          />
          <textarea
            name="deliveryNote"
            placeholder="Note"
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
          />
        </div>
      </div>

      <div className="bg-gray-100 rounded-3xl p-6">
        <h2 className="text-xl font-bold mb-6">Order Summary</h2>

        {cart.map((item, i) => (
          <div key={i} className="flex gap-4 mb-4 items-center">
            <img
              src={item.image}
              className="w-16 h-16 rounded-lg object-cover"
              alt=""
            />
            <div>
              <h4 className="font-semibold">{item.name}</h4>
              <p className="text-sm">
                Qty: {item.qty} | {item.type}
              </p>
              <p> {}</p>
            </div>
          </div>
        ))}

        <button
          onClick={placeOrder}
          className="w-full mt-6 bg-black text-white py-4 rounded-xl text-lg"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
