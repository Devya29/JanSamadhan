import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Camera } from "lucide-react";
import { createComplaint } from "@/services/complaintService";
import { citizenUser } from "@/data/mockUsers";

import { getCategoryIcon } from "@/lib/categoryIcons";

const categories = {
  "Water Supply": ["Low Pressure", "No Supply", "Insufficient Supply", "Contamination", "Leakage"],
  "Waste / Garbage": ["Collection Failure", "Overflow", "Illegal Dumping", "Other"],
  "Road / Pothole": ["Pothole", "Road Damage", "Road Cave-in", "Damaged Divider"],
  "Streetlight": ["Non-Functional", "Flickering", "Missing Light", "Other"],
  "Drainage": ["Blocked Drain", "Overflow", "Waterlogging", "Other"],
  "Other": ["Other"]
};
const areas = ["Arera Colony", "MP Nagar", "Kolar", "Shahpura", "Habibganj", "Piplani", "Bhopal Central", "Other"];
const durations = ["Today", "1-2 days", "3 days", "1 week", "2 weeks", "More than a month"];

// TODO: Replace mock submission with POST /api/complaints

export default function ReportProblem() {
  const navigate = useNavigate();
  const [step, setStep] = useState("form");
  const [submitted, setSubmitted] = useState(null);
  const [form, setForm] = useState({ description: "", category: "", subcategory: "", area: "", address: "", reportedDuration: "", photo: null });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.description.trim()) e.description = "Please describe the problem.";
    if (!form.category) e.category = "Please select a category.";
    if (!form.subcategory) e.subcategory = "Please select a subcategory.";
    if (!form.area) e.area = "Please select an area.";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {setErrors(errs);return;}
    const complaint = createComplaint({
      description: form.description, category: form.category, subcategory: form.subcategory,
      location: `${form.area}, Bhopal`, area: form.area, address: form.address,
      photo: form.photo, reportedDuration: form.reportedDuration || "Unknown",
      reporterName: citizenUser.name, reporterEmail: citizenUser.email
    });
    setSubmitted(complaint);
    setStep("success");
  };

  if (step === "success" && submitted) {
    return (
      <div className="bg-mesh min-h-full flex items-center justify-center px-4 py-12">
        <div className="glass-card rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-success/15 border border-success/30 flex items-center justify-center mx-auto mb-5 text-success glow-teal">
            <CheckCircle2 size={30} />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-1">Complaint Submitted!</h2>
          <p className="text-muted-foreground text-sm mb-6">Your complaint has been recorded and will be analyzed shortly.</p>

          <div className="glass rounded-xl p-4 text-left space-y-3 mb-6">
            {[
            { l: "Complaint ID", v: submitted.id, accent: true },
            { l: "Submitted", v: new Date(submitted.submittedAt).toLocaleString("en-IN"), accent: false },
            { l: "Location", v: submitted.location, accent: false },
            { l: "Category", v: `${submitted.category} — ${submitted.subcategory}`, accent: false },
            { l: "Reported duration", v: submitted.reportedDuration, accent: false },
            { l: "Status", v: "Submitted", accent: false }].
            map(({ l, v, accent }) =>
            <div key={l} className="flex items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground">{l}</span>
                <span className={`text-xs font-medium ${accent ? "font-mono-civic text-teal" : "text-foreground"}`}>{v}</span>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button onClick={() => navigate("/citizen/complaints")}
            className="flex-1 py-2.5 bg-teal text-navy rounded-lg text-sm font-semibold hover:opacity-90 glow-teal">
              View My Complaints
            </button>
            <button onClick={() => {setStep("form");setForm({ description: "", category: "", subcategory: "", area: "", address: "", reportedDuration: "", photo: null });setErrors({});}}
            className="flex-1 py-2.5 glass text-foreground rounded-lg text-sm font-medium hover:bg-secondary border border-border">
              Report Another
            </button>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="bg-mesh min-h-full px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-7">
          <h1 className="font-display text-2xl font-bold text-foreground mb-1">Report a Problem</h1>
          <p className="text-muted-foreground text-sm">Describe the civic issue. Your complaint will be analyzed and may be linked to a related civic issue.</p>
        </div>

        {/* Category quick-select */}
        <div className="glass-card rounded-xl p-4 mb-5">
          <p className="text-xs font-mono-civic text-muted-foreground uppercase tracking-widest mb-3">Select Category</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {Object.keys(categories).map((c) =>
            <button
              key={c}
              onClick={() => setForm({ ...form, category: c, subcategory: "" })}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all text-center ${
              form.category === c ?
              "bg-teal/15 border-teal/40 text-teal" :
              "border-border text-muted-foreground hover:border-teal/40 hover:text-foreground"}`
              }>
              
                <span className="text-xl">{(() => {const Icon = getCategoryIcon(c);return <Icon size={20} />;})()}</span>
                <span className="text-[10px] leading-tight">{c.split(" / ")[0]}</span>
              </button>
            )}
          </div>
          {errors.category && <p className="text-xs text-danger mt-2">{errors.category}</p>}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Description */}
          <div className="glass-card rounded-xl p-4">
            <label htmlFor="desc" className="block text-sm font-medium text-foreground mb-2">
              Problem Description <span className="text-danger">*</span>
            </label>
            <textarea
              id="desc"
              rows={4}
              placeholder="Describe the civic problem in detail..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg resize-none focus:outline-none" />
            
            {errors.description && <p className="text-xs text-danger mt-1">{errors.description}</p>}
          </div>

          {/* Subcategory + Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card rounded-xl p-4">
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Subcategory <span className="text-danger">*</span></label>
              <select value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
              disabled={!form.category}
              className="w-full px-3 py-2 text-sm rounded-lg focus:outline-none disabled:opacity-40">
                <option value="">Select subcategory</option>
                {(categories[form.category] || []).map((s) => <option key={s}>{s}</option>)}
              </select>
              {errors.subcategory && <p className="text-xs text-danger mt-1">{errors.subcategory}</p>}
            </div>
            
            {/*<div className="glass-card rounded-xl p-4">
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Area <span className="text-danger">*</span></label>
              <select value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg focus:outline-none">
                <option value="">Select area</option>
                {areas.map((a) => <option key={a}>{a}</option>)}
              </select>
              {errors.area && <p className="text-xs text-danger mt-1">{errors.area}</p>}
            </div>*/}
          </div>

          {/* Address + Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card rounded-xl p-4">
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Address <span className="text-muted-foreground/50 text-[10px]">(optional)</span></label>
              <input type="text" placeholder="House no., street..." value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg focus:outline-none" />
            </div>
            <div className="glass-card rounded-xl p-4">
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Duration <span className="text-muted-foreground/50 text-[10px]">(optional)</span></label>
              <select value={form.reportedDuration} onChange={(e) => setForm({ ...form, reportedDuration: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg focus:outline-none">
                <option value="">How long?</option>
                {durations.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>

          {/* Photo Upload */}
<div className="glass-card rounded-xl p-4">
  <label className="block text-sm font-medium text-foreground mb-3">
    Photo <span className="text-muted-foreground/50 text-xs">(optional)</span>
  </label>

  <label
    htmlFor="photo-upload"
    className="block border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-teal/50 transition-colors"
  >
    <Camera size={24} className="mx-auto mb-2 text-muted-foreground" />

    <p className="text-sm text-muted-foreground">
      {form.photo
        ? form.photo.name
        : "Click to upload a photo"}
    </p>

    <p className="text-xs text-muted-foreground/50 mt-1">
      JPG, PNG or JPEG
    </p>

    <input
      id="photo-upload"
      type="file"
      accept="image/jpeg,image/png,image/jpg"
      className="hidden"
      onChange={(e) => {
        const file = e.target.files?.[0] || null;
        setForm({ ...form, photo: file });
      }}
    />
  </label>

  {form.photo && (
    <div className="mt-3 flex items-center justify-between">
      <p className="text-xs text-muted-foreground truncate max-w-[80%]">
        Selected: {form.photo.name}
      </p>

      <button
        type="button"
        onClick={() => setForm({ ...form, photo: null })}
        className="text-xs text-danger hover:underline"
      >
        Remove
      </button>
    </div>
  )}
</div>

          <button type="submit"
          className="w-full py-3.5 bg-teal text-navy rounded-xl font-bold text-sm hover:opacity-90 glow-teal transition-opacity">
            Submit Complaint
          </button>
        </form>
      </div>
    </div>);

}