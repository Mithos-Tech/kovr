import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  FileText, 
  Cookie, 
  Truck, 
  HelpCircle, 
  Ruler, 
  ArrowLeft, 
  Mail, 
  CheckCircle2, 
  Lock, 
  Clock, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { LegalSection, Page } from '../types';

interface LegalProps {
  currentSection: LegalSection;
  onSelectSection: (section: LegalSection) => void;
  setActivePage: (page: Page) => void;
  onNavigate?: (page: Page, sectionId?: string) => void;
}

interface NavItem {
  id: LegalSection;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { 
    id: 'privacidad', 
    title: 'POLÍTICA DE PRIVACIDAD', 
    subtitle: 'Protección de datos & RGPD 2026', 
    icon: <ShieldCheck size={20} /> 
  },
  { 
    id: 'terminos', 
    title: 'TÉRMINOS Y CONDICIONES', 
    subtitle: 'Acuerdo de compra & derechos', 
    icon: <FileText size={20} /> 
  },
  { 
    id: 'cookies', 
    title: 'POLÍTICA DE COOKIES', 
    subtitle: 'Uso de cookies y almacenamiento', 
    icon: <Cookie size={20} /> 
  },
  { 
    id: 'envios', 
    title: 'ENVÍOS Y DEVOLUCIONES', 
    subtitle: 'Garantía 30 días & entrega global', 
    icon: <Truck size={20} /> 
  },
  { 
    id: 'soporte', 
    title: 'SOPORTE Y CONTACTO', 
    subtitle: 'Concierge urbano & asistencia 24/7', 
    icon: <HelpCircle size={20} /> 
  },
  { 
    id: 'tallas', 
    title: 'GUÍA DE TALLAS', 
    subtitle: 'Equivalencias EU, US, UK y CM', 
    icon: <Ruler size={20} /> 
  }
];

const Legal: React.FC<LegalProps> = ({ currentSection, onSelectSection, setActivePage, onNavigate }) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } else {
      const contentEl = document.getElementById('legal-content');
      if (contentEl && window.innerWidth < 1024) {
        contentEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    }
  }, [currentSection]);

  const activeItem = NAV_ITEMS.find(item => item.id === currentSection) || NAV_ITEMS[0];

  return (
    <motion.main
      key="legal-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[#0A0A14] min-h-screen text-white pt-28 md:pt-36 pb-32 relative overflow-hidden"
    >
      {/* Background Subtle Tech Grid (Deep behind content) */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div 
          className="w-full h-full" 
          style={{ 
            backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', 
            backgroundSize: '60px 60px' 
          }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        
        {/* Breadcrumb & Navigation Back */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-syncopate tracking-widest text-white/50">
            <button 
              onClick={() => onNavigate ? onNavigate('home') : setActivePage('home')}
              className="hover:text-[#FF3A2D] transition-colors cursor-pointer"
            >
              INICIO
            </button>
            <ChevronRight size={14} className="text-white/20" />
            <span className="text-white/70">LEGAL</span>
            <ChevronRight size={14} className="text-white/20" />
            <span className="text-[#FF3A2D] font-bold">{activeItem.title}</span>
          </div>

          <button
            onClick={() => onNavigate ? onNavigate('collection') : setActivePage('collection')}
            className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 hover:bg-[#FF3A2D] hover:text-white border border-white/10 font-syncopate text-[9px] font-bold tracking-[2px] transition-all cursor-pointer group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            VOLVER AL CATÁLOGO
          </button>
        </div>

        {/* Page Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#FF3A2D]"></span>
            <span className="text-[#FF3A2D] font-syncopate font-bold text-[10px] tracking-[4px] uppercase">
              DOCUMENTACIÓN Y ESTÁNDARES 2026
            </span>
          </div>
          <h1 className="font-bebas text-5xl sm:text-6xl md:text-8xl tracking-tight leading-none uppercase">
            CENTRO LEGAL <span className="text-[#FF3A2D]">&</span> ASISTENCIA
          </h1>
          <p className="font-outfit text-white/70 text-base md:text-lg max-w-2xl mt-4 leading-relaxed font-light">
            Transparencia total, protección rigurosa de tu privacidad y garantía certificada en cada adquisición de calzado urbano premium.
          </p>
        </div>

        {/* Mobile & Tablet Horizontal Tab Selector */}
        <div className="lg:hidden mb-10 overflow-x-auto no-scrollbar -mx-6 px-6 flex gap-3 pb-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl font-syncopate text-[9px] font-bold tracking-[2px] whitespace-nowrap transition-all cursor-pointer border ${
                currentSection === item.id
                  ? 'bg-[#FF3A2D] text-white border-[#FF3A2D] shadow-[0_0_20px_rgba(255,58,45,0.4)]'
                  : 'bg-[#111827] text-white/70 border-white/10 hover:border-white/30'
              }`}
            >
              {item.icon}
              <span>{item.title}</span>
            </button>
          ))}
        </div>

        {/* Desktop Layout: Sticky Sidebar + High-Contrast Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Sidebar (Desktop Only) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-36 space-y-3">
            <span className="font-syncopate text-[9px] tracking-[3px] text-white/40 block mb-4 uppercase">
              DOCUMENTOS DISPONIBLES
            </span>
            {NAV_ITEMS.map((item) => {
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectSection(item.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer ${
                    isActive
                      ? 'bg-[#111827] border-[#FF3A2D] shadow-[0_10px_30px_rgba(255,58,45,0.15)] text-white'
                      : 'bg-white/[0.02] border-white/5 text-white/60 hover:text-white hover:bg-white/5 hover:border-white/15'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isActive ? 'bg-[#FF3A2D] text-white' : 'bg-white/5 text-white/50'
                  }`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-syncopate text-[10px] tracking-[2px] font-bold truncate ${
                      isActive ? 'text-white' : 'text-white/80'
                    }`}>
                      {item.title}
                    </h3>
                    <p className="font-outfit text-xs text-white/40 mt-1 truncate">
                      {item.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}

            {/* Inspyrio Studio Credits Card in Sidebar */}
            <div className="mt-8 p-6 rounded-2xl bg-[#111827]/80 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-[#FF3A2D]">
                <Sparkles size={16} />
                <span className="font-syncopate text-[9px] tracking-[2px] font-bold">CRÉDITOS OFICIALES</span>
              </div>
              <p className="font-outfit text-xs text-white/70 leading-relaxed">
                Diseñado y estructurado por <strong className="text-white">Inspyrio Studio</strong> para <strong className="text-white">KOVR Global</strong>. Todos los derechos reservados © 2026.
              </p>
            </div>
          </aside>

          {/* Right Main Content Panel (High contrast, crystal clear typography) */}
          <section id="legal-content" className="lg:col-span-8 bg-[#111827] border border-white/10 rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 md:p-16 shadow-[0_30px_80px_rgba(0,0,0,0.8)] min-h-[600px]">
            <AnimatePresence mode="wait">
              
              {/* 1. POLÍTICA DE PRIVACIDAD */}
              {currentSection === 'privacidad' && (
                <motion.div
                  key="sec-privacidad"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="border-b border-white/10 pb-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-syncopate text-[#FF3A2D] tracking-[3px] font-bold block mb-2 uppercase">
                        MARCO LEGAL INTERNACIONAL
                      </span>
                      <h2 className="font-bebas text-4xl sm:text-5xl text-white tracking-tight">
                        POLÍTICA DE PRIVACIDAD GLOBAL
                      </h2>
                    </div>
                    <span className="font-mono text-xs text-white/50 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                      VIGENCIA: ENERO 2026
                    </span>
                  </div>

                  <p className="font-outfit text-base text-gray-200 leading-relaxed">
                    En <strong className="text-white font-semibold">KOVR Global</strong> (diseñado por <strong className="text-white font-semibold">Inspyrio Estudio</strong>), nos comprometemos a garantizar la total transparencia y seguridad de tus datos personales, cumpliendo con los estándares internacionales más estrictos, incluyendo el Reglamento General de Protección de Datos (RGPD) de la Unión Europea y la Ley de Privacidad del Consumidor de California (CCPA 2026).
                  </p>

                  <div className="space-y-6">
                    <div className="bg-[#0A0A14] p-6 rounded-2xl border border-white/10 space-y-3">
                      <h3 className="font-syncopate text-xs text-white font-bold tracking-[2px] flex items-center gap-2">
                        <Lock className="text-[#FF3A2D]" size={16} /> 1. INFORMACIÓN QUE RECOPILAMOS
                      </h3>
                      <p className="font-outfit text-sm text-gray-300 leading-relaxed">
                        Solo recolectamos datos estrictamente indispensables para la operativa del servicio: correo electrónico para la remisión del número de tracking y confirmación de pedidos, y datos de envío geográfico. <strong className="text-white font-medium">Bajo ninguna circunstancia almacenamos números de tarjeta de crédito completos ni información financiera en nuestros servidores.</strong>
                      </p>
                    </div>

                    <div className="bg-[#0A0A14] p-6 rounded-2xl border border-white/10 space-y-3">
                      <h3 className="font-syncopate text-xs text-white font-bold tracking-[2px] flex items-center gap-2">
                        <ShieldCheck className="text-[#FF3A2D]" size={16} /> 2. DERECHOS ARCO & CANCELACIÓN
                      </h3>
                      <p className="font-outfit text-sm text-gray-300 leading-relaxed">
                        Como titular de tus datos, posees el derecho legal inalienable de Acceso, Rectificación, Cancelación y Oposición (ARCO). Puedes solicitar la eliminación definitiva o exportación de tu historial de cliente enviando un mensaje directo a <span className="text-[#FF3A2D] font-mono font-bold">privacy@kovr-street.com</span>. Las solicitudes son atendidas en un plazo menor a 48 horas laborales.
                      </p>
                    </div>

                    <div className="bg-[#0A0A14] p-6 rounded-2xl border border-white/10 space-y-3">
                      <h3 className="font-syncopate text-xs text-white font-bold tracking-[2px] flex items-center gap-2">
                        <CheckCircle2 className="text-[#FF3A2D]" size={16} /> 3. TRANSFERENCIA A TERCEROS
                      </h3>
                      <p className="font-outfit text-sm text-gray-300 leading-relaxed">
                        KOVR no comercializa, alquila ni comparte tus datos de contacto con empresas de publicidad de terceros. La información requerida para el envío físico se comparte exclusivamente con transportistas internacionales homologados (DHL Express, FedEx y UPS) bajo acuerdos de confidencialidad estricta.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 2. TÉRMINOS Y CONDICIONES */}
              {currentSection === 'terminos' && (
                <motion.div
                  key="sec-terminos"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="border-b border-white/10 pb-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-syncopate text-[#FF3A2D] tracking-[3px] font-bold block mb-2 uppercase">
                        CONDICIONES GENERALES DE CONTRATACIÓN
                      </span>
                      <h2 className="font-bebas text-4xl sm:text-5xl text-white tracking-tight">
                        TÉRMINOS Y CONDICIONES DE SERVICIO
                      </h2>
                    </div>
                    <span className="font-mono text-xs text-white/50 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                      EDICIÓN: 2026
                    </span>
                  </div>

                  <p className="font-outfit text-base text-gray-200 leading-relaxed">
                    Al acceder a la plataforma oficial de <strong className="text-white font-semibold">KOVR</strong> o adquirir cualquiera de nuestras siluetas técnicas, el usuario acepta de manera vinculante los siguientes términos comerciales y normativos.
                  </p>

                  <div className="space-y-6">
                    <div className="bg-[#0A0A14] p-6 rounded-2xl border border-white/10 space-y-3">
                      <h3 className="font-syncopate text-xs text-white font-bold tracking-[2px]">
                        1. PROPIEDAD INTELECTUAL Y DISEÑO
                      </h3>
                      <p className="font-outfit text-sm text-gray-300 leading-relaxed">
                        Todos los diseños de calzado, marcas, renders 3D, interfaces gráficas, tipografías y microinteracciones de este sitio son propiedad exclusiva de <strong className="text-white font-semibold">Inspyrio Estudio</strong> para <strong className="text-white font-semibold">KOVR Global</strong>. Queda terminantemente prohibida su copia, imitación o explotación no autorizada.
                      </p>
                    </div>

                    <div className="bg-[#0A0A14] p-6 rounded-2xl border border-white/10 space-y-3">
                      <h3 className="font-syncopate text-xs text-white font-bold tracking-[2px]">
                        2. PRECIOS Y DISPONIBILIDAD DE MODELOS
                      </h3>
                      <p className="font-outfit text-sm text-gray-300 leading-relaxed">
                        Los precios están expresados en dólares estadounidenses (USD) e incluyen los impuestos aplicables. Debido a la naturaleza de nuestras ediciones limitadas (drops), los modelos pueden agotarse sin previo aviso. La confirmación de orden queda sujeta a la validación de inventario en tiempo real.
                      </p>
                    </div>

                    <div className="bg-[#0A0A14] p-6 rounded-2xl border border-white/10 space-y-3">
                      <h3 className="font-syncopate text-xs text-white font-bold tracking-[2px]">
                        3. GARANTÍA DE CALZADO DE ALTO RENDIMIENTO
                      </h3>
                      <p className="font-outfit text-sm text-gray-300 leading-relaxed">
                        Cada par de zapatillas KOVR cuenta con una garantía de 12 meses contra defectos de manufactura, desprendimiento de suela técnica o fallas en el compuesto balístico de amortiguación bajo condiciones normales de uso urbano y deportivo.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 3. POLÍTICA DE COOKIES */}
              {currentSection === 'cookies' && (
                <motion.div
                  key="sec-cookies"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="border-b border-white/10 pb-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-syncopate text-[#FF3A2D] tracking-[3px] font-bold block mb-2 uppercase">
                        TRANSPARENCIA TECNOLÓGICA
                      </span>
                      <h2 className="font-bebas text-4xl sm:text-5xl text-white tracking-tight">
                        POLÍTICA DE COOKIES & ALMACENAMIENTO
                      </h2>
                    </div>
                    <span className="font-mono text-xs text-white/50 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                      ESTÁNDAR 2026
                    </span>
                  </div>

                  <p className="font-outfit text-base text-gray-200 leading-relaxed">
                    KOVR utiliza cookies de primera parte y almacenamiento local exclusivo en tu navegador para permitir una experiencia de navegación fluida, rápida y segura sin rastreo invasivo.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#0A0A14] p-6 rounded-2xl border border-white/10 space-y-3">
                      <div className="flex items-center gap-2 text-[#FF3A2D] font-syncopate text-xs font-bold">
                        <CheckCircle2 size={18} />
                        <span>COOKIES ESENCIALES (OBLIGATORIAS)</span>
                      </div>
                      <p className="font-outfit text-sm text-gray-300 leading-relaxed">
                        Permiten el correcto funcionamiento del carrito de compras, el selector interactivo de tallas y la persistencia de sesión entre vistas sin recarga de página.
                      </p>
                    </div>

                    <div className="bg-[#0A0A14] p-6 rounded-2xl border border-white/10 space-y-3">
                      <div className="flex items-center gap-2 text-[#FF3A2D] font-syncopate text-xs font-bold">
                        <CheckCircle2 size={18} />
                        <span>PREFERENCIAS DE USUARIO</span>
                      </div>
                      <p className="font-outfit text-sm text-gray-300 leading-relaxed">
                        Almacenan tu lista de modelos favoritos, el historial reciente de búsqueda y las configuraciones de visualización en tu dispositivo.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#0A0A14] p-6 rounded-2xl border border-white/10 space-y-3">
                    <h3 className="font-syncopate text-xs text-white font-bold tracking-[2px]">
                      ¿CÓMO ADMINISTRAR O DESACTIVAR COOKIES?
                    </h3>
                    <p className="font-outfit text-sm text-gray-300 leading-relaxed">
                      Puedes eliminar o bloquear las cookies en cualquier momento a través de la configuración de privacidad de tu navegador (Chrome, Safari, Firefox o Edge). Ten en cuenta que si desactivas el almacenamiento local, el carrito de compras y la lista de favoritos deberán configurarse nuevamente en cada visita.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* 4. ENVÍOS Y DEVOLUCIONES */}
              {currentSection === 'envios' && (
                <motion.div
                  key="sec-envios"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="border-b border-white/10 pb-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-syncopate text-[#FF3A2D] tracking-[3px] font-bold block mb-2 uppercase">
                        LOGÍSTICA INTERNACIONAL & GARANTÍA
                      </span>
                      <h2 className="font-bebas text-4xl sm:text-5xl text-white tracking-tight">
                        ENVÍOS Y DEVOLUCIONES GLOBALES
                      </h2>
                    </div>
                    <span className="font-mono text-xs text-white/50 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                      30 DÍAS DE PRUEBA
                    </span>
                  </div>

                  <p className="font-outfit text-base text-gray-200 leading-relaxed">
                    Diseñamos cada silueta con estándares de ingeniería de precisión y nos aseguramos de que el proceso de entrega y cambio de talla sea tan impecable como nuestro calzado.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#0A0A14] p-6 rounded-2xl border border-white/10 space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-[#FF3A2D]/10 text-[#FF3A2D] flex items-center justify-center">
                        <Truck size={24} />
                      </div>
                      <h3 className="font-syncopate text-xs text-white font-bold tracking-[2px]">
                        ENVÍO EXPRESS GRATUITO
                      </h3>
                      <p className="font-outfit text-sm text-gray-300 leading-relaxed">
                        Todos los pedidos cuentan con despacho prioritario gratuito a más de 50 países. Tiempo promedio de entrega: <strong className="text-white font-semibold">3 a 5 días hábiles</strong>. Se proporciona tracking satelital en tiempo real tan pronto como el paquete sale de nuestras instalaciones.
                      </p>
                    </div>

                    <div className="bg-[#0A0A14] p-6 rounded-2xl border border-white/10 space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-[#FF3A2D]/10 text-[#FF3A2D] flex items-center justify-center">
                        <Clock size={24} />
                      </div>
                      <h3 className="font-syncopate text-xs text-white font-bold tracking-[2px]">
                        30 DÍAS PARA CAMBIOS DE TALLA
                      </h3>
                      <p className="font-outfit text-sm text-gray-300 leading-relaxed">
                        Si al recibir tu modelo notas que la talla no es la adecuada o deseas probar otra silueta, dispones de <strong className="text-white font-semibold">30 días naturales</strong> para solicitar un cambio sin coste alguno. Enviamos a la paquetería a recolectarlo directamente en tu puerta.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#0A0A14] p-6 rounded-2xl border border-white/10 space-y-3">
                    <h3 className="font-syncopate text-xs text-white font-bold tracking-[2px]">
                      CONDICIONES DE DEVOLUCIÓN
                    </h3>
                    <p className="font-outfit text-sm text-gray-300 leading-relaxed">
                      El producto debe conservar su empaque técnico original, etiquetas de autenticidad intactas y no presentar signos de uso abrasivo en asfalto exterior. El reembolso se procesa de forma automática en un plazo de 3 a 5 días tras la recepción e inspección en bodega.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* 5. SOPORTE Y CONTACTO */}
              {currentSection === 'soporte' && (
                <motion.div
                  key="sec-soporte"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="border-b border-white/10 pb-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-syncopate text-[#FF3A2D] tracking-[3px] font-bold block mb-2 uppercase">
                        ATENCIÓN PERSONALIZADA CONCIERGE
                      </span>
                      <h2 className="font-bebas text-4xl sm:text-5xl text-white tracking-tight">
                        CENTRO DE CONTACTO Y ASISTENCIA
                      </h2>
                    </div>
                    <span className="font-mono text-xs text-white/50 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                      SOPORTE ACTIVO 24/7
                    </span>
                  </div>

                  <p className="font-outfit text-base text-gray-200 leading-relaxed">
                    Nuestro equipo técnico de especialistas en calzado y logística urbana está a tu disposición en cualquier momento para consultas sobre pedidos, recomendaciones de silueta y seguimiento posventa.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#0A0A14] p-6 rounded-2xl border border-white/10 space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-[#FF3A2D]/10 text-[#FF3A2D] flex items-center justify-center">
                        <Mail size={24} />
                      </div>
                      <div>
                        <span className="font-syncopate text-[9px] text-white/40 tracking-widest block uppercase mb-1">
                          CANAL OFICIAL POR EMAIL
                        </span>
                        <a 
                          href="mailto:soporte@kovr-street.com" 
                          className="font-mono text-base font-bold text-white hover:text-[#FF3A2D] transition-colors"
                        >
                          soporte@kovr-street.com
                        </a>
                      </div>
                      <p className="font-outfit text-xs text-gray-400">
                        Tiempo promedio de respuesta garantizado: menos de 2 horas.
                      </p>
                    </div>

                    <div className="bg-[#0A0A14] p-6 rounded-2xl border border-white/10 space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-[#FF3A2D]/10 text-[#FF3A2D] flex items-center justify-center">
                        <HelpCircle size={24} />
                      </div>
                      <div>
                        <span className="font-syncopate text-[9px] text-white/40 tracking-widest block uppercase mb-1">
                          RASTREO EN VIVO
                        </span>
                        <h4 className="font-syncopate text-xs text-white font-bold tracking-[1px]">
                          SEGUIMIENTO DE ENVÍO PRIORITARIO
                        </h4>
                      </div>
                      <p className="font-outfit text-xs text-gray-400">
                        Introduce tu código de orden (ej. KOVR-829104) al escribirnos para atención instantánea.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#0A0A14] p-8 rounded-2xl border border-white/10 space-y-4">
                    <h3 className="font-syncopate text-xs text-white font-bold tracking-[2px]">
                      PREGUNTAS FRECUENTES RÁPIDAS
                    </h3>
                    <div className="space-y-4 divide-y divide-white/5 font-outfit text-sm">
                      <div className="pt-3">
                        <strong className="text-white block mb-1">¿Cómo sé si mi pedido fue procesado?</strong>
                        <p className="text-gray-400 text-xs">Recibirás un email instantáneo con el código de confirmación y el desglose de tu compra.</p>
                      </div>
                      <div className="pt-3">
                        <strong className="text-white block mb-1">¿Los modelos son resistentes a la lluvia?</strong>
                        <p className="text-gray-400 text-xs">Nuestras siluetas cuentan con recubrimiento hidrofóbico balístico que repele salpicaduras y humedad urbana.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 6. GUÍA DE TALLAS */}
              {currentSection === 'tallas' && (
                <motion.div
                  key="sec-tallas"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="border-b border-white/10 pb-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-syncopate text-[#FF3A2D] tracking-[3px] font-bold block mb-2 uppercase">
                        SISTEMA DE CALCE DE ALTA PRECISIÓN
                      </span>
                      <h2 className="font-bebas text-4xl sm:text-5xl text-white tracking-tight">
                        GUÍA OFICIAL DE TALLAS Y MEDIDAS
                      </h2>
                    </div>
                    <span className="font-mono text-xs text-white/50 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                      CALCE REGULAR
                    </span>
                  </div>

                  <p className="font-outfit text-base text-gray-200 leading-relaxed">
                    Las zapatillas KOVR han sido diseñadas con un ajuste anatómico de alto soporte. Si estás entre dos tallas, aconsejamos optar por la talla superior para permitir la expansión natural del pie en movimiento continuo.
                  </p>

                  {/* Tabla de Tallas Profesional */}
                  <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0A0A14]">
                    <table className="w-full text-left font-outfit text-sm">
                      <thead className="bg-white/10 font-syncopate text-[9px] tracking-[2px] text-white">
                        <tr>
                          <th className="p-4 sm:p-5">TALLA EU</th>
                          <th className="p-4 sm:p-5">US MEN</th>
                          <th className="p-4 sm:p-5">US WOMEN</th>
                          <th className="p-4 sm:p-5">UK</th>
                          <th className="p-4 sm:p-5 text-[#FF3A2D]">LONGITUD (CM)</th>
                          <th className="p-4 sm:p-5">PULGADAS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-gray-300">
                        {[
                          { eu: 40, usM: '7.0', usW: '8.5', uk: '6.0', cm: '25.0 cm', in: '9.8"' },
                          { eu: 41, usM: '8.0', usW: '9.5', uk: '7.0', cm: '26.0 cm', in: '10.2"' },
                          { eu: 42, usM: '8.5', usW: '10.0', uk: '7.5', cm: '26.5 cm', in: '10.4"' },
                          { eu: 43, usM: '9.5', usW: '11.0', uk: '8.5', cm: '27.5 cm', in: '10.8"' },
                          { eu: 44, usM: '10.0', usW: '11.5', uk: '9.0', cm: '28.0 cm', in: '11.0"' },
                          { eu: 45, usM: '11.0', usW: '12.5', uk: '10.0', cm: '29.0 cm', in: '11.4"' }
                        ].map((row) => (
                          <tr key={row.eu} className="hover:bg-white/5 transition-colors">
                            <td className="p-4 sm:p-5 font-bold text-white font-mono text-base">{row.eu}</td>
                            <td className="p-4 sm:p-5">{row.usM}</td>
                            <td className="p-4 sm:p-5">{row.usW}</td>
                            <td className="p-4 sm:p-5">{row.uk}</td>
                            <td className="p-4 sm:p-5 font-mono font-bold text-[#FF3A2D] text-base">{row.cm}</td>
                            <td className="p-4 sm:p-5 text-white/50">{row.in}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Instrucciones para medir el pie */}
                  <div className="bg-[#0A0A14] p-6 rounded-2xl border border-white/10 space-y-4">
                    <h3 className="font-syncopate text-xs text-white font-bold tracking-[2px] flex items-center gap-2">
                      <Ruler className="text-[#FF3A2D]" size={16} /> ¿CÓMO MEDIR TU PIE DE FORMA EXACTA?
                    </h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300 font-outfit leading-relaxed">
                      <li>Coloca una hoja de papel en el suelo pegada a la pared.</li>
                      <li>Pisa sobre el papel con el talón tocando firmemente la pared.</li>
                      <li>Marca el punto más largo de tu pie (generalmente el dedo gordo) con un lápiz.</li>
                      <li>Mide la distancia en centímetros desde el borde de la hoja hasta tu marca y compárala con la tabla superior.</li>
                    </ol>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </section>
        </div>
      </div>
    </motion.main>
  );
};

export default Legal;
