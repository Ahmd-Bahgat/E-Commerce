import productModel from "../models/productModel";

export const getAllProduct = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  const products = [
    {
      title: "MacBook ",
      image:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQM7AYmhfrD59r6T5j1YPON4s57sY6RjZMye9YefNgAt8W29EJrWyKJTpkkMR0dsoXlURXrVHZMB_3dcFMSZKK5XPxeweKqEFCXrfimR72UcHRpf85hR1wfWq3Yc7l5O7e-iwxTf28AaA&usqp=CAc",
      price: 25000,
      stock: 10,
    },
  ];
  const existsingProducts = await getAllProduct();

  if (existsingProducts.length === 0) {
    await productModel.insertMany(products);
  }
};
