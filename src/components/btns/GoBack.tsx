"use client";
import React from "react";
import { useRouter } from "next/navigation.js";

const GoBack = () => {
  const routerGoBack = useRouter();
  return (
    <section>
      <button onClick={() => routerGoBack.back()}>Back</button>
    </section>
  );
};

export default GoBack;
