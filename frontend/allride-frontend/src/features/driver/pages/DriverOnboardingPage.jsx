import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Car } from "lucide-react";
import { AuthPageShell, AuthCard } from "@/features/auth/components/AuthPageShell";
import { authLabelClass, authInputClass, authMutedText } from "@/features/auth/constants/authStyles";
import { createDriverProfile } from "../api/driverApi";

const INITIAL = {
  licenseNumber: "",
  vehicleMake: "",
  vehicleModel: "",
  vehiclePlate: "",
  vehicleColor: "",
  vehicleType: "Sedan",
};

function DriverOnboardingPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createDriverProfile(form);
      toast.success("Profile submitted! Waiting for admin approval.");
      navigate("/driver/home", { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Could not create profile. Try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // const inputClass =
  //   "w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black/10";

  return (
    <AuthPageShell backTo="/driver/home" backLabel="Back" maxWidth="max-w-lg">
      <AuthCard className="p-8">
        <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 dark:bg-blue-500/20 dark:border-blue-500/30 flex items-center justify-center mx-auto mb-4">
           <Car size={28} className="text-blue-600 dark:text-blue-400" />
        </div>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-white">Complete your driver profile</h1>
          <p className={`${authMutedText} mt-2 text-sm`}>
            Add your license and vehicle details. Allride will review your application before you can go online.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
          <label className={authLabelClass}>License number *</label>
            <input
              name="licenseNumber"
              value={form.licenseNumber}
              onChange={handleChange}
              required
              className={authInputClass()}
              placeholder="DL-XXXX-XXXX"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
            <label className={authLabelClass}>Make *</label>
              <input name="vehicleMake" value={form.vehicleMake} onChange={handleChange} required className={authInputClass()} placeholder="Maruti" />
            </div>
            <div>
            <label className={authLabelClass}>Model *</label>
              <input name="vehicleModel" value={form.vehicleModel} onChange={handleChange} required className={authInputClass()} placeholder="Swift" />
            </div>
          </div>

          <div>
          <label className={authLabelClass}>Registration plate *</label>
            <input name="vehiclePlate" value={form.vehiclePlate} onChange={handleChange} required className={authInputClass()} placeholder="TS-09-AB-1234" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
            <label className={authLabelClass}>Color</label>
              <input name="vehicleColor" value={form.vehicleColor} onChange={handleChange} className={authInputClass()} placeholder="White" />
            </div>
            <div>
            <label className={authLabelClass}>Type</label>
              <select name="vehicleType" value={form.vehicleType} onChange={handleChange} className={authInputClass()}>
                <option>Sedan</option>
                <option>SUV</option>
                <option>Hatchback</option>
                <option>Auto</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-black text-white font-bold text-sm hover:bg-zinc-800 dark:bg-yellow-500 dark:text-black dark:hover:bg-yellow-400 transition disabled:opacity-50 mt-2"          >
            {loading ? "Submitting..." : "Submit for approval"}
          </button>
        </form>
      </AuthCard>
    </AuthPageShell>
  );
}

export default DriverOnboardingPage;