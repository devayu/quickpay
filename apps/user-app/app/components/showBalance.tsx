"use client";

import { useBalance } from "@repo/store/useBalance";

export const ShowBalance = () => {
  const balance = useBalance();
  return <h1>Your balance is {balance}</h1>;
};
