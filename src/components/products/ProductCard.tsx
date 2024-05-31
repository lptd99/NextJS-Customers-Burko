import React from "react";
import Image from "next/image";

const ProductCard = () => {
  return (
    <section>
      <section className="relative w-[300px]">
        <div className="absolute inset-4 flex items-start justify-end">
          <p className="bg-dblue font-bold text-lg text-white p-3 rounded-full ml-4">
            See
          </p>
        </div>

        <Image
          alt={"ImageProduct"}
          src={"/images/peanutbutter.jpg"}
          width={300}
          height={300}
          className="rounded-t-lg object-cover"
        />
      </section>
      <section className="w-[300px] flex justify-center items-center text-center bg-rose py-4 rounded-b-lg">
        <p className="text-white text-lg font-bold">{"Peanut Butter Cake"}</p>
      </section>
    </section>
  );
};

export default ProductCard;
