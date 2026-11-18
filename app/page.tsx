import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Instagram, Play, Sparkles } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

type Project = {
  id: string; title: string; category: string; description: string | null;
  video_url: string; cover_url: string | null; featured: boolean;
};

async function getProjects(): Promise<Project[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return [];
  const db = createClient(url, key);
  const { data } = await db.from("projects").select("*").eq("published", true)
    .order("featured", { ascending: false }).order("created_at", { ascending: false });
  return (data || []) as Project[];
}

const categories = ["Todos", "Gastronomía", "Eventos", "Producción audiovisual", "Branding y diseño"];

export default async function Home() {
  const projects = await getProjects();
  return (
    <main>
      <nav className="nav wrap">
        <Link href="/" className="brand">ORÍGENES<span>®</span><small>ESTUDIO CREATIVO</small></Link>
        <div className="navlinks"><a href="#proyectos">Proyectos</a><a href="#servicios">Servicios</a><a href="#contacto">Contacto</a></div>
        <a className="navcta" href="https://www.instagram.com/somos.orige.n/" target="_blank" rel="noreferrer">Hablemos <ArrowUpRight size={15}/></a>
      </nav>

      <section className="hero wrap">
        <div className="hero-copy">
          <p className="eyebrow"><span/> IDEAS QUE TOMAN FORMA</p>
          <h1>Creamos contenido<br/><em>que conecta.</em></h1>
          <p className="hero-text">Estrategia, creatividad y producción audiovisual para marcas que quieren comunicar con intención y destacar.</p>
          <div className="hero-actions"><a className="button dark" href="#proyectos">Explorar proyectos <ArrowDownRight size={17}/></a><a className="textlink" href="#servicios">Conoce lo que hacemos</a></div>
        </div>
        <div className="hero-art">
          <div className="art-frame"><div className="art-inner"><span className="art-word">O.</span><span className="art-caption">CONTENIDO · DISEÑO · EXPERIENCIAS</span></div></div>
          <div className="art-stamp">CHICLAYO<br/>PERÚ<br/>— 2026</div>
        </div>
      </section>

      <section className="intro-band"><div className="wrap intro-inner"><p>NO SOLO PUBLICAMOS.</p><h2>Construimos formas<br/>de contar tu marca.</h2><span>De la idea a la pantalla, creamos piezas que conectan con personas reales.</span></div></section>

      <section className="section wrap" id="proyectos">
        <div className="section-head"><div><p className="eyebrow">UNA MUESTRA DE LO QUE HACEMOS</p><h2>Proyectos <em>seleccionados.</em></h2></div><span className="section-note">TRABAJO REAL · MIRADA CREATIVA</span></div>
        <div className="filters"><span className="filter active">Todos</span>{categories.slice(1).map(c=><span className="filter" key={c}>{c}</span>)}</div>
        {projects.length ? <div className="project-grid">{projects.map(p=><article className="project" key={p.id}>
          <a className="project-media" href={p.video_url} target="_blank" rel="noreferrer">
            {p.cover_url ? <img src={p.cover_url} alt={p.title}/> : <div className="video-placeholder"><Play size={28}/><span>VER PROYECTO</span></div>}
            <span className="play"><Play size={17} fill="currentColor"/></span>
          </a>
          <div className="project-meta"><span>{p.category}</span>{p.featured && <b>DESTACADO</b>}</div><h3>{p.title}</h3><p>{p.description}</p>
        </article>)}</div> : <div className="empty-projects"><Sparkles size={23}/><h3>Estamos preparando esta galería.</h3><p>Pronto encontrarás aquí nuestros proyectos de gastronomía, eventos, producción audiovisual y diseño.</p></div>}
      </section>

      <section className="services" id="servicios"><div className="wrap services-inner"><div><p className="eyebrow">LO QUE PODEMOS CREAR JUNTOS</p><h2>Creatividad con<br/><em>dirección.</em></h2><p className="service-lead">Acompañamos a las marcas desde la idea hasta la publicación.</p></div><div className="service-list">
        {["Producción de videos","Community Management","Diseño gráfico","Cobertura de eventos","Branding e identidad visual"].map((s,i)=><div className="service-row" key={s}><span>0{i+1}</span><strong>{s}</strong><ArrowUpRight size={18}/></div>)}
      </div></div></section>

      <section className="contact wrap" id="contacto"><p className="eyebrow">¿TIENES UNA IDEA EN MENTE?</p><h2>Hagamos que<br/><em>tome forma.</em></h2><p>Cuéntanos sobre tu marca, proyecto o próximo evento.</p><a className="button dark" href="https://www.instagram.com/somos.orige.n/" target="_blank" rel="noreferrer">Conversemos por Instagram <Instagram size={17}/></a></section>
      <footer className="footer"><div className="wrap footer-inner"><Link href="/" className="brand">ORÍGENES<span>®</span><small>ESTUDIO CREATIVO</small></Link><span>Chiclayo, Perú · © 2026 ORÍGENES</span><Link href="/admin/login">Acceso privado ↗</Link></div></footer>
    </main>
  );
}
