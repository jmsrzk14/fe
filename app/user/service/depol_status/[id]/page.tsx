'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft, Eye
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function SarprasForm() {
    const [requests, setRequests] = useState<any[]>([]);
    const router = useRouter();
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const username= sessionStorage.getItem("username");
                const token = sessionStorage.getItem("token");

                const res = await fetch(`${API_URL}/student/request_depol/user/${username}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const result = await res.json();

                if (result.status === "success") {
                    setRequests(result.data);
                }
            } catch (error) {
                console.error("Gagal mengambil daftar request:", error);
            }
        };

        fetchRequests();
    }, []);

    return (
        <div className="bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#0bd64e] to-[#3bf59e] relative overflow-hidden">
                <div className="relative z-10 container mx-auto px-4 py-16">
                    <Link href="/user/service" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 mt-6">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali ke Layanan</span>
                    </Link>

                    {/* === TABEL DATA REQUEST === */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                        <h2 className="text-xl font-semibold mb-4">Daftar Pengajuan Peminjaman Anda</h2>
                        {requests.length === 0 ? (
                            <p className="text-gray-500 italic">Belum ada data pengajuan.</p>
                        ) : (
                            <table className="w-full border text-sm text-left">
                                <thead className="bg-blue-50 text-gray-700">
                                    <tr>
                                        <th className="p-2 border">#</th>
                                        <th className="p-2 border">Nama</th>
                                        <th className="p-2 border">Status</th>
                                        <th className="p-2 border">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map((req, index) => (
                                        <tr key={req.id} className="border-t hover:bg-gray-50">
                                            <td className="p-2 border text-center">{index + 1}</td>
                                            <td className="p-2 border">{req.name}</td>
                                            <td className="p-2 border capitalize">
                                                <span className={cn(
                                                    "px-2 py-1 rounded text-xs",
                                                    req.status === "approved" && "bg-blue-100 text-blue-800",
                                                    req.status === "rejected" && "bg-red-100 text-red-800",
                                                    req.status === "pending" && "bg-yellow-100 text-yellow-700",
                                                    req.status === "diambil" && "bg-purple-100 text-purple-800",
                                                    req.status === "selesai" && "bg-green-100 text-green-800",
                                                )}>
                                                    {req.status}
                                                </span>
                                            </td>
                                            <td className="p-2 border text-center">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                                                    onClick={() => router.push(`/user/service/depol_status/request/${req.id}`)}
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    <span>Detail</span>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
