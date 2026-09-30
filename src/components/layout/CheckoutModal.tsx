import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ShieldCheck, Lock, CreditCard, ArrowRight, Truck } from 'lucide-react';
import { Product } from '../../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  onOrderSuccess: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderId(`KOVR-${Math.floor(100000 + Math.random() * 900000)}`);
      setStep('success');
      onOrderSuccess();
    }, 1200);
  };

  const handleClose = () => {
    setStep('form');
    setFullName('');
    setEmail('');
    setAddress('');
    setCity('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[#0A0A14]/90 backdrop-blur-2xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#111827] border border-white/10 rounded-[32px] shadow-[0_40px_100px_rgba(0,0,0,0.9)] z-10 no-scrollbar"
          >
            {/* Ambient subtle glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF3A2D]/10 blur-[80px] pointer-events-none" />

            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF3A2D]/10 border border-[#FF3A2D]/20 flex items-center justify-center text-[#FF3A2D]">
                  <Lock size={18} />
                </div>
                <div>
                  <span className="font-syncopate text-[8px] text-[#FF3A2D] font-bold tracking-[3px] block uppercase">
                    CHECKOUT SEGURO SSL 256-BIT
                  </span>
                  <h3 className="font-bebas text-2xl text-white tracking-tight uppercase">
                    {step === 'form' ? 'FINALIZAR ORDEN' : 'CONFIRMACIÓN DE COMPRA'}
                  </h3>
                </div>
              </div>
              <button
                onClick={handleClose}
                aria-label="Cerrar modal de pago"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8">
              {step === 'form' ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Resumen Compacto */}
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-syncopate text-white/40 tracking-widest block uppercase">
                        TOTAL A PAGAR ({cartItems.length} MODELOS)
                      </span>
                      <span className="font-barlow font-black text-3xl text-white">${total} USD</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#FF3A2D] text-xs font-syncopate font-bold tracking-wider">
                      <Truck size={16} /> ENVÍO GRATIS
                    </div>
                  </div>

                  {/* Inputs */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-syncopate tracking-[2px] text-white/50 mb-2 uppercase">
                        NOMBRE COMPLETO
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ej. Alexander Vance"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-outfit text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#FF3A2D] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-syncopate tracking-[2px] text-white/50 mb-2 uppercase">
                        CORREO ELECTRÓNICO (PARA CONFIRMACIÓN)
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu-email@ejemplo.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-outfit text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#FF3A2D] transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-syncopate tracking-[2px] text-white/50 mb-2 uppercase">
                          DIRECCIÓN DE ENTREGA
                        </label>
                        <input
                          type="text"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Calle y número"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-outfit text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#FF3A2D] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-syncopate tracking-[2px] text-white/50 mb-2 uppercase">
                          CIUDAD / PAÍS
                        </label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Madrid, España"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-outfit text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#FF3A2D] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Insignia de Seguridad */}
                  <div className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-xl border border-white/5 text-white/60 text-xs font-outfit">
                    <ShieldCheck size={18} className="text-[#FF3A2D] shrink-0" />
                    <span>Transacción protegida. Pasarela de pruebas con cifrado militar de extremo a extremo.</span>
                  </div>

                  {/* Botón de Pago */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-[#FF3A2D] text-white font-syncopate font-bold text-[10px] tracking-[4px] py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all duration-300 shadow-[0_15px_30px_rgba(255,58,45,0.3)] disabled:opacity-50 cursor-pointer"
                  >
                    {isProcessing ? (
                      <span>PROCESANDO ORDEN...</span>
                    ) : (
                      <>
                        CONFIRMAR Y ORDENAR (${total}) <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="py-6 text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-[#FF3A2D]/10 border border-[#FF3A2D]/30 flex items-center justify-center text-[#FF3A2D] mx-auto animate-pulse">
                    <CheckCircle2 size={40} />
                  </div>
                  <div>
                    <span className="font-syncopate text-[9px] text-[#FF3A2D] tracking-[4px] font-bold block mb-2 uppercase">
                      ¡ORDEN CONFIRMADA CON ÉXITO!
                    </span>
                    <h3 className="font-bebas text-4xl text-white tracking-tight">GRACIAS POR TU COMPRA</h3>
                    <p className="font-outfit text-white/70 text-sm mt-3 max-w-sm mx-auto">
                      Hemos enviado el recibo y número de seguimiento a <strong className="text-white">{email}</strong>.
                    </p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5 inline-block text-left w-full max-w-sm">
                    <div className="flex justify-between items-center text-xs font-mono text-white/80">
                      <span>CÓDIGO DE ORDEN:</span>
                      <span className="text-[#FF3A2D] font-bold">{orderId}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono text-white/60 mt-1">
                      <span>MÉTODO DE ENVÍO:</span>
                      <span>KOVR EXPRESS PRIORITY</span>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="w-full bg-white text-black font-syncopate font-bold text-[10px] tracking-[3px] py-4 rounded-xl hover:bg-[#FF3A2D] hover:text-white transition-all cursor-pointer"
                  >
                    CONTINUAR EXPLORANDO
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
