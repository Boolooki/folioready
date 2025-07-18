"use client";
import { useState } from "react";
import { supabase } from "@/libs/supabaseClient";
import { useEffect } from "react";

interface Project {
  title: string;
  description: string;
}

export default function ProfileForm() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [aiResult] = useState("");
  const [generating, setGenerating] = useState(false);
  const [projects, setProjects] = useState<Project[]>([
    { title: "", description: "" },
  ]);
  const [links, setLinks] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSaveToSupabase();
    // TODO: POST ไปยัง /api/generate-portfolio หรือ Supabase
  };

  const addProject = () => {
    setProjects([...projects, { title: "", description: "" }]);
  };

  const updateProject = (index: number, key: keyof Project, value: string) => {
    const updated = [...projects];
    updated[index][key] = value;
    setProjects(updated);
  };

  const handleSaveToSupabase = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;

    if (!user) {
      alert("กรุณาเข้าสู่ระบบก่อนบันทึกข้อมูล");
      return;
    }

    const payload = {
      user_id: user.id,
      name,
      bio,
      skills: skills.split(",").map((s) => s.trim()),
      projects,
      links: links.split(",").map((l) => l.trim()),
      style_preference: "", // เพิ่มภายหลังถ้ามีฟิลด์นี้ในฟอร์ม
      updated_at: new Date().toISOString(),
    };

    // ตรวจว่ามีข้อมูลอยู่แล้วหรือยัง
    const { data: existing, error: fetchError } = await supabase
      .from("portfolio_inputs")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      alert("ไม่สามารถตรวจสอบข้อมูลเก่าได้");
      return;
    }

    let result;
    if (existing) {
      // update
      result = await supabase
        .from("portfolio_inputs")
        .update(payload)
        .eq("user_id", user.id);
    } else {
      // insert
      result = await supabase.from("portfolio_inputs").insert(payload);
    }

    if (result.error) {
      alert("เกิดข้อผิดพลาดในการบันทึก: " + result.error.message);
    } else {
      alert("บันทึกข้อมูลสำเร็จ 🎉");
    }
  };

  useEffect(() => {
    const fetchPortfolioInputs = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;

      if (!user) return;

      const { data, error } = await supabase
        .from("portfolio_inputs")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.warn("ไม่พบข้อมูล portfolio เดิม:", error.message);
        return;
      }

      // ✅ เติมข้อมูลเข้า state
      setName(data.name || "");
      setBio(data.bio || "");
      setSkills(data.skills?.join(", ") || "");
      setLinks(data.links?.join(", ") || "");
      setProjects(data.projects || [{ title: "", description: "" }]);
    };

    fetchPortfolioInputs();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block font-medium">ชื่อ-นามสกุล</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-medium">แนะนำตัว (About Me)</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-medium">ทักษะ (Skills)</label>
        <input
          type="text"
          placeholder="เช่น JavaScript, UX Design"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-medium">โปรเจกต์</label>
        {projects.map((project, i) => (
          <div
            key={i}
            className="mb-4 border rounded p-3 bg-white dark:bg-gray-800"
          >
            <input
              type="text"
              placeholder="ชื่อโปรเจกต์"
              value={project.title}
              onChange={(e) => updateProject(i, "title", e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />
            <textarea
              placeholder="คำอธิบายโปรเจกต์"
              value={project.description}
              onChange={(e) => updateProject(i, "description", e.target.value)}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addProject}
          className="text-sm text-blue-600 underline"
        >
          + เพิ่มโปรเจกต์
        </button>
      </div>

      <div>
        <label className="block font-medium">
          ลิงก์ (GitHub, LinkedIn, ฯลฯ)
        </label>
        <input
          type="text"
          placeholder="คั่นด้วย , เช่น github.com/me, linkedin.com/in/me"
          value={links}
          onChange={(e) => setLinks(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800"
      >
        สร้าง Portfolio ด้วย AI 🚀
      </button>
      <button
        type="button"
        onClick={async () => {
          console.log("🟢 CLICKED Generate AI Button");
          setGenerating(true);

          const { data: sessionData } = await supabase.auth.getSession();
          const user = sessionData.session?.user;
          if (!user) return alert("กรุณาเข้าสู่ระบบ");

          const res = await fetch("/api/generate-portfolio", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: user.id }), // ✅ ต้องเป็น object
          });
          const data = await res.json();
          console.log("🎯 Portfolio response:", data);

          setGenerating(false);
        }}
        className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
        disabled={generating}
      >
        {generating ? "กำลังสร้างด้วย AI..." : "Generate Portfolio ด้วย AI 🚀"}
      </button>
      {aiResult && (
        <div className="mt-8 border rounded p-4 bg-gray-100 dark:bg-gray-800 text-sm whitespace-pre-wrap">
          <h2 className="font-semibold mb-2">ผลลัพธ์ที่ได้จาก AI 👇</h2>
          <pre>{aiResult}</pre>
        </div>
      )}
    </form>
  );
}
