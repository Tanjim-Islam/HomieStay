"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("ef9355ef-c6f3-4548-9732-97493443bfd2");
  }, []);

  return null;
};
