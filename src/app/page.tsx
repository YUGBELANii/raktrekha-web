'use client';
import { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import Image from 'next/image';

export default function Home() {
  const [form, setForm] = useState({
    name: '',
    hostedBy: '',
    location: '',
    address: '',
    date: '',
    details: '',
  });

  const [status, setStatus] = useState('');
  const [support, setSupport] = useState({ name: '', email: '', message: '' });
  const [supportStatus, setSupportStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSupportChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSupport({ ...support, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('⏳ Submitting...');
    try {
      await addDoc(collection(db, 'bloodCamps'), {
        ...form,
        createdAt: Timestamp.now(),
      });
      setStatus('✅ Camp reported successfully!');
      setForm({
        name: '',
        hostedBy: '',
        location: '',
        address: '',
        date: '',
        details: '',
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setStatus('❌ Error: ' + err.message);
      } else {
        setStatus('❌ An unexpected error occurred.');
      }
    }
  };

  const handleSupportSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSupportStatus('✅ Message sent! We’ll respond soon.');
    setSupport({ name: '', email: '', message: '' });
  };

  return (
    <main className="bg-gray-100 text-gray-800 overflow-x-hidden">
      {/* Navbar */}
      <header className="bg-red-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-full box-border">
          <h1 className="text-2xl font-bold">🩸 Rakt Rekha</h1>
          <nav className="space-x-4">
            <a href="#features" className="hover:underline">
              Features
            </a>
            <a href="#how" className="hover:underline">
              How It Works
            </a>
            <a href="#report" className="hover:underline">
              Report Camp
            </a>
            <a href="#about" className="hover:underline">
              About
            </a>
            <a href="#support" className="hover:underline">
              Support
            </a>
            <a href="#privacy" className="hover:underline">
              Privacy
            </a>
            <a href="#terms" className="hover:underline">
              Terms
            </a>
            <a
              href="/download"
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all text-sm sm:text-base whitespace-nowrap inline-block"
            >
              Download APK
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="text-center py-16 bg-white">
        <div className="max-w-2xl mx-auto max-w-full box-border px-4">
          <h2 className="text-4xl font-bold text-red-700">Be the Lifeline Someone Desperately Needs</h2>
          <p className="mt-4 text-lg text-gray-600">
            Rakt Rekha connects emergency patients with verified blood donors & nearby blood banks — fast, securely, and
            compassionately.
          </p>
          <div className="mt-6">
            <a href="#report" className="bg-red-600 text-white px-6 py-3 rounded-full text-lg hover:bg-red-700">
              Post Camp Details
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 max-w-full box-border">
          <h3 className="text-3xl font-bold text-center mb-12">Core Features</h3>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-6 rounded-lg shadow text-center max-w-full box-border">
              <h4 className="text-xl font-bold mb-2">🩸 Instant Blood Requests</h4>
              <p>Raise urgent blood needs that reach nearby donors & banks instantly via our SOS system.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center max-w-full box-border">
              <h4 className="text-xl font-bold mb-2">🔍 Verified Donors & Banks</h4>
              <p>We ensure authenticity with ID verification and real-time donor availability tracking.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center max-w-full box-border">
              <h4 className="text-xl font-bold mb-2">📍 Location-Based Matching</h4>
              <p>Quickly find the nearest possible blood source with live maps and smart recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how" className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-full box-border">
          <h3 className="text-3xl font-bold text-center mb-12">How Rakt Rekha Works</h3>
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-full box-border">
            <div>
              <ol className="space-y-4 list-decimal list-inside text-lg">
                <li>User registers as Donor or Recipient</li>
                <li>Recipient raises a blood request with details</li>
                <li>App notifies suitable donors & nearest blood banks</li>
                <li>Donor confirms and completes donation</li>
              </ol>
            </div>
            <div className="text-center">
              <Image
                src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
                alt="Blood Donation"
                width={256}
                height={256}
                className="mx-auto max-w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Report Camp */}
      <section id="report" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 max-w-lg max-w-full box-border">
          <h3 className="text-3xl font-bold text-center mb-6">Report Nearby Blood Donation Camp</h3>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-full box-border">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Camp Name"
              className="w-full max-w-full p-3 border rounded box-border"
              required
            />
            <input
              name="hostedBy"
              value={form.hostedBy}
              onChange={handleChange}
              placeholder="Hosted By"
              className="w-full max-w-full p-3 border rounded box-border"
              required
            />
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="General Location (City/Area)"
              className="w-full max-w-full p-3 border rounded box-border"
              required
            />
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Full Address (for Google Maps)"
              className="w-full max-w-full p-3 border rounded box-border"
              required
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full max-w-full p-3 border rounded box-border"
              required
            />
            <textarea
              name="details"
              value={form.details}
              onChange={handleChange}
              placeholder="Additional Details"
              className="w-full max-w-full p-3 border rounded box-border"
            />
            <button type="submit" className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700">
              Submit Report
            </button>
            {status && <p className="text-center mt-2">{status}</p>}
          </form>
        </div>
      </section>
    </main>
  );
}
