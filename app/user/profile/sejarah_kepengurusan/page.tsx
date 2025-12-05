'use client';

import { useState, useEffect } from 'react';
import { useParams } from "next/navigation";
import {
    ArrowLeft, Calendar, Crown, ExternalLink, Mail, Instagram,
    Target, Zap, ClipboardList, Users, CheckCircle, Linkedin, Phone,
    MapPin, GraduationCap, Award, Star, Trophy, Sparkles, Shield, ChevronDown
} from 'lucide-react';

// Interfaces
interface Member {
    id: number;
    dim_id: number;
    user_id: number;
    organization_id: number | null;
    organization: any | null;
    user_name: string;
    nim: string;
    full_name: string;
    email: string;
    study_program_id: number;
    study_program: string;
    faculty: string;
    year_enrolled: number;
    status: string;
    dormitory: string;
    position: string;
    linkedin: string;
    whatsapp: string;
    instagram: string;
    image: string;
    last_sync: string;
    created_at: string;
    updated_at: string;
}

interface BEMData {
    period: string;
    leader: Member | null;
    co_leader: Member | null;
    secretary_1: Member | null;
    secretary_2: Member | null;
    treasurer_1: Member | null;
    treasurer_2: Member | null;
}

interface BEMApiResponse {
    data: BEMData;
    status: string;
}

interface MPMData {
    period: string;
    leader: Member | null;
    co_leader: Member | null;
    secretary: Member | null;
}

interface MPMApiResponse {
    data: MPMData;
    status: string;
}

const positionLabels: Record<string, string> = {
    'ketua_bem': 'Presiden BEM',
    'wakil_ketua_bem': 'Wakil Presiden',
    'sekretaris_bem_1': 'Sekretaris Umum',
    'sekretaris_bem_2': 'Wakil Sekretaris',
    'bendahara_bem_1': 'Bendahara Umum',
    'bendahara_bem_2': 'Wakil Bendahara',
    'ketua_mpm': 'Ketua MPM',
    'wakil_ketua_mpm': 'Wakil Ketua MPM',
    'sekretaris_mpm': 'Sekretaris MPM'
};

const positionIcons: Record<string, any> = {
    'ketua_bem': Crown,
    'wakil_ketua_bem': Award,
    'sekretaris_bem_1': Star,
    'sekretaris_bem_2': Star,
    'bendahara_bem_1': Trophy,
    'bendahara_bem_2': Trophy,
    'ketua_mpm': Crown,
    'wakil_ketua_mpm': Award,
    'sekretaris_mpm': Star
};

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const MemberCard = ({ member, position, index }: { member: Member; position: string; index: number }) => {
    const PositionIcon = positionIcons[position] || Shield;
    const isLeader = position === 'ketua_bem' || position === 'ketua_mpm';
    const isCoLeader = position === 'wakil_ketua_bem' || position === 'wakil_ketua_mpm';

    return (
        <div
            className="group relative"
            style={{ animation: `fadeInUp 0.8s ease-out ${index * 100}ms both` }}
        >
            {/* Glow Effect */}
            <div className={`absolute -inset-0.5 ${
                isLeader 
                    ? 'bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-500' 
                    : isCoLeader
                    ? 'bg-gradient-to-r from-slate-600 via-gray-500 to-zinc-600'
                    : 'bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600'
            } rounded-3xl opacity-0 group-hover:opacity-75 blur-lg transition-all duration-500`}></div>
            
            <div className={`relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500`}>
                {/* Decorative Top Bar */}
                <div className={`h-2 ${
                    isLeader 
                        ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500' 
                        : isCoLeader
                        ? 'bg-gradient-to-r from-slate-600 via-gray-700 to-zinc-600'
                        : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600'
                }`}></div>

                {/* Photo Section with Overlay */}
                <div className="relative h-72 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    {/* Decorative Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tl from-white to-transparent rounded-full transform -translate-x-6 translate-y-6"></div>
                    </div>

                    <img
                        src={
                            member.image
                                ? `${IMAGE_URL}/users/${member.image}`
                                : `https://ui-avatars.com/api/?name=${encodeURIComponent(member.full_name)}&background=${isLeader ? 'f59e0b' : '3b82f6'}&color=fff&size=400`
                        }
                        alt={member.full_name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.full_name)}&background=${isLeader ? 'f59e0b' : '3b82f6'}&color=fff&size=400`;
                        }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Position Badge - Floating */}
                    <div className={`absolute top-4 right-4 px-4 py-2 rounded-full backdrop-blur-md flex items-center gap-2 shadow-lg ${
                        isLeader 
                            ? 'bg-gradient-to-r from-amber-500/90 to-orange-500/90' 
                            : isCoLeader
                            ? 'bg-gradient-to-r from-slate-600/90 to-gray-700/90'
                            : 'bg-gradient-to-r from-blue-600/90 to-indigo-600/90'
                    }`}>
                        <PositionIcon className="w-4 h-4 text-white" />
                        <span className="text-xs font-bold text-white">{positionLabels[position]}</span>
                    </div>

                    {/* Leader Crown Badge */}
                    {isLeader && (
                        <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                            <Crown className="w-6 h-6 text-white" />
                        </div>
                    )}
                </div>

                {/* Info Section */}
                <div className="p-6 space-y-4">
                    {/* Name */}
                    <div className="text-center space-y-2">
                        <h3 className={`${
                            isLeader ? 'text-2xl' : 'text-xl'
                        } font-black tracking-tight ${
                            isLeader 
                                ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600' 
                                : 'text-gray-900'
                        }`}>
                            {member.full_name}
                        </h3>
                        <p className="text-sm font-semibold text-gray-600">{member.study_program}</p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
                            <GraduationCap className="w-3.5 h-3.5 text-gray-500" />
                            <span className="text-xs font-medium text-gray-600">Angkatan {member.year_enrolled}</span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

                    {/* Contact Buttons */}
                    <div className="flex justify-center gap-3">
                        {member.instagram && (
                            <a
                                href={`${member.instagram.startsWith('http') ? member.instagram : `https://instagram.com/${member.instagram.replace('@', '')}`}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn relative p-3 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-xl hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
                                title="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                                <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 rounded-xl transition-opacity"></div>
                            </a>
                        )}
                        {member.linkedin && (
                            <a
                                href={`${member.linkedin.startsWith('http') ? member.linkedin : `https://linkedin.com/in/${member.linkedin}`}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn relative p-3 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
                                title="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                                <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 rounded-xl transition-opacity"></div>
                            </a>
                        )}
                        {member.whatsapp && (
                            <a
                                href={`https://wa.me/${member.whatsapp.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn relative p-3 bg-gradient-to-br from-green-500 to-green-700 text-white rounded-xl hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
                                title="WhatsApp"
                            >
                                <Phone className="w-5 h-5" />
                                <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 rounded-xl transition-opacity"></div>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function BEMHistoryPage() {
    const currentYear = new Date().getFullYear();
    const defaultPeriod = `${currentYear}-${currentYear + 1}`;

    const [period, setPeriod] = useState(defaultPeriod);
    const [isLoading, setIsLoading] = useState(true);
    const [bemData, setBemData] = useState<BEMData | null>(null);
    const [mpmData, setMpmData] = useState<MPMData | null>(null);
    const [showPeriodSelector, setShowPeriodSelector] = useState(false);
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const periodOptions = Array.from({ length: 11 }, (_, i) => {
        const year = currentYear - 1 + i;
        return `${year}-${year + 1}`;
    });

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            
            try {
                const [bemResponse, mpmResponse] = await Promise.all([
                    fetch(`${API_URL}/bem/${period}`),
                    fetch(`${API_URL}/mpm/${period}`)
                ]);

                if (bemResponse.ok) {
                    const bemResult: BEMApiResponse = await bemResponse.json();
                    setBemData(bemResult.status === 'success' ? bemResult.data : null);
                } else {
                    setBemData(null);
                }

                if (mpmResponse.ok) {
                    const mpmResult: MPMApiResponse = await mpmResponse.json();
                    setMpmData(mpmResult.status === 'success' ? mpmResult.data : null);
                } else {
                    setMpmData(null);
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                setBemData(null);
                setMpmData(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [period]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
                <div className="text-center space-y-6">
                    <div className="relative w-24 h-24 mx-auto">
                        <div className="absolute inset-0 border-4 border-amber-200 rounded-full animate-ping"></div>
                        <div className="absolute inset-0 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                        <Crown className="absolute inset-0 m-auto w-10 h-10 text-amber-600 animate-pulse" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-amber-900 mb-2">Memuat Data</p>
                        <p className="text-amber-700">Periode {period}</p>
                    </div>
                </div>
            </div>
        );
    }

    const membersBem: Array<{ member: Member; position: string }> = [];
    if (bemData) {
        if (bemData.leader) membersBem.push({ member: bemData.leader, position: 'ketua_bem' });
        if (bemData.co_leader) membersBem.push({ member: bemData.co_leader, position: 'wakil_ketua_bem' });
        if (bemData.secretary_1) membersBem.push({ member: bemData.secretary_1, position: 'sekretaris_bem_1' });
        if (bemData.secretary_2) membersBem.push({ member: bemData.secretary_2, position: 'sekretaris_bem_2' });
        if (bemData.treasurer_1) membersBem.push({ member: bemData.treasurer_1, position: 'bendahara_bem_1' });
        if (bemData.treasurer_2) membersBem.push({ member: bemData.treasurer_2, position: 'bendahara_bem_2' });
    }

    const membersMpm: Array<{ member: Member; position: string }> = [];
    if (mpmData) {
        if (mpmData.leader) membersMpm.push({ member: mpmData.leader, position: 'ketua_mpm' });
        if (mpmData.co_leader) membersMpm.push({ member: mpmData.co_leader, position: 'wakil_ketua_mpm' });
        if (mpmData.secretary) membersMpm.push({ member: mpmData.secretary, position: 'sekretaris_mpm' });
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes shimmer {
                    0% { background-position: -1000px 0; }
                    100% { background-position: 1000px 0; }
                }
                .shimmer {
                    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
                    background-size: 1000px 100%;
                    animation: shimmer 3s infinite;
                }
            `}</style>

            {/* Hero Header */}
            <div className="relative min-h-[50vh] bg-gradient-to-br from-amber-600 via-orange-600 to-yellow-500 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
                </div>
                
                <div className="shimmer absolute inset-0"></div>

                <div className="relative container mx-auto px-6 py-12">
                    <button
                        onClick={() => window.location.href = '/user/profile'}
                        className="group mt-12 inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 shadow-lg"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-semibold">Kembali</span>
                    </button>

                    <div className="mt-16 text-center text-white space-y-8">
                        {/* Period Selector */}
                        <div className="inline-block">
                            <button
                                onClick={() => setShowPeriodSelector(!showPeriodSelector)}
                                className="group px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 shadow-xl"
                            >
                                <div className="flex items-center gap-4">
                                    <Calendar className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                    <div className="text-left">
                                        <p className="text-xs opacity-80 font-medium">Periode Kepengurusan</p>
                                        <p className="text-2xl font-black">{period}</p>
                                    </div>
                                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showPeriodSelector ? 'rotate-180' : ''}`} />
                                </div>
                            </button>

                            {/* Period Dropdown */}
                            {showPeriodSelector && (
                                <div
                                    className="mt-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20"
                                    style={{ animation: 'fadeInUp 0.3s ease-out' }}
                                >
                                    <h3 className="text-gray-800 font-bold text-lg mb-4 flex items-center gap-2">
                                        <Crown className="w-5 h-5 text-amber-600" />
                                        Pilih Periode
                                    </h3>
                                    <div className="grid grid-cols-3 gap-3 max-h-72 overflow-y-auto">
                                        {periodOptions.map((periodOption) => (
                                            <button
                                                key={periodOption}
                                                onClick={() => {
                                                    setPeriod(periodOption);
                                                    setShowPeriodSelector(false);
                                                }}
                                                className={`px-4 py-3 rounded-xl font-bold transition-all duration-200 ${
                                                    period === periodOption
                                                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                                                }`}
                                            >
                                                {periodOption}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Title */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-center gap-4">
                                <div className="w-1 h-12 bg-white/50 rounded-full"></div>
                                <h1 className="text-6xl md:text-7xl font-black tracking-tight drop-shadow-2xl">
                                    SEJARAH
                                </h1>
                                <div className="w-1 h-12 bg-white/50 rounded-full"></div>
                            </div>
                            <p className="text-2xl font-light opacity-90 tracking-wide">Kepemimpinan Mahasiswa Institut Teknologi Del</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 py-24 space-y-32">
                {/* MPM Section */}
                <section>
                    <div className="text-center mb-16" style={{ animation: 'fadeInUp 0.8s ease-out' }}>
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-slate-700 via-gray-700 to-zinc-700 rounded-3xl mb-6 shadow-2xl">
                            <img src="/bem.png" alt="MPM" className="w-20 h-20 object-cover rounded-2xl" />
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-gray-700 to-zinc-700">
                                MPM
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 font-medium">Majelis Permusyawaratan Mahasiswa</p>
                        <div className="mt-4 h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-slate-600 to-transparent rounded-full"></div>
                    </div>

                    {membersMpm.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {membersMpm
                                .filter(item => item.member && item.member.id !== 0 && item.member.full_name && item.member.full_name.trim() !== "")
                                .map((item, index) => (
                                    <MemberCard key={item.member.id} member={item.member} position={item.position} index={index} />
                                ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-white rounded-3xl shadow-xl border-2 border-gray-200">
                            <Users className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-600 mb-2">Data Belum Tersedia</h3>
                            <p className="text-gray-500">Periode <span className="font-bold">{period}</span></p>
                        </div>
                    )}
                </section>

                {/* BEM Section */}
                <section>
                    <div className="text-center mb-16" style={{ animation: 'fadeInUp 0.8s ease-out' }}>
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-500 rounded-3xl mb-6 shadow-2xl">
                            <img src="/bem.png" alt="BEM" className="w-20 h-20 object-cover rounded-2xl" />
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600">
                                BEM
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 font-medium">Badan Eksekutif Mahasiswa</p>
                        <div className="mt-4 h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-amber-600 to-transparent rounded-full"></div>
                    </div>

                    {membersBem.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {membersBem
                                .filter(item => item.member && item.member.id !== 0 && item.member.full_name && item.member.full_name.trim() !== "")
                                .map((item, index) => (
                                    <MemberCard key={item.member.id} member={item.member} position={item.position} index={index} />
                                ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-white rounded-3xl shadow-xl border-2 border-gray-200">
                            <Users className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-600 mb-2">Data Belum Tersedia</h3>
                            <p className="text-gray-500">Periode <span className="font-bold">{period}</span></p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}