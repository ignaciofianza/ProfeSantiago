import { motion } from "motion/react";
import { useForm, ValidationError } from "@formspree/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { LuCoffee, LuSend } from "react-icons/lu";
import { SiYoutube, SiLinkedin, SiGmail, SiTiktok } from "react-icons/si";

export function ContactSection() {
  // hook de Formspree para manejar el form, id del formulario: "xvgqewew"
  const [state, handleSubmit] = useForm("xvgqewew");

  return (
    <section id="contacto" className="bg-black text-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-start">
        {/* ===================== COLUMNA IZQUIERDA ===================== */}
        {/* Info fija: cafecito, contacto por mail y redes */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="space-y-6"
        >
          <Card className="border-white/10 bg-white/[0.04]">
            <CardContent className="p-6">
              {/* Bloque del cafecito (título)*/}
              <h3 className="text-xl font-semibold flex items-center gap-2 text-white">
                <LuCoffee /> Invitame un cafecito
              </h3>

              {/* GIF CAFECITO CON LINK */}
              <div className="mt-4 aspect-[16/9] w-full rounded-lg border border-white/10 bg-white/[0.06] grid place-content-center text-white/60">
                <span>💡 Acá va tu GIF</span>
              </div>

              {/* Contacto directo con mailto */}
              <div className="mt-6 space-y-2">
                <p className="text-white text-sm">Contacto directo:</p>
                <a
                  href="mailto:contacto@profesantiago.com"
                  className="inline-flex items-center gap-2 text-white hover:underline"
                >
                  <SiGmail /> contacto@profesantiago.com
                </a>
              </div>

              {/* Bloque de redes sociales, botones outline */}
              <div className="mt-6">
                <p className="text-white mb-2">Redes</p>
                <div className="flex flex-wrap gap-3">
                  {/* LinkedIn */}
                  <Button
                    asChild
                    variant="outline"
                    className="border-white/30 text-black hover:bg-white/10"
                  >
                    <a
                      href="https://www.linkedin.com/in/santiago-german-martinez-genta-642904205"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="inline-flex items-center gap-2">
                        <SiLinkedin /> LinkedIn
                      </span>
                    </a>
                  </Button>

                  {/* TikTok */}
                  <Button
                    asChild
                    variant="outline"
                    className="border-white/30 text-black hover:bg-white/10"
                  >
                    <a
                      href="https://www.tiktok.com/@ProfeSantiago"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="inline-flex items-center gap-2">
                        <SiTiktok /> TikTok
                      </span>
                    </a>
                  </Button>

                  {/* YouTube */}
                  <Button
                    asChild
                    variant="outline"
                    className="border-white/30 text-black hover:bg-white/10"
                  >
                    <a
                      href="https://www.youtube.com/@ProfesorSantiago"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="inline-flex items-center gap-2">
                        <SiYoutube /> YouTube
                      </span>
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ===================== COLUMNA DERECHA ===================== */}
        {/* Formulario de contacto Formspree pq no pienso levantar backend jaja salu2*/}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          <Card className="border-white/10 bg-white/[0.04]">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white">Contacto</h3>
              <p className="text-white/80 mt-1 text-sm">
                Dejá tu mensaje y te respondo a la brevedad.
              </p>

              {/* si éxito, mensaje enviado */}
              {state.succeeded ? (
                <div className="mt-6 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
                  <p className="text-emerald-300 font-medium">
                    ¡Gracias! Tu mensaje fue enviado correctamente.
                  </p>
                  <p className="text-emerald-200/80 text-sm mt-1">
                    Te responderé al mail que dejaste, ¡que tengas un buen día!
                  </p>
                </div>
              ) : (
                // Formulario
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  {/* Nombre + Email en 2 columnas */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-white mb-2">
                        Nombre
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Tu nombre"
                        className="bg-white/5 border-white/15 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white mb-2">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="tu@mail.com"
                        className="bg-white/5 border-white/15 text-white"
                        required
                      />
                      {/* error de validación de Formspree */}
                      <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors}
                      />
                    </div>
                  </div>

                  {/* Asunto */}
                  <div>
                    <Label htmlFor="subject" className="text-white mb-2">
                      Asunto
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="¿Sobre qué querés hablar?"
                      className="bg-white/5 border-white/15 text-white"
                    />
                  </div>

                  {/* Mensaje */}
                  <div>
                    <Label htmlFor="message" className="text-white mb-2">
                      Mensaje
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Contame en detalle…"
                      className="min-h-[140px] bg-white/5 border-white/15 text-white"
                      required
                    />
                    <ValidationError
                      prefix="Message"
                      field="message"
                      errors={state.errors}
                    />
                  </div>

                  {/* honeypot para bots - campo invisible (si un bot de spam llena el campo,
                  formspree descarta todo el formulario automáticamente,
                  al no verse, el usuario no debería de poder ver el campo) */}
                  <input
                    type="text"
                    name="_gotcha"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Footer con leyenda re chamuyo jajakakakakaj flasheaba sponsor formspree, además, botón enviar.
                  lo del protegido por formspree lo dejo pq queda piola pero si se quiere, se puede sacar, no cambia funcionalidad ninguna */}
                  <div className="flex items-center justify-between gap-3 pt-2">
                    <p className="text-xs text-white/50">
                      Protegido por Formspree.
                    </p>
                    <Button
                      type="submit"
                      disabled={state.submitting}
                      className="bg-white text-black font-semibold hover:bg-white/90 inline-flex items-center gap-2"
                    >
                      <LuSend />
                      {state.submitting ? "Enviando…" : "Enviar"}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactSection;
