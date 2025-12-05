"use client";

import { useState, useEffect } from "react";
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
import Image from "next/image";
import Swal from "sweetalert2";

export default function TotpPage() {
  const router = useRouter();
  const [qrData, setQrData] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    
    useEffect(() => {
      const stored = sessionStorage.getItem("token");
      setToken(stored);
      const stored1 = sessionStorage.getItem("username");
      setUsername(stored1);
    }, []);

  useEffect(() => {
    const fetchQr = async () => {
      try {
  
        if (!token) {
          setError("Token tidak ditemukan. Silakan login ulang.");
          return;
        }

        const res = await fetch(`${API_URL}/auth/totp/setup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Gagal mengambil data QR");
        }

        const data = await res.json();
        setStatus(data.status);

        if (data.status === "success") {
          setQrData(data.data.qrcode);
        }
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data TOTP.");
      }
    };

    fetchQr();
  }, []);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const username = sessionStorage.getItem("username");

      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Token tidak ditemukan",
          text: "Silakan login ulang.",
        });
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_URL}/auth/totp/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ code, username }),
      });

      const data = await res.json();

      const res1 = await fetch(`${API_URL}/student/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ username }),
      });

      const data1 = await res1.json();

      sessionStorage.setItem("position", data.data.student.position);
      sessionStorage.setItem("organization", data.data.student.organization_id);
      sessionStorage.setItem("id", data1.id);

      const position = data.data.student.position;
      console.log(position);

      if (!res.ok || data.status !== "success") {
        throw new Error(data.message || "Kode tidak valid.");
      }

      if (data.status === "success" && !position) {
        router.push("/user/service");
      } else if (
        [
          "ketua_bem",
          "wakil_ketua_bem",
          "sekretaris_bem_1",
          "sekretaris_bem_2",
          "bendahara_bem_1",
          "bendahara_bem_2",
        ].includes(position)
      ) {
        router.push("/bem/dashboard");
      } else if (
        [
          "ketua_mpm",
          "wakil_ketua_mpm",
          "sekretaris_mpm",
        ].includes(position)
      ) {
        router.push("/mpm/dashboard");
      } else if (
        [
          "ketua_himpunan",
          "wakil_ketua_himpunan",
          "sekretaris_himpunan_1",
          "sekretaris_himpunan_2",
          "bendahara_himpunan_1",
          "bendahara_himpunan_2",
        ].includes(position)
      ) {
        router.push("/himpunan/dashboard");
      } else if (
        [
          "ketua_ukm",
          "wakil_ketua_ukm",
          "sekretaris_ukm_1",
          "sekretaris_ukm_2",
          "bendahara_ukm_1",
          "bendahara_ukm_2",
        ].includes(position)
      ) {
        router.push("/ukm/dashboard");
      } else if (
        [
          "ketua_department",
          "wakil_ketua_department",
          "sekretaris_department_1",
          "sekretaris_department_2",
          "bendahara_department_1",
          "bendahara_department_2",
        ].includes(position)
      ) {
        router.push("/departmen/dashboard");
      }
    } catch (err: any) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Verifikasi Gagal",
        text: "Kode TOTP tidak valid atau sudah kadaluarsa",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E40AF] via-[#3B82F6] to-[#60A5FA] flex items-center justify-center py-20 px-6">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full"></div>
        <div className="absolute top-1/2 -left-40 w-60 h-60 bg-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-white opacity-10 rounded-full"></div>
      </div>

      <Card className="w-full max-w-md shadow-lg border-none">
        <CardHeader className="text-center">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
              <img
                src="/bem.png"
                alt="Logo BEM"
                className="w-20 h-20 object-cover"
              />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Verifikasi TOTP
          </CardTitle>
          <CardDescription>
            Scan QRCode berikut pada smartphone kamu, menggunakan aplikasi
            Authenticator seperti <b>Microsoft Authenticator</b> atau{" "}
            <b>Google Authenticator</b>
          </CardDescription>
        </CardHeader>

        <CardContent>
          {status === "success" && qrData && (
            <div className="flex justify-center mb-4">
              <Image
                src={qrData}
                alt="QR Code"
                width={200}
                height={200}
                className="rounded-md border"
              />
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <Label htmlFor="code">Kode Verifikasi</Label>
              <Input
                id="code"
                placeholder="Masukkan 6 digit kode"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Memverifikasi..." : "Verifikasi"}
            </Button>

            <Button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700"
              disabled={loading}
            >
              Keluar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
