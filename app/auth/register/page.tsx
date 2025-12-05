"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.status === "success") {
        setSuccess("Registrasi berhasil! Silakan login.");
        setTimeout(() => router.push("/auth/login"), 2000);
      } else {
        setError(data.message || "Registrasi gagal, coba lagi.");
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat registrasi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E40AF] via-[#3B82F6] to-[#60A5FA] flex items-center justify-center py-30 px-6">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full"></div>
        <div className="absolute top-1/2 -left-40 w-60 h-60 bg-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-white opacity-10 rounded-full"></div>
      </div>

      <Card className="w-full max-w-md shadow-lg border-none">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-3">
            <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
              <img
                src="/bem.png"
                alt="Logo BEM"
                className="w-20 h-20 object-cover"
              />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Daftar Akun
          </CardTitle>
          <CardDescription>
            Buat akun baru untuk mengakses sistem BEM
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="flex items-center gap-2 mb-3 text-red-600 bg-red-50 p-2 rounded-md text-sm">
              <AlertCircle size={16} /> {error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 mb-3 text-green-600 bg-green-50 p-2 rounded-md text-sm">
              ✅ {success}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Mendaftar..." : "Daftar"}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Sudah punya akun?{" "}
              <span
                onClick={() => router.push("/auth/login")}
                className="text-blue-700 hover:underline cursor-pointer"
              >
                Login di sini
              </span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}