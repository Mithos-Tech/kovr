import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Zap, Cpu } from 'lucide-react';

const InnovationSection: React.FC = () => {
  const features = [
    {
      icon: <Cpu size={32} />,
      title: "NÚCLEO REACTIVO",
      desc: "Nuestra tecnología de entresuela patentada devuelve el 95% de la energía en cada zancada."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "ESCUDO URBANO",
      desc: "Materiales balísticos de grado militar que resisten la abrasión del asfalto y el concreto."
    },
    {
      icon: <Zap size={32} />,
      title: "TRACCIÓN INSTANTÁNEA",
      desc: "Patrón de suela inspirado en neumáticos de alto rendimiento para un agarre absoluto."
    }
  ];

  return (
    <section className="py-40 bg-[#0A0A14] relative overflow-hidden">
      {/* Background Tech Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-[#FF3A2D] font-outfit font-bold text-[11px] tracking-[6px] block mb-8 uppercase">
              — INNOVACIÓN KOVR
            </span>
            <h2 className="font-bebas text-7xl md:text-8xl leading-[0.85] mb-10 tracking-tighter text-white">
              INGENIERÍA <br />
              <span className="text-[#FF3A2D]">SIN LÍMITES.</span>
            </h2>
            <p className="font-outfit text-white/50 text-xl leading-relaxed mb-16 font-light max-w-lg">
              No diseñamos zapatos, construimos herramientas de movilidad. Cada componente de KOVR ha sido testeado en los entornos urbanos más exigentes del mundo.
            </p>

            <div className="space-y-12">
              {features.map((f, i) => (
                <motion.div 
                  key={i}
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="flex gap-8 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF3A2D] group-hover:bg-[#FF3A2D] group-hover:text-white transition-all duration-500">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-syncopate text-sm tracking-[3px] text-white mb-2">{f.title}</h4>
                    <p className="font-outfit text-white/30 text-sm leading-relaxed max-w-xs">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[40px] overflow-hidden border border-white/10 bg-[#0A0A14] shadow-[0_0_100px_rgba(255,58,45,0.1)]"
            >
              {/* Technical Grid Overlay */}
              <div className="absolute inset-0 z-10 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              
              <img 
                src="https://res.cloudinary.com/dk1tkgjpj/image/upload/v1775682828/innovacion_clqeru.webp" 
                alt="Tech Detail Analysis" 
                className="w-full h-full object-cover brightness-75 group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Scanning Line Animation */}
              <motion.div 
                animate={{ top: ['-10%', '110%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF3A2D] to-transparent z-20 opacity-50 shadow-[0_0_15px_#FF3A2D]"
              />

              {/* HUD Elements (Technical Data) */}
              <div className="absolute inset-0 z-30 p-8 pointer-events-none flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="font-mono text-[8px] text-[#FF3A2D] space-y-1">
                    <p>SCAN_MODE: ACTIVE</p>
                    <p>VER: 2.0.26</p>
                    <p>COORD: 40.7128° N</p>
                  </div>
                  <div className="w-12 h-12 border-t border-r border-white/20 rounded-tr-xl"></div>
                </div>
                
                <div className="flex justify-between items-end">
                  <div className="w-12 h-12 border-b border-l border-white/20 rounded-bl-xl"></div>
                  <div className="font-mono text-[8px] text-white/40 text-right">
                    <p>MATERIAL_DENSITY: 98.4%</p>
                    <p>STRESS_TEST: PASSED</p>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F16] via-transparent to-transparent opacity-60"></div>
            </motion.div>
            
            {/* Floating Tech Badge - Refined */}
            <motion.div 
              initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
              whileInView={{ rotate: 12, scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
              className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#FF3A2D] rounded-full flex flex-col items-center justify-center text-center p-6 shadow-[0_20px_50px_rgba(255,58,45,0.4)] z-40"
            >
              <div className="absolute inset-2 border border-white/20 rounded-full border-dashed animate-spin-slow"></div>
              <span className="font-syncopate text-[10px] font-bold tracking-[2px] text-white mb-2 relative z-10">CERTIFICADO</span>
              <span className="font-bebas text-4xl text-white leading-none relative z-10">URBAN <br /> ELITE</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnovationSection;
