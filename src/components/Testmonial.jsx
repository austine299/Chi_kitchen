import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Chinedu",
    text: "Best jollof rice I've ever eaten. Delivery was super fast!",
  },
  {
    name: "Amaka",
    text: "Very fresh meals and neat packaging. Highly recommend Chi Kitchen.",
  },
  {
    name: "David",
    text: "Affordable and tasty. My go-to food plug every day.",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const review = reviews[index];

  return (
    <section className="bg-white py-20">
      <div className="max-w-3xl mx-auto text-center px-6">

        <h2 className="text-3xl font-bold mb-10">
          ⭐ What Our Customers Say
        </h2>

        <div className="bg-gray-100 rounded-3xl p-10 shadow-lg transition-all duration-500">
          <div className="flex justify-center mb-3 text-yellow-500">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
          </div>

          <p className="text-lg italic mb-4">
            "{review.text}"
          </p>

          <h4 className="font-semibold">— {review.name}</h4>
        </div>
      </div>
    </section>
  );
}