const API = process.env.REACT_APP_PRODUCT_SCRIPT_URL;

/* ======================
   GET SERVICES
====================== */
export const getProducts = async () => {
  const res = await fetch(`${API}?type=products&t=${Date.now()}`);
  return await res.json();
};

/* ======================
   ADD SERVICE
====================== */
export const addProduct = async (product) => {
  const res = await fetch(API, {
    method: "POST",
    body: JSON.stringify({
      type: "addProduct",
      name: product.name,
      category: product.category,
      image: product.image,
      description: product.description,
      rating: product.rating,
      reviews: product.reviews,
    }),
  });
  return await res.json();
};

/* ======================
   DELETE SERVICE
====================== */
export const deleteProduct = async (id) => {
  const res = await fetch(API, {
    method: "POST",
    body: JSON.stringify({
      type: "deleteProduct",
      id: id.toString(),
    }),
  });

  const data = await res.json();
  if (!data.success) throw new Error("Delete failed");

  return data;
};
