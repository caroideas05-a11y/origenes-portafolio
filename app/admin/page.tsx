"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase";
import { LogOut, Plus, Trash2, ExternalLink } from "lucide-react";

type Project = { id:string; title:string; category:string; video_url:string; published:boolean; created_at:string };
const cats = ["Gastronomía","Eventos","Producción audiovisual","Branding y diseño"];

export default function Admin() {
  const [ready,setReady] = useState(false); const [projects,setProjects] = useState<Project[]>([]);
  const [title,setTitle] = useState(""); const [category,setCategory] = useState(cats[0]);
  const [description,setDescription] = useState(""); const [video,setVideo] = useState<File|null>(null);
  const [cover,setCover] = useState<File|null>(null); const [busy,setBusy] = useState(false); const [msg,setMsg] = useState("");
  const router = useRouter();
  const db = supabaseBrowser();

  async function load() {
    const { data:{user} } = await db.auth.getUser();
    if (!user) { router.replace("/admin/login"); return; }
    const { data } = await db.from("projects").select("*").order("created_at",{ascending:false});
    setProjects((data || []) as Project[]); setReady(true);
  }
  useEffect(()=>{ load(); },[]);
  async function upload(e:React.FormEvent) {
    e.preventDefault(); if (!video) { setMsg("Selecciona el video que quieres subir."); return; }
    setBusy(true); setMsg("");
    try {
      const safe = (file:File) => `${Date.now()}-${file.name.toLowerCase().replace(/[^a-z0-9.-]/g,"-")}`;
      const videoPath = safe(video);
      const { error:ve } = await db.storage.from("portfolio").upload(videoPath,video,{upsert:false});
      if (ve) throw ve;
      const videoUrl = db.storage.from("portfolio").getPublicUrl(videoPath).data.publicUrl;
      let coverUrl:string|null = null;
      if (cover) {
        const coverPath = safe(cover);
        const { error:ce } = await db.storage.from("portfolio").upload(coverPath,cover,{upsert:false});
        if (ce) throw ce;
        coverUrl = db.storage.from("portfolio").getPublicUrl(coverPath).data.publicUrl;
      }
      const { error:pe } = await db.from("projects").insert({title,category,description,video_url:videoUrl,cover_url:coverUrl,published:true});
      if (pe) throw pe;
      setTitle(""); setDescription(""); setVideo(null); setCover(null); setMsg("Proyecto publicado correctamente."); await load();
      const form = document.getElementById("project-form") as HTMLFormElement; form?.reset();
    } catch(err) { setMsg(err instanceof Error ? err.message : "No se pudo publicar."); }
    finally { setBusy(false); }
  }
  async function toggle(id:string, published:boolean) {
    const {error} = await db.from("projects").update({published:!published}).eq("id",id);
    if (error) setMsg(error.message); else await load();
  }
  async function remove(id:string) {
    if (!confirm("¿Eliminar este proyecto de la galería?")) return;
    const {error} = await db.from("projects").delete().eq("id",id);
    if (error) setMsg(error.message); else await load();
  }
  async function logout(){ await db.auth.signOut(); router.push("/admin/login"); router.refresh(); }
  if (!ready) return <main className="admin-shell"><p>Cargando panel…</p></main>;
  return <main className="admin-page"><header className="admin-top"><a className="brand" href="/">ORÍGENES<span>®</span><small>ADMINISTRACIÓN</small></a><button className="outline-btn" onClick={logout}><LogOut size={16}/> Cerrar sesión</button></header>
    <div className="admin-content"><p className="eyebrow">PANEL PRIVADO</p><h1>Tu portafolio,<br/><em>siempre actualizado.</em></h1>
      <div className="admin-columns"><form id="project-form" className="upload-card" onSubmit={upload}><h2><Plus size={20}/> Añadir proyecto</h2>
        <label>Nombre del proyecto<input value={title} onChange={e=>setTitle(e.target.value)} required placeholder="Ej. Campaña gastronómica"/></label>
        <label>Categoría<select value={category} onChange={e=>setCategory(e.target.value)}>{cats.map(c=><option key={c}>{c}</option>)}</select></label>
        <label>Descripción<textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Cuéntale al visitante de qué trata este trabajo."/></label>
        <label>Video (MP4, MOV)<input type="file" accept="video/mp4,video/quicktime,video/webm" onChange={e=>setVideo(e.target.files?.[0]||null)} required/></label>
        <label>Imagen de portada (opcional)<input type="file" accept="image/*" onChange={e=>setCover(e.target.files?.[0]||null)}/></label>
        <button className="button dark full" disabled={busy}>{busy ? "Subiendo proyecto…" : "Publicar proyecto"}</button>
        {msg && <p className="status">{msg}</p>}
        <p className="hint">Consejo: usa videos optimizados para web. Para archivos muy grandes conviene integrar un servicio especializado de video.</p>
      </form>
      <section className="project-manager"><h2>Proyectos cargados <span>{projects.length}</span></h2>
        {projects.length===0 && <p className="muted">Todavía no has añadido proyectos.</p>}
        {projects.map(p=><article className="manage-row" key={p.id}><div><b>{p.title}</b><small>{p.category} · {p.published?"Publicado":"Oculto"}</small></div><div className="manage-actions"><button onClick={()=>toggle(p.id,p.published)}>{p.published?"Ocultar":"Publicar"}</button><a href={p.video_url} target="_blank" rel="noreferrer" aria-label="Abrir video"><ExternalLink size={16}/></a><button onClick={()=>remove(p.id)} aria-label="Eliminar"><Trash2 size={16}/></button></div></article>)}
      </section></div>
    </div>
  </main>;
}
