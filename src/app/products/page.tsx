import React from "react";
import ProductList from "@/components/products/ProductList";

const page = () => {
  return (
    <section className="container">
      <p>Check our creations</p>

      <section>
        <ProductList />
      </section>
    </section>
  );
};

export default page;
