"use client";

import { useState } from "react";
import { api } from "../../lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api("/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      setSuccess("Login successful!");

      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your password"
            />
          </div>

          {/* Error */}
          {error && <p className="text-sm text-red-600">{error}</p>}

          {/* Success */}
          {success && <p className="text-sm text-green-600">{success}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-black px-4 py-2.5 font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
