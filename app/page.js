"use client";
import Image from "next/image";
import Navbar from "./componets/Navbar";
import Card from "./componets/Card";
import { useState } from "react";
import Footer from "./componets/Footer";

export default function Home() {
  const [selectedValue, setSelectedValue] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="px-4">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
      />
      <Card searchQuery={searchQuery} selectedValue={selectedValue} />
      <Footer />
    </div>
  );
}
