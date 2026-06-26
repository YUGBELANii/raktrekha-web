"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { doc, onSnapshot, updateDoc, increment } from "firebase/firestore";
import { db } from "../../../firebase";

export default function DownloadPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [downloadCount, setDownloadCount] = useState<number | null>(null);
  const screenshots = ["/screenshots/1.jpg", "/screenshots/2.jpg", "/screenshots/3.jpg"];

  useEffect(() => {
    const docRef = doc(db, "stats", "downloads");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setDownloadCount(data.count || 0);
      } else {
        setDownloadCount(0);
      }
    });
    return () => unsubscribe();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % screenshots.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };

  const handleDownloadClick = async () => {
    const docRef = doc(db, "stats", "downloads");
    try {
      await updateDoc(docRef, {
        count: increment(1),
      });
    } catch (error) {
      // if the doc doesn't exist or error happens, ignore or handle as needed
      console.error("Failed to increment download count:", error);
    }
    // Trigger APK download
    window.location.href = "/downloads/raktrekha.apk";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-10">
      {/* Logo + Title + Tagline */}
      <div className="text-center">
        <Image src="/logo.jpg" alt="App Logo" width={80} height={80} className="mx-auto" />
        <h1 className="text-3xl font-bold mt-4 text-black">Rakt Rekha</h1>
        <p className="text-gray-600 mt-2">Connecting donors, saving lives.</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleDownloadClick}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-md"
        >
          📥 Download App
        </button>
        <a
          href="/web"
          className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg shadow-md"
        >
          🌐 Web Version
        </a>
      </div>

      {/* Live Download Count */}
      <p className="mt-4 text-gray-700">
        {downloadCount !== null
          ? `📥 Downloaded by ${downloadCount} ${downloadCount === 1 ? "person" : "people"}`
          : "Loading download count..."}
      </p>

      {/* Feature Highlights */}
      <div className="mt-10 max-w-3xl w-full text-center">
        <h2 className="text-2xl font-semibold mb-6 text-black">Features</h2>
        <ul className="grid md:grid-cols-3 gap-6">
          <li className="p-4 bg-white shadow rounded-lg">
            <h3 className="font-bold text-black">🩸 Find Nearby Donors</h3>
            <p className="text-gray-600 mt-2">Instantly locate donors around you in emergencies.</p>
          </li>
          <li className="p-4 bg-white shadow rounded-lg">
            <h3 className="font-bold text-black">📅 Nearby Blood Camps</h3>
            <p className="text-gray-600 mt-2">Stay updated on upcoming blood donation drives near you.</p>
          </li>
          <li className="p-4 bg-white shadow rounded-lg">
            <h3 className="font-bold text-black">🚨 Emergency Blood Help</h3>
            <p className="text-gray-600 mt-2">Get urgent help when every second counts.</p>
          </li>
        </ul>
      </div>

      {/* Screenshot Carousel */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl text-black font-semibold mb-4">App Preview</h2>
        <div className="relative w-80 h-160">
          <Image
            src={screenshots[currentSlide]}
            alt="App Screenshot"
            width={300}
            height={600}
            className="rounded-lg shadow-lg"
          />
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 bg-black/50 text-white px-2 py-1 rounded"
          >
            ◀
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 bg-black/50 text-white px-2 py-1 rounded"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Installation Steps */}
      <div className="mt-12 max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-black text-center mb-6">Installation Steps</h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li>Download the APK file from the link above.</li>
          <li>Open it and allow installation from unknown sources.</li>
          <li>Launch the app and sign up to start helping or requesting.</li>
        </ol>
      </div>

      {/* Contact/Support */}
      <div className="mt-12 text-center">
        <p className="text-gray-700">
          Need help?{" "}
          <a href="/contact" className="text-red-600 underline">
            Contact Support
          </a>
        </p>
      </div>

      {/* Footer Disclaimer */}
      <footer className="mt-12 text-gray-500 text-sm text-center border-t pt-6">
        © {new Date().getFullYear()} Rakth Rekha. This app is intended for emergency and awareness purposes only.
      </footer>
    </div>
  );
}
