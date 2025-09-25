'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, User, Lock, Mail, Phone, Calendar, GraduationCap, LogOut } from 'lucide-react';
import { Title } from '@radix-ui/react-toast';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res = await fetch('http://localhost:8080/api/auth/campus/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
        credentials: "include",
      });

      if (!res.ok) {
        res = await fetch('http://localhost:8080/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: email, password }),
        });
      }

      if (!res.ok) throw new Error('Login failed');
      const data = await res.json();

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("refresh_token", data.refresh_token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      sessionStorage.setItem("organization", JSON.stringify(data.organization_id));
      sessionStorage.setItem("position", JSON.stringify(data.position));

      if (data.user.position === 'admin') {
        router.push('/admin/dashboard');
      } else if ([
        'ketua_bem',
        'wakil_ketua_bem',
        'sekretaris_bem_1',
        'sekretaris_bem_2',
        'bendahara_bem_1',
        'bendahara_bem_2'
      ].includes(data.position)) {
        router.push('/bem/dashboard');
      } else if ([
        'ketua_himpunan',
        'wakil_ketua_himpunan',
        'sekretaris_himpunan_1',
        'sekretaris_himpunan_2',
        'bendahara_himpunan_1',
        'bendahara_himpunan_2'
      ].includes(data.position)) {
        router.push('/himpunan/dashboard');
      } else if ([
        'ketua_ukm',
        'wakil_ketua_ukm',
        'sekretaris_ukm_1',
        'sekretaris_ukm_2',
        'bendahara_ukm_1',
        'bendahara_ukm_2'
      ].includes(data.position)) {
        router.push('/ukm/dashboard');
      } else if ([
        'ketua_department',
        'wakil_ketua_department',
        'sekretaris_department_1',
        'sekretaris_department_2',
        'bendahara_department_1',
        'bendahara_department_2'
      ].includes(data.position)) {
        router.push('/departmen/dashboard');
      }
    } catch (err) {
      console.error(err);
      alert('Login gagal, cek username/password!');
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E40AF] via-[#3B82F6] to-[#60A5FA] flex items-center justify-center py-20">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full"></div>
        <div className="absolute top-1/2 -left-40 w-60 h-60 bg-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-white opacity-10 rounded-full"></div>
      </div>

      <div className="relative w-full max-w-md px-4">
        <Card className="backdrop-blur-sm bg-white/95 shadow-2xl">
          <CardHeader className="space-y-4">
            <div className="flex justify-center">
              <div className="w-12 h-12  bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] rounded-xl flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <img
                    src="/himpunanem.png"
                    alt="Logo BEM"
                    className="w-8 h-8 object-contain"
                  />
                </div>
              </div>
            </div>
            <div className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold font-Viga text-[#1E40AF]">
                {isLogin ? 'Selamat Datang' : 'Join BEM 2024'}
              </CardTitle>
              <CardTitle className="text-lg font-bold font-Viga text-[#3B82F6]">
                {isLogin ? 'Portal BEM IT Del' : 'Join BEM 2024'}
              </CardTitle>
              <CardDescription className='m-10'>
                {isLogin 
                  ? 'Masuk ke Sistem Informasi Badan Eksekutif Mahasiswa Institut Teknologi Del'
                  : 'Daftar Akun Sistem Informasi Badan Eksekutif Mahasiswa Institut Teknologi Del'
                }
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form className="space-y-4" onSubmit={handleLogin}>
              {!isLogin && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input id="studentId" placeholder="STU001234" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+62 123 456 789" />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <div className="flex items-center space-x-2 mb-1">
                  <User className="h-4 w-4 text-black-400 " strokeWidth={3} />
                  <Label htmlFor="email" className="text-[#1E40AF]">Username</Label>
                </div>
                <div className="relative">                  
                  <Input 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text" 
                    placeholder="Masukkan username Anda"
                    className="pl-5 bg-transparent"
                  />
                  <User className="absolute right-5 top-3 h-4 w-4 text-black-400" strokeWidth={3} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 mb-1">
                <Lock className="h-4 w-4 text-black-400 " strokeWidth={3} />
                <Label htmlFor="password" className="text-[#1E40AF]">Password</Label>
                </div>
                <div className="relative">                  
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan Password Anda"
                    className="pl-5 pr-10 bg-transparent"
                  />                  
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-black-400"
                  >
                    {showPassword ? <EyeOff className="h-4 text-black" strokeWidth={3} /> : <Eye className="h-4 text-black" strokeWidth={3} />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm font-normal text-gray-400">
                      Remember me
                    </Label>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-[#3B82F6] hover:text-[#2563EB] font-medium"
                  >
                    Lupa Password?
                  </button>
                </div>
              )}

              {!isLogin && (
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" className="mt-1" />
                  <Label htmlFor="terms" className="text-sm font-normal leading-relaxed">
                    I agree to the{' '}
                    <button type="button" className="text-[#3B82F6] hover:text-[#2563EB]">
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button type="button" className="text-[#3B82F6] hover:text-[#2563EB]">
                      Privacy Policy
                    </button>
                  </Label>
                </div>
              )}

              <Button className="w-full bg-[linear-gradient(to_right,#FFFFFF_0%,rgba(167,167,167,0.84)_30%,#3B82F9_70%,#60A5FA_100%)] hover:bg-[#2563EB]">                
                {isLogin ? 'Masuk ke Portal' : 'Create Account'}
                <LogOut className="w-4 h-4 ml-2 text-black" strokeWidth={3}/>
              </Button>
            </form>

            <div className="flex flex-col items-center space-y-1 mt-6 text-[#94A3B8]">
              <Label className="text-center text-xs ">
                © 2024 BEM Institut Teknologi Del
              </Label>
              <Label className="text-center text-xs">
                Jl. Sisingamangaraja, Sitoluama, Laguboti, Toba Samosir
              </Label>
              <Label className="text-center text-xs">
                Sumatera Utara 22381, Indonesia
              </Label>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

