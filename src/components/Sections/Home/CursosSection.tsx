import { Link } from "react-router-dom";
import { motion } from "motion/react";

import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";

import { LuWrench, LuNetwork, LuTerminal } from "react-icons/lu";

const CursosSection = () => {
  // Datos de cursos (usar keys estables)
  const cursos = [
    {
      key: "soporte",
      titulo: "Soporte IT 🧰",
      desc:
        "Un curso práctico donde vemos cómo funciona una PC por dentro, cómo detectar fallas y cuellos de botella, hacer mantenimiento preventivo (limpieza, pasta térmica, fuentes) y optimizar el rendimiento. También aprenderás a instalar sistemas operativos, usar virtualización y armar tu propia computadora paso a paso.",
      to: "https://www.youtube.com/playlist?list=PLbcS-eIZbbxVvT7xWNXFVYcw5VLsRYL_f",
      icon: <LuWrench size={20} />,
      thumb: "/images/it.jpg",
      alt: "Curso de Soporte IT",
    },
    {
      key: "redes",
      titulo: "Redes 🌐",
      desc:
        "En este curso arrancamos con los fundamentos de Internet, cableado estructurado, direcciones MAC e IP, subredes y VLANs. Practicamos con Packet Tracer y virtualización para configurar routing, y seguridad básica. Además, vemos servicios de red como DNS, FTP, VPN o samba, y cerramos creando routers en Linux y pfSense.",
      to: "https://www.youtube.com/playlist?list=PLbcS-eIZbbxWSCANJXiXj_5zBriR81m54",
      icon: <LuNetwork size={20} />,
      thumb: "/images/redes.jpg",
      alt: "Curso de Redes",
    },
    {
      key: "linux",
      titulo: "Linux 🐧",
      desc:
        "Aprendé a usar la terminal y los comandos básicos, crear scripts en bash y manejar usuarios y permisos. Vemos redes y seguridad (SSH, firewall, VPN, Squid), y cómo administrar servicios como FTP, MySQL, DNS o Apache. También practicamos con logs, Docker y virtualización, para que tengas soltura en Linux real.",
      to: "https://www.youtube.com/playlist?list=PLbcS-eIZbbxUqcd3Kr74fo46HzfnYpMqc",
      icon: <LuTerminal size={20} />,
      thumb: "/images/linux.jpg",
      alt: "Curso de Linux",
    },
  ];

  return (
    <section className="bg-black text-white py-10 sm:py-12" id="cursos">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="flex flex-col items-start sm:items-center text-left sm:text-center">
          <h2 className="text-xl sm:text-3xl font-bold">Cursos gratuitos 🥳</h2>
          <p className="mt-2 text-white/80 max-w-2xl text-sm sm:text-base">
            Aprendé desde cero los{" "}
            <span className="font-semibold">fundamentos de la informática</span>,{" "}
            <span className="font-semibold">soporte IT, reparación de PC y Linux</span> y la{" "}
            <span className="font-semibold">configuración de redes profesionales</span>. Para{" "}
            <span className="font-semibold">todos los niveles</span>.
          </p>
        </div>

        {/* Grid responsiva */}
        <div className="mt-6 sm:mt-8 grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {cursos.map((c, i) => (
            <motion.article
              key={c.key}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="group"
            >
              <Card
                className="h-full flex flex-col overflow-hidden border-white/10
                           bg-white/[0.04] hover:bg-white/[0.06] transition"
              >
                {/* Media: evita alturas fijas en mobile */}
                {c.thumb && (
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={c.thumb}
                      alt={c.alt}
                      className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}

                <CardContent className="p-4 sm:p-6 flex flex-col flex-1">
                  {/* Título */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="rounded-md sm:rounded-lg bg-white/60 p-1.5 sm:p-2" aria-hidden>
                      {c.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">{c.titulo}</h3>
                  </div>

                  {/* Descripción con clamp en mobile */}
                  <p className="mt-2 sm:mt-3 text-white/90 text-sm sm:text-[15px] flex-1 line-clamp-4 sm:line-clamp-6">
                    {c.desc}
                  </p>

                  {/* CTA: full-width en mobile */}
                  <div className="mt-4 sm:mt-auto pt-2 sm:pt-5">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full sm:w-auto border-white/30 text-black hover:bg-white/70"
                    >
                      <Link to={c.to} target="_blank" rel="noopener noreferrer">
                        Visitar curso
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </div>

        {/* CTA global */}
        <div className="mt-8 sm:mt-10 text-center">
          <Button className="w-full sm:w-auto bg-white text-black font-semibold hover:bg-white/70" asChild>
            <Link to="https://tinyurl.com/profesantiago" target="_blank" rel="noopener noreferrer">
              Ver todos los cursos
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CursosSection;
