import React, { useState, useEffect, useRef } from 'react';
import { Link, FileText } from 'lucide-react';
import { ClientData, SellerType, SendMethod, GenderType, DeliveryFormat } from '../types';

interface ClientManagerProps {
  onClientSelect: (client: ClientData) => void;
  prefillData?: Partial<ClientData> | null;
}

export const ClientManager: React.FC<ClientManagerProps> = ({ 
  onClientSelect, 
  prefillData
}) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [gender, setGender] = useState<GenderType>('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [seller, setSeller] = useState<SellerType>('');
  const [sendMethod, setSendMethod] = useState<SendMethod>('');
  const [deliveryFormat, setDeliveryFormat] = useState<DeliveryFormat>('link');
  
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  
  const hasAutoSubmitted = useRef(false);

  useEffect(() => {
    if (prefillData) {
      setName(prefillData.name ?? '');
      setLastName(prefillData.lastName ?? '');
      setCompany(prefillData.company ?? '');
      setGender(prefillData.gender ?? '');
      setPhone(prefillData.phone ?? '');
      setEmail(prefillData.email ?? '');
      setSeller(prefillData.seller ?? '');
      setSendMethod(prefillData.sendMethod ?? '');
      setDeliveryFormat(prefillData.deliveryFormat ?? 'link');
      
      setPhoneError('');
      setEmailError('');

      if (prefillData.seller && prefillData.sendMethod && !hasAutoSubmitted.current) {
        const autoClient: ClientData = {
          id: Date.now().toString(),
          name: (prefillData.name || '').trim(),
          lastName: (prefillData.lastName || '').trim(),
          company: (prefillData.company || '').trim(),
          gender: (prefillData.gender as GenderType) || '',
          phone: (prefillData.phone || '').trim(),
          email: (prefillData.email || '').trim(),
          seller: prefillData.seller as SellerType,
          sendMethod: prefillData.sendMethod as SendMethod,
          deliveryFormat: (prefillData.deliveryFormat as DeliveryFormat) || 'link',
        };
        
        setTimeout(() => {
          onClientSelect(autoClient);
          hasAutoSubmitted.current = true;
        }, 300);
      }
    }
  }, [prefillData, onClientSelect]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError('');
    setEmailError('');

    if (!seller || !sendMethod) return alert('Selecciona Vendedor y MEDIO.');
    
    const hasPersonInfo = gender !== '' && name.trim() !== '';
    const hasCompanyInfo = company.trim() !== '';
    if (!hasPersonInfo && !hasCompanyInfo) {
      return alert('Debe completar GÉNERO y NOMBRE, o bien EMPRESA/NEGOCIO.');
    }
    
    let finalPhone = phone.trim();
    if (sendMethod === 'whatsapp') {
      if (!finalPhone) {
        setPhoneError('Debe ingresar un número de WhatsApp');
        alert('Debe ingresar un número de WhatsApp');
        return;
      }
      if (finalPhone && !finalPhone.startsWith('+')) finalPhone = `+${finalPhone}`;
      if (finalPhone && !/^\+569\d{8}$/.test(finalPhone)) {
        setPhoneError('Formato inválido (+569XXXXXXXX)');
        return;
      }
    }
    
    if (sendMethod === 'email') {
      const emailValue = email.trim();
      if (!emailValue) {
        setEmailError('Debe ingresar un email');
        alert('Debe ingresar un email');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        setEmailError('Email inválido');
        return;
      }
    }

    onClientSelect({
      id: Date.now().toString(),
      name: name.trim(),
      lastName: lastName.trim(),
      company: company.trim(),
      gender,
      phone: finalPhone,
      email: email.trim(),
      seller,
      sendMethod,
      deliveryFormat,
      lastSentMethod: sendMethod
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={() => setDeliveryFormat('link')} className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all font-bold text-xs ${deliveryFormat === 'link' ? 'border-amber-600 bg-amber-50 text-amber-700' : 'border-slate-100 bg-slate-50 text-slate-400'}`}><Link className="w-4 h-4" /> ENLACE</button>
            <button type="button" onClick={() => setDeliveryFormat('pdf')} className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all font-bold text-xs ${deliveryFormat === 'pdf' ? 'border-amber-600 bg-amber-50 text-amber-700' : 'border-slate-100 bg-slate-50 text-slate-400'}`}><FileText className="w-4 h-4" /> Archivos PDF</button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Vendedor</label>
              <select value={seller} onChange={(e) => setSeller(e.target.value as SellerType)} className="w-full h-10 px-4 border rounded-xl font-bold text-sm bg-slate-900 border-slate-800 text-white outline-none">
                <option value="">Seleccionar</option>
                <option value="OF">OFICINA</option>
                <option value="MB">MB</option>
                <option value="FU">FU</option>
                <option value="HC">HC</option>
                <option value="MP">MP</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Medio</label>
              <select value={sendMethod} onChange={(e) => setSendMethod(e.target.value as SendMethod)} className="w-full h-10 px-4 border rounded-xl font-bold text-sm bg-slate-900 border-slate-800 text-white outline-none">
                <option value="">Seleccionar</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="email">Email</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-3">
             <div className="col-span-1">
               <label className="block text-[10px] font-bold text-slate-500 uppercase">Género</label>
               <select value={gender} onChange={(e) => setGender(e.target.value as GenderType)} className="w-full h-10 px-2 border border-slate-300 rounded-xl text-xs font-bold uppercase">
                 <option value="">Seleccionar</option>
                 <option value="hombre">HOMBRE</option>
                 <option value="mujer">MUJER</option>
               </select>
             </div>
             <div className="col-span-1">
               <label className="block text-[10px] font-bold text-slate-500 uppercase">Nombre</label>
               <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-10 px-3 border border-slate-300 rounded-xl text-xs" />
             </div>
             <div className="col-span-1">
               <label className="block text-[10px] font-bold text-slate-500 uppercase">Apellido</label>
               <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full h-10 px-3 border border-slate-300 rounded-xl text-xs" />
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">{sendMethod === 'email' ? 'Email' : 'WhatsApp'}</label>
              <input 
                type={sendMethod === 'email' ? 'email' : 'tel'} 
                value={sendMethod === 'email' ? email : phone} 
                onChange={(e) => sendMethod === 'email' ? setEmail(e.target.value) : setPhone(e.target.value)} 
                className={`w-full h-10 px-4 border rounded-xl text-sm font-bold ${sendMethod === 'email' ? (emailError ? 'border-red-400' : 'border-slate-300') : (phoneError ? 'border-red-400' : 'border-slate-300')}`}
                placeholder={sendMethod === 'email' ? 'correo@cliente.com' : '+569XXXXXXXX'}
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Empresa / Negocio</label>
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full h-10 px-4 border border-slate-300 rounded-xl text-sm font-bold uppercase" />
            </div>
          </div>

          <button type="submit" className="w-full bg-slate-900 hover:bg-black text-white font-black py-4 rounded-xl shadow-lg transition-transform active:scale-95">GENERAR MENSAJE</button>
        </form>
      </div>
    </div>
  );
};
