"use client";
import React, { useEffect, useState } from "react";
import DataTable from "@/components/layout/DataTable";
import { UserPlus, Shield, Crown, Award, CheckCircle, ChevronDown, ChevronRight, Users, Building, Trophy, Calendar } from "lucide-react";

interface Mahasiswa {
  id: number;
  nim: string;
  full_name: string;
  study_program: string;
  year_enrolled: number;
  current_role?: string;
  current_category?: string;
  current_organization_id?: number;
  current_organization_shortname?: string;
  current_position_title?: string;
  period?: string;
}

interface ApiResponse {
  status: string;
  message: string;
  metadata: {
    current_page: number;
    per_page: number;
    total_items: number;
    total_pages: number;
    links: {
      first: string;
      last: string;
    };
  };
  data: Mahasiswa[];
}

interface Organization {
  id: number;
  name: string;
  shortname?: string;
  type: 'himpunan' | 'ukm' | 'department';
  description?: string;
}

interface OrganizationsApiResponse {
  status: string;
  message: string;
  data: Organization[];
}

interface Role {
  value: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  description?: string;
}

interface RoleCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  roles: Role[];
  organizations?: Organization[];
}

interface Period {
  value: string;
  label: string;
  year: string;
}

const TableContainer: React.FC = () => {
  const [data, setData] = useState<Mahasiswa[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [assigningRole, setAssigningRole] = useState<number | null>(null);
  const [himpunanOrgs, setHimpunanOrgs] = useState<Organization[]>([]);
  const [ukmOrgs, setUkmOrgs] = useState<Organization[]>([]);
  const [departmentOrgs, setDepartmentOrgs] = useState<Organization[]>([]);
  const [loadingOrganizations, setLoadingOrganizations] = useState(false);

  const fields = [
    { key: "nim", label: "NIM", type: "string" },
    { key: "full_name", label: "Nama", type: "string" },
    { key: "study_program", label: "Prodi", type: "string" },
    { key: "year_enrolled", label: "Angkatan", type: "number" },
  ];

  // Available periods - you can modify this based on your needs
  const availablePeriods: Period[] = [
    { value: "2023-2024", label: "2023/2024", year: "2023" },
    { value: "2024-2025", label: "2024/2025", year: "2024" },
    { value: "2025-2026", label: "2025/2026", year: "2025" },
    { value: "2026-2027", label: "2026/2027", year: "2026" },
    { value: "2027-2028", label: "2027/2028", year: "2027" },
    { value: "2028-2029", label: "2028/2029", year: "2028" },
  ];

  // Base role categories with their respective roles
  const baseRoleCategories: RoleCategory[] = [
    {
      id: "bem",
      name: "BEM (Badan Eksekutif Mahasiswa)",
      icon: <Crown className="w-5 h-5" />,
      color: "from-yellow-500 to-orange-500",
      roles: [
        {
          value: "ketua_bem",
          label: "Ketua BEM",
          icon: <Crown className="w-4 h-4" />,
          color: "from-yellow-500 to-yellow-600",
          description: "Memimpin dan mengkoordinasi seluruh kegiatan BEM"
        },
        {
          value: "wakil_ketua_bem",
          label: "Wakil Ketua BEM",
          icon: <Crown className="w-4 h-4" />,
          color: "from-yellow-400 to-yellow-500",
          description: "Membantu ketua dalam menjalankan tugas BEM"
        },
        {
          value: "sekretaris_bem_1",
          label: "Sekretaris BEM I",
          icon: <Shield className="w-4 h-4" />,
          color: "from-blue-500 to-blue-600",
          description: "Mengatur administrasi dan dokumentasi BEM"
        },
        {
          value: "sekretaris_bem_2",
          label: "Sekretaris BEM II",
          icon: <Shield className="w-4 h-4" />,
          color: "from-blue-400 to-blue-500",
          description: "Membantu sekretaris I dalam administrasi"
        },
        {
          value: "bendahara_bem_1",
          label: "Bendahara BEM I",
          icon: <Award className="w-4 h-4" />,
          color: "from-green-500 to-green-600",
          description: "Mengelola keuangan dan anggaran BEM"
        },
        {
          value: "bendahara_bem_2",
          label: "Bendahara BEM II",
          icon: <Award className="w-4 h-4" />,
          color: "from-green-400 to-green-500",
          description: "Membantu bendahara I dalam pengelolaan keuangan"
        },
      ]
    },
    {
      id: "himpunan",
      name: "Himpunan Mahasiswa",
      icon: <Users className="w-5 h-5" />,
      color: "from-blue-500 to-indigo-500",
      roles: [
        {
          value: "ketua_himpunan",
          label: "Ketua Himpunan",
          icon: <Crown className="w-4 h-4" />,
          color: "from-blue-500 to-blue-600",
          description: "Memimpin himpunan program studi"
        },
        {
          value: "wakil_ketua_himpunan",
          label: "Wakil Ketua Himpunan",
          icon: <Crown className="w-4 h-4" />,
          color: "from-blue-400 to-blue-500",
          description: "Membantu ketua himpunan"
        },
        {
          value: "sekretaris_himpunan_1",
          label: "Sekretaris Himpunan I",
          icon: <Shield className="w-4 h-4" />,
          color: "from-blue-500 to-blue-600",
          description: "Mengatur administrasi dan dokumentasi Himpunan"
        },
        {
          value: "sekretaris_himpunan_2",
          label: "Sekretaris Himpunan II",
          icon: <Shield className="w-4 h-4" />,
          color: "from-blue-400 to-blue-500",
          description: "Membantu sekretaris I dalam administrasi"
        },
        {
          value: "bendahara_himpunan_1",
          label: "Bendahara Himpunan I",
          icon: <Award className="w-4 h-4" />,
          color: "from-green-500 to-green-600",
          description: "Mengelola keuangan dan anggaran Himpunan"
        },
        {
          value: "bendahara_himpunan_2",
          label: "Bendahara Himpunan II",
          icon: <Award className="w-4 h-4" />,
          color: "from-green-400 to-green-500",
          description: "Membantu bendahara I dalam pengelolaan keuangan"
        },
      ]
    },
    {
      id: "ukm",
      name: "UKM (Unit Kegiatan Mahasiswa)",
      icon: <Trophy className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500",
      roles: [
        {
          value: "ketua_ukm",
          label: "Ketua UKM",
          icon: <Crown className="w-4 h-4" />,
          color: "from-purple-500 to-purple-600",
          description: "Memimpin unit kegiatan mahasiswa"
        },
        {
          value: "wakil_ketua_ukm",
          label: "Wakil Ketua UKM",
          icon: <Crown className="w-4 h-4" />,
          color: "from-purple-400 to-purple-500",
          description: "Membantu ketua UKM"
        },
        {
          value: "sekretaris_ukm_1",
          label: "Sekretaris UKM I",
          icon: <Shield className="w-4 h-4" />,
          color: "from-blue-500 to-blue-600",
          description: "Mengatur administrasi dan dokumentasi UKM"
        },
        {
          value: "sekretaris_ukm_2",
          label: "Sekretaris UKM II",
          icon: <Shield className="w-4 h-4" />,
          color: "from-blue-400 to-blue-500",
          description: "Membantu sekretaris I dalam administrasi"
        },
        {
          value: "bendahara_ukm_1",
          label: "Bendahara UKM I",
          icon: <Award className="w-4 h-4" />,
          color: "from-green-500 to-green-600",
          description: "Mengelola keuangan dan anggaran UKM"
        },
        {
          value: "bendahara_ukm_2",
          label: "Bendahara UKM II",
          icon: <Award className="w-4 h-4" />,
          color: "from-green-400 to-green-500",
          description: "Membantu bendahara I dalam pengelolaan keuangan"
        },
      ]
    },
    {
      id: "department",
      name: "Department",
      icon: <Building className="w-5 h-5" />,
      color: "from-emerald-500 to-teal-500",
      roles: [
        {
          value: "ketua_department",
          label: "Ketua Department",
          icon: <Crown className="w-4 h-4" />,
          color: "from-emerald-500 to-emerald-600",
          description: "Memimpin department"
        },
        {
          value: "wakil_ketua_department",
          label: "Wakil Ketua Department",
          icon: <Crown className="w-4 h-4" />,
          color: "from-emerald-400 to-emerald-500",
          description: "Membantu Ketua department"
        },
        {
          value: "sekretaris_departemen_1",
          label: "Sekretaris Departemen I",
          icon: <Shield className="w-4 h-4" />,
          color: "from-blue-500 to-blue-600",
          description: "Mengatur administrasi dan dokumentasi Departemen"
        },
        {
          value: "sekretaris_departemen_2",
          label: "Sekretaris Departemen II",
          icon: <Shield className="w-4 h-4" />,
          color: "from-blue-400 to-blue-500",
          description: "Membantu sekretaris I dalam administrasi"
        },
        {
          value: "bendahara_departemen_1",
          label: "Bendahara Departemen I",
          icon: <Award className="w-4 h-4" />,
          color: "from-green-500 to-green-600",
          description: "Mengelola keuangan dan anggaran Departemen"
        },
        {
          value: "bendahara_departemen_2",
          label: "Bendahara Departemen II",
          icon: <Award className="w-4 h-4" />,
          color: "from-green-400 to-green-500",
          description: "Membantu bendahara I dalam pengelolaan keuangan"
        },
      ]
    }
  ];

  // Filter states
  const [searchName, setSearchName] = useState("");
  const [searchProdi, setSearchProdi] = useState("");
  const [searchAngkatan, setSearchAngkatan] = useState("");

  // Fetch organizations from separate API endpoints
  const fetchOrganizations = async () => {
    setLoadingOrganizations(true);
    const token = sessionStorage.getItem("token");

    try {
      // Fetch Himpunan
      const himpunanResponse = await fetch("http://localhost:8080/api/association", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!himpunanResponse.ok) throw new Error(`HTTP error! status: ${himpunanResponse.status}`);
      const himpunanResult: OrganizationsApiResponse = await himpunanResponse.json();
      setHimpunanOrgs(himpunanResult.data);
    } catch (err) {
      console.error("Gagal fetch himpunan:", err);
    } finally {
      setLoadingOrganizations(false);
    }

    // Fetch UKM
    try {
      const ukmResponse = await fetch("http://localhost:8080/api/club", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!ukmResponse.ok) throw new Error(`HTTP error! status: ${ukmResponse.status}`);
      const ukmResult: OrganizationsApiResponse = await ukmResponse.json();
      setUkmOrgs(ukmResult.data);
    } catch (err) {
      console.error("Gagal fetch organizations:", err);
    } finally {
      setLoadingOrganizations(false);
    }

    // Fetch Department
    try {
      const departmentResponse = await fetch("http://localhost:8080/api/department", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!departmentResponse.ok) throw new Error(`HTTP error! status: ${departmentResponse.status}`);
      const departmentResult: OrganizationsApiResponse = await departmentResponse.json();
      setDepartmentOrgs(departmentResult.data);
    } catch (err) {
      console.error("Gagal fetch organizations:", err);
    } finally {
      setLoadingOrganizations(false);
    }
  };

  // Get role categories with organizations from API
  const getRoleCategories = (): RoleCategory[] => {
    return baseRoleCategories.map(category => {
      if (category.id === 'bem') {
        return category; // BEM doesn't need organizations
      }
      
      // Assign organizations based on category
      let categoryOrganizations: Organization[] = [];
      if (category.id === 'himpunan') categoryOrganizations = himpunanOrgs;
      if (category.id === 'ukm') categoryOrganizations = ukmOrgs;
      if (category.id === 'department') categoryOrganizations = departmentOrgs;

      return {
        ...category,
        organizations: categoryOrganizations
      };
    });
  };

  const fetchData = async (pageNumber: number) => {
    setLoading(true);
    const token = sessionStorage.getItem("token");

    try {
      const params = new URLSearchParams();
      params.append('page', pageNumber.toString());
      params.append('per_page', '10');
      
      if (searchName.trim()) {
        params.append('name', searchName.trim());
      }
      if (searchProdi.trim()) {
        params.append('study_program', searchProdi.trim());
      }
      if (searchAngkatan.trim()) {
        params.append('year_enrolled', searchAngkatan.trim());
      }

      let res = await fetch(
        `http://localhost:8080/api/admin/students?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      let json: ApiResponse = await res.json();
      setData(json.data);
      setTotalPages(json.metadata.total_pages);
      setTotalItems(json.metadata.total_items);
      setPage(json.metadata.current_page);
    } catch (err) {
      console.error("Gagal fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Assign role to student - UPDATED to include period parameter
  const assignRole = async (studentId: number, role: string, category: string, period: string, organizationId?: number, organizationShortname?: string, positionTitle?: string) => {
    const token = sessionStorage.getItem("token");
    setAssigningRole(studentId);

    try {
      const requestBody: any = { 
        studentId,
        role, 
        category,
        period, // Added period to the request body
        position_title: positionTitle || role // Use provided position title or fallback to role
      };
      if (organizationId) {
        requestBody.organization_id = organizationId;
        requestBody.organization_shortname = organizationShortname;
      }

      console.log("Role yang dikirim:", requestBody);

      const response = await fetch(`http://localhost:8080/api/admin/students/${studentId}/assign`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();

      
      if (result.status === "success") {
        setData(prevData => 
          prevData.map(student => 
            student.id === studentId 
              ? { 
                  ...student, 
                  current_role: role, 
                  current_category: category,
                  current_organization_id: organizationId,
                  current_organization_shortname: organizationShortname,
                  current_position_title: positionTitle || role,
                  period: period, // Update the period in state
                }
              : student
          )
        );
        
        alert(`Role berhasil diberikan kepada mahasiswa untuk periode ${period}!`);
      }
    } catch (err) {
      console.error("Gagal assign role:", err);
      alert("Gagal memberikan role. Silakan coba lagi.");
    } finally {
      setAssigningRole(null);
    }
  };

  const RoleAssignmentModal = ({ 
    student, 
    isOpen, 
    onClose 
  }: { 
    student: Mahasiswa | null, 
    isOpen: boolean, 
    onClose: () => void 
  }) => {
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [expandedOrganization, setExpandedOrganization] = useState<number | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState<string>(availablePeriods.find(p => p)?.value || availablePeriods[0]?.value || "");

    if (!isOpen || !student) return null;

    const roleCategories = getRoleCategories();

    const getCurrentRoleInfo = () => {
      for (const category of roleCategories) {
        const role = category.roles.find(r => r.value === student.current_role);
        if (role) {
          const organization = category.organizations?.find(org => org.id === student.current_organization_id);
          return { category, role, organization };
        }
      }
      return null;
    };

    const currentRoleInfo = getCurrentRoleInfo();

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div 
            className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
            onClick={onClose}
          ></div>

          <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <UserPlus className="h-6 w-6 text-blue-600" />
              </div>
              
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
                  Berikan Role kepada Mahasiswa
                </h3>
                
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Nama:</strong> {student.full_name}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>NIM:</strong> {student.nim}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Program Studi:</strong> {student.study_program}
                  </p>
                  {currentRoleInfo && (
                    <div className="mt-2 p-2 bg-white rounded border">
                      <p className="text-sm text-gray-600">
                        <strong>Role Saat Ini:</strong>
                      </p>
                      <div className="flex items-center mt-1 flex-wrap gap-2">
                        <div className={`p-1 rounded bg-gradient-to-r ${currentRoleInfo.role.color} text-white`}>
                          {currentRoleInfo.role.icon}
                        </div>
                        <span className="text-sm font-medium">{student.current_position_title || currentRoleInfo.role.label}</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {currentRoleInfo.category.name}
                        </span>
                        {currentRoleInfo.organization && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            {student.current_organization_shortname || currentRoleInfo.organization.shortname || currentRoleInfo.organization.name}
                          </span>
                        )}
                        {student.period && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {student.period}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Period Selection Section - UPDATED to use dropdown */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <label htmlFor="periodSelect" className="block text-sm font-medium text-blue-900 mb-3">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Pilih Periode Jabatan:
                  </label>
                  <div className="relative">
                    <select
                      id="periodSelect"
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="text-gray-500">
                        -- Pilih Periode --
                      </option>
                      {availablePeriods.map((period) => (
                        <option key={period.value} value={period.value} className="text-gray-900">
                          {period.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {selectedPeriod && (
                    <div className="mt-2 flex items-center text-sm text-blue-700">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span>Periode dipilih: <strong>{selectedPeriod}</strong></span>
                    </div>
                  )}
                  {!selectedPeriod && (
                    <p className="text-red-600 text-sm mt-2 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Silakan pilih periode sebelum memberikan role.
                    </p>
                  )}
                </div>

                {loadingOrganizations ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <span className="ml-2 text-gray-600">Memuat organisasi...</span>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto">                   
                    {roleCategories.map((category) => (
                      <div key={category.id} className="border border-gray-200 rounded-lg">
                        <button
                          onClick={() => setExpandedCategory(
                            expandedCategory === category.id ? null : category.id
                          )}
                          className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors duration-200"
                        >
                          <div className="flex items-center">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color} text-white mr-3`}>
                              {category.icon}
                            </div>
                            <span className="font-medium text-gray-900">{category.name}</span>
                          </div>
                          {expandedCategory === category.id ? (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          )}
                        </button>

                        {expandedCategory === category.id && (
                          <div className="border-t border-gray-200">
                            {category.id === 'bem' ? (
                              category.roles.map((role) => (
                                <button
                                  key={role.value}
                                  onClick={() => {
                                    if (!selectedPeriod) {
                                      alert('Silakan pilih periode terlebih dahulu!');
                                      return;
                                    }
                                    assignRole(student.id, role.value, category.id, selectedPeriod, undefined, undefined, role.label);
                                    onClose();
                                  }}
                                  disabled={assigningRole === student.id || !selectedPeriod}
                                  className={`w-full flex items-center justify-start p-3 text-left transition-all duration-200 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                                    student.current_role === role.value && student.current_category === category.id && !student.current_organization_id
                                      ? 'bg-blue-50'
                                      : ''
                                  } ${assigningRole === student.id || !selectedPeriod ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                  <div className={`p-2 rounded-lg bg-gradient-to-r ${role.color} text-white mr-3 ml-6`}>
                                    {role.icon}
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium text-gray-900">{role.label}</p>
                                    <p className="text-sm text-gray-600">{role.description}</p>
                                  </div>
                                  {student.current_role === role.value && student.current_category === category.id && !student.current_organization_id && (
                                    <CheckCircle className="w-5 h-5 text-blue-500 ml-auto" />
                                  )}
                                </button>
                              ))
                            ) : (
                              category.organizations && category.organizations.length > 0 ? (
                                category.organizations.map((organization) => (
                                  <div key={organization.id} className="border-b border-gray-100 last:border-b-0">
                                    <button
                                      onClick={() => setExpandedOrganization(
                                        expandedOrganization === organization.id ? null : organization.id
                                      )}
                                      className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors duration-200 ml-6"
                                    >
                                      <div className="flex items-center">
                                        <Building className="w-4 h-4 text-gray-500 mr-2" />
                                        <span className="font-medium text-gray-800">{organization.name}</span>
                                        {organization.shortname && (
                                          <span className="ml-2 text-sm text-gray-500">({organization.shortname})</span>
                                        )}
                                        {organization.description && (
                                          <span className="ml-2 text-sm text-gray-500"> - {organization.description}</span>
                                        )}
                                      </div>
                                      {expandedOrganization === organization.id ? (
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                      ) : (
                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                      )}
                                    </button>

                                    {expandedOrganization === organization.id && (
                                      <div className="ml-12">
                                        {category.roles.map((role) => (
                                          <button
                                            key={`${organization.id}-${role.value}`}
                                            onClick={() => {
                                              if (!selectedPeriod) {
                                                alert('Silakan pilih periode terlebih dahulu!');
                                                return;
                                              }
                                              assignRole(student.id, role.value, category.id, selectedPeriod, organization.id, organization.shortname || organization.name, role.label);
                                              onClose();
                                            }}
                                            disabled={assigningRole === student.id || !selectedPeriod}
                                            className={`w-full flex items-center justify-start p-3 text-left transition-all duration-200 hover:bg-gray-50 border-b border-gray-50 last:border-b-0 ${
                                              student.current_role === role.value && 
                                              student.current_category === category.id && 
                                              student.current_organization_id === organization.id
                                                ? 'bg-blue-50'
                                                : ''
                                            } ${assigningRole === student.id || !selectedPeriod ? 'opacity-50 cursor-not-allowed' : ''}`}
                                          >
                                            <div className={`p-2 rounded-lg bg-gradient-to-r ${role.color} text-white mr-3`}>
                                              {role.icon}
                                            </div>
                                            <div className="flex-1">
                                              <p className="font-medium text-gray-900">{role.label}</p>
                                              <p className="text-sm text-gray-600">{role.description}</p>
                                            </div>
                                            {student.current_role === role.value && 
                                             student.current_category === category.id && 
                                             student.current_organization_id === organization.id && (
                                              <CheckCircle className="w-5 h-5 text-blue-500 ml-auto" />
                                            )}
                                          </button>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))
                              ) : (
                                <div className="p-4 text-center text-gray-500">
                                  <Building className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                                  <p>Tidak ada {category.name.toLowerCase()} yang tersedia</p>
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={onClose}
                className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const [selectedStudent, setSelectedStudent] = useState<Mahasiswa | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAssignRole = (student: Mahasiswa) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    fetchData(1);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const hasActiveFilters = searchName.trim() || searchProdi.trim() || searchAngkatan.trim();

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const delta = 2;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > delta + 2) pages.push("...");
      const start = Math.max(2, page - delta);
      const end = Math.min(totalPages - 1, page + delta);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (page < totalPages - delta - 1) pages.push("...");
      if (totalPages > 1) pages.push(totalPages);
    }
    return pages;
  };

  const allOrganizations = [...himpunanOrgs, ...ukmOrgs, ...departmentOrgs];

  const LoadingState = () => (
    <div className="min-h-96 flex items-center justify-center bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-spin">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="text-gray-600 font-medium">Memuat data mahasiswa...</p>
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );

  if (loading) return <LoadingState />;

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Data Mahasiswa</h1>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <label
              htmlFor="searchName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nama
            </label>
            <div className="relative">
              <input
                id="searchName"
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
                placeholder="Cari berdasarkan nama..."
                className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="relative">
            <label htmlFor="searchProdi" className="block text-sm font-medium text-gray-700 mb-2">
              Program Studi
            </label>
            <div className="relative">
              <input
                id="searchProdi"
                type="text"
                value={searchProdi}
                onChange={(e) => setSearchProdi(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Cari berdasarkan program studi..."
                className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="relative">
            <label htmlFor="searchAngkatan" className="block text-sm font-medium text-gray-700 mb-2">
              Angkatan
            </label>
            <div className="relative">
              <input
                id="searchAngkatan"
                type="number"
                value={searchAngkatan}
                onChange={(e) => setSearchAngkatan(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Cari berdasarkan tahun..."
                min="2019"
                max="2025"
                className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {allOrganizations.length > 0 && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-blue-600 mr-2" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Himpunan</p>
                  <p className="text-lg font-bold text-blue-600">{himpunanOrgs.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="flex items-center">
                <Trophy className="w-5 h-5 text-purple-600 mr-2" />
                <div>
                  <p className="text-sm font-medium text-purple-900">UKM</p>
                  <p className="text-lg font-bold text-purple-600">{ukmOrgs.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-emerald-50 rounded-lg p-3">
              <div className="flex items-center">
                <Building className="w-5 h-5 text-emerald-600 mr-2" />
                <div>
                  <p className="text-sm font-medium text-emerald-900">Department</p>
                  <p className="text-lg font-bold text-emerald-600">{departmentOrgs.length}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <DataTable
          data={data}
          fields={fields}
          onEdit={handleAssignRole}
          currentPage={page}
          perPage={10}
          actionLabel="Atur Role"
          actionIcon={<UserPlus size={16} />}
        />
      </div>

      <RoleAssignmentModal
        student={selectedStudent}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedStudent(null);
        }}
      />

      {totalPages > 1 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-600">
              Menampilkan <span className="font-medium text-gray-900">{(page - 1) * 10 + 1}</span> - 
              <span className="font-medium text-gray-900">{Math.min(page * 10, totalItems)}</span> dari 
              <span className="font-medium text-gray-900"> {totalItems}</span> mahasiswa
              {hasActiveFilters && <span className="text-blue-600"> (terfilter)</span>}
            </div>

            <nav className="flex items-center space-x-1">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              <div className="hidden sm:flex items-center space-x-1">
                {getPageNumbers().map((num, idx) =>
                  typeof num === "number" ? (
                    <button
                      key={idx}
                      onClick={() => setPage(num)}
                      className={`inline-flex items-center justify-center w-10 h-10 text-sm font-medium rounded-lg transition-all duration-200 ${
                        num === page
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                          : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {num}
                    </button>
                  ) : (
                    <span key={idx} className="inline-flex items-center justify-center w-10 h-10 text-gray-400">
                      {num}
                    </span>
                  )
                )}
              </div>

              <div className="sm:hidden px-4 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg">
                {page} / {totalPages}
              </div>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Next
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableContainer;