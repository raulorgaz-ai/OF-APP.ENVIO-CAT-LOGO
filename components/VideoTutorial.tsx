
import React, { useState, useEffect, useRef } from 'react';
import { Smartphone, Mail, Share2, AlertCircle, Download, Info, Play, Pause, RotateCcw, Check, Forward, MousePointer2 } from 'lucide-react';

export const VideoTutorial: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const totalSteps = 5;
  const stepDuration = 4000; // 4 segundos por paso

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setStep((s) => (s + 1) % totalSteps);
            return 0;
          }
          return prev + (100 / (stepDuration / 100));
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, step]);

  const restart = () => {
    setStep(0);
    setProgress(0);
    setIsPlaying(true);
  };

  const getSubtitles = () => {
    const subs = [
      "1. Primero, completa los datos del cliente y pulsa 'Generar y abrir WhatsApp'.",
      "2. En WhatsApp, verás el mensaje pegado. Pulsa enviar. Luego, MANTÉN PRESIONADO el mensaje.",
      "3. Aparecerán opciones arriba. Toca la FLECHA que apunta a la derecha (Reenviar).",
      "4. Ahora selecciona hasta 5 contactos o grupos a los que quieras mandárselo.",
      "5. ¡Listo! Has enviado el catálogo a varias personas en segundos. ¡A vender!"
    ];
    return subs[step];
  };

  return (
    <div className="mb-8 space-y-4">
      {/* Contenedor Principal Estilo Reproductor */}
      <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
        
        {/* Header del Tutorial */}
        <div className="bg-slate-800/50 px-6 py-3 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tutorial en Vivo: Reenvío WhatsApp</span>
          </div>
          <div className="flex items-center gap-4">
             <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-amber-400 transition-colors">
               {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
             </button>
             <button onClick={restart} className="text-white hover:text-amber-400 transition-colors">
               <RotateCcw className="w-4 h-4" />
             </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 h-[320px] lg:h-[380px]">
          {/* Area de Video (Animación) */}
          <div className="lg:col-span-3 relative flex items-center justify-center bg-black overflow-hidden group">
             {/* Simulación de Interfaz */}
             <div className="relative z-10 w-full max-w-[280px] h-[220px] flex flex-col justify-center px-4">
                
                {step === 0 && (
                  <div className="animate-in fade-in zoom-in duration-500 flex flex-col items-center">
                    <div className="bg-white p-3 rounded-xl shadow-2xl border-l-4 border-amber-500 mb-4 scale-110">
                      <p className="text-[10px] text-slate-800 font-bold">📖 Hola Sra. María, le comparto el catálogo...</p>
                    </div>
                    <div className="bg-green-500 p-2 rounded-lg flex items-center gap-2 shadow-lg">
                      <Share2 className="w-4 h-4 text-white" />
                      <span className="text-[10px] text-white font-black">GENERAR EN APP</span>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="animate-in slide-in-from-bottom-8 duration-500">
                    <div className="bg-[#dcf8c6] p-4 rounded-2xl shadow-xl relative border-2 border-blue-400">
                      <p className="text-[11px] text-slate-800">📖 Hola Sra. María, le comparto el catálogo...</p>
                      {/* Efecto de Presión */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                         <div className="w-12 h-12 bg-blue-500/30 rounded-full animate-ping"></div>
                         <MousePointer2 className="w-8 h-8 text-blue-600 fill-current drop-shadow-lg" />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="animate-in fade-in zoom-in duration-500 flex flex-col items-center">
                    <div className="bg-blue-600 p-6 rounded-full shadow-[0_0_40px_rgba(37,99,235,0.6)] animate-bounce">
                      <Forward className="w-12 h-12 text-white" />
                    </div>
                    <p className="mt-4 text-white text-xs font-black tracking-widest bg-blue-500/20 px-4 py-1 rounded-full border border-blue-500/30">TOCAR REENVIAR</p>
                  </div>
                )}

                {step === 3 && (
                  <div className="animate-in slide-in-from-right-12 duration-500 space-y-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-xl flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           <div className={`w-6 h-6 rounded-full ${i === 1 ? 'bg-green-500' : 'bg-slate-700'} flex items-center justify-center`}>
                             {i === 1 && <Check className="w-4 h-4 text-white" />}
                           </div>
                           <span className="text-[10px] text-white font-bold">Cliente Seleccionado {i}</span>
                         </div>
                      </div>
                    ))}
                  </div>
                )}

                {step === 4 && (
                  <div className="animate-in zoom-in fade-in duration-700 flex flex-col items-center">
                     <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.4)]">
                        <Check className="w-12 h-12 text-white" />
                     </div>
                     <p className="text-white font-black text-sm mt-4 tracking-tighter">¡ENVÍO EXITOSO!</p>
                  </div>
                )}
             </div>

             {/* Barra de Progreso del Paso */}
             <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-800">
                <div 
                  className="h-full bg-amber-500 transition-all duration-100 ease-linear" 
                  style={{ width: `${progress}%` }}
                ></div>
             </div>
          </div>

          {/* Area de Texto / Subtítulos */}
          <div className="lg:col-span-2 bg-slate-800/30 p-8 flex flex-col justify-center border-l border-slate-700">
             <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full border border-amber-500/20">
                   <span className="text-[10px] font-black uppercase">Paso {step + 1} de {totalSteps}</span>
                </div>
                <h3 className="text-white text-lg font-bold leading-tight">
                  {getSubtitles()}
                </h3>
                <div className="flex gap-2">
                   {[0,1,2,3,4].map(i => (
                     <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-amber-500' : 'w-2 bg-slate-700'}`}></div>
                   ))}
                </div>
             </div>
          </div>
        </div>

        {/* Footer del Video - Instalación */}
        <div className="bg-amber-500 px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
           <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-amber-900" />
              <p className="text-[11px] font-black text-amber-900 leading-none">PARA NO PERDER EL LINK:</p>
              <p className="text-[10px] text-amber-900 font-medium">Instala esta App: Menú → "Agregar a pantalla de inicio"</p>
           </div>
           <div className="bg-amber-900/10 px-3 py-1 rounded-lg border border-amber-900/10">
              <span className="text-[9px] font-black text-amber-900">VERSIÓN VENDEDORES V2.5</span>
           </div>
        </div>
      </div>

      {/* Tarjeta de Advertencia Rápida */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-start gap-4 shadow-sm">
           <div className="bg-indigo-100 p-2 rounded-xl">
              <Smartphone className="w-5 h-5 text-indigo-600" />
           </div>
           <div>
              <p className="text-xs font-bold text-slate-800 uppercase mb-1">Truco de Vendedor:</p>
              <p className="text-[11px] text-slate-500">"Si el cliente no te tiene guardado, el link puede tardar en cargar la foto. ¡Dile que te guarde!"</p>
           </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-start gap-4 shadow-sm">
           <div className="bg-green-100 p-2 rounded-xl">
              <Share2 className="w-5 h-5 text-green-600" />
           </div>
           <div>
              <p className="text-xs font-bold text-slate-800 uppercase mb-1">Ahorro de Tiempo:</p>
              <p className="text-[11px] text-slate-500">Puedes reenviar el catálogo hasta a 5 chats a la vez usando la flecha de arriba.</p>
           </div>
        </div>
      </div>
    </div>
  );
};
