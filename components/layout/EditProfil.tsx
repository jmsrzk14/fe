import { useState } from "react";
import { X, Save, Camera, Linkedin, Instagram, MessageCircle, Loader2 } from "lucide-react";

interface EditSocialModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: any;
  onSave: (updatedProfile: any) => Promise<void>; // sekarang async
}

export default function EditSocialModal({
  isOpen,
  onClose,
  profile,
  onSave,
}: EditSocialModalProps) {
  const [formData, setFormData] = useState({
    image: profile.image || "",
    imageFile: null as File | null,    // buat dikirim ke backend
    linkedin: profile.linkedin || "",
    instagram: profile.instagram || "",
    whatsapp: profile.whatsapp || "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage(null);

      await onSave(formData);

      setMessage({ type: "success", text: "Berhasil menyimpan perubahan!" });
      setTimeout(() => {
        setLoading(false);
        onClose();
      }, 1200);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Gagal menyimpan. Coba lagi." });
      setLoading(false);
    }
  };

  if (!isOpen) {
    console.log("Modal tidak terbuka, isOpen:", isOpen);
    return null;
    }

  return (
    <div className="absolute inset-0 bg-black/20 flex justify-center z-50">
      <div className="bg-white w-full h-[90vh] max-w-lg rounded-2xl shadow-xl p-6 relative mt-12">
        {/* Header */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          disabled={loading}
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-semibold mb-6">Edit Gambar & Sosial Media</h2>

        {/* Upload Gambar */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">Foto Profil</label>
          <div className="flex items-center gap-4">
            {formData.image ? (
              <img
                src={formData.image}
                alt="preview"
                className="w-16 h-16 rounded-full object-cover border"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <Camera className="text-gray-500" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              disabled={loading}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    handleChange("image", reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>
        </div>

        {/* LinkedIn */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">LinkedIn</label>
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <Linkedin size={18} className="text-blue-600" />
            <input
              type="text"
              disabled={loading}
              value={formData.linkedin}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              placeholder="https://linkedin.com/in/username"
              className="flex-1 outline-none"
            />
          </div>
        </div>

        {/* Instagram */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Instagram</label>
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <Instagram size={18} className="text-pink-500" />
            <input
              type="text"
              disabled={loading}
              value={formData.instagram}
              onChange={(e) => handleChange("instagram", e.target.value)}
              placeholder="@username"
              className="flex-1 outline-none"
            />
          </div>
        </div>

        {/* WhatsApp */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">WhatsApp</label>
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <MessageCircle size={18} className="text-green-500" />
            <input
              type="text"
              disabled={loading}
              value={formData.whatsapp}
              onChange={(e) => handleChange("whatsapp", e.target.value)}
              placeholder="+62xxxxxxxxxxx"
              className="flex-1 outline-none"
            />
          </div>
        </div>

        {/* Pesan Notifikasi */}
        {message && (
          <div
            className={`mb-4 text-sm px-3 py-2 rounded-lg ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={loading}
          className={`w-full bg-purple-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700 transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </div>
  );
}
