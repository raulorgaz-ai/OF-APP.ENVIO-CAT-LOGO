import React, { useState, useEffect } from 'react';
import { Info, ClipboardCheck, Edit3 } from 'lucide-react';
import { ClientData, SellerType } from '../types';

const SELLER_CONFIG: Record<SellerType, { image: string; link: string; footer: string }> = {
  OF: {
    image: "https://assets.zyrosite.com/AE04NxxDXof684vj/acceso-clientes---catalogo-infema-r8CaKRCd6BfhZdMn.gif",
    link: "https://catalogo.infema.cl/clientes",
    footer: "Saludos,\nLorena Barros"
  },
  MB: {
    image: "https://assets.zyrosite.com/AE04NxxDXof684vj/catalogo-rv-clientes-infema-16upimTIABgknqKM.gif",
    link: "https://catalogo.infema.cl/mb",
    footer: "Saludos,\nLorena Barros"
  },
  FU: {
    image: "https://assets.zyrosite.com/AE04NxxDXof684vj/catalogo-rv-clientes-infema-16upimTIABgknqKM.gif",
    link: "https://catalogo.infema.cl/fu",
    footer: "Saludos,\nLorena Barros"
  },
  HC: {
    image: "https://assets.zyrosite.com/AE04NxxDXof684vj/catalogo-rv-clientes-infema-16upimTIABgknqKM.gif",
    link: "https://catalogo.infema.cl/hc",
    footer: "Saludos,\nLorena Barros"
  },
  MP: {
    image: "https://assets.zyrosite.com/AE04NxxDXof684vj/catalogo-rv-clientes-infema-16upimTIABgknqKM.gif",
    link: "https://catalogo.infema.cl/mp",
    footer: "Saludos,\nLorena Barros"
  },
  "": {
    image: "",
    link: "",
    footer: ""
  }
};

const getDynamicSignature = (cid: string) => {
  return `<div dir="ltr"><table style="direction:ltr;border-collapse:collapse;"><tr><td style="font-size:0;height:12px;line-height:0;"></td></tr><tr><td><table cellpadding="0" cellspacing="0" border="0" style="width:100%;" width="100%"><tr><td><table cellpadding="0" cellspacing="0" style="border-collapse:collapse;line-height:1.15;"><tr><td style="height:1px;width:87px;vertical-align:top;padding:.01px 1px;"><table cellpadding="0" cellspacing="0" style="border-collapse:collapse;"><tr><td style="vertical-align:top;padding:.01px 1px 14px 0.01px;width:63px;text-align:center;"><img border="0" src="https://d36urhup7zbd7q.cloudfront.net/u/pwNXyOJwoyN/7f6bd622-9079-4f27-9de1-f636b804c262__400x400__.png" height="63" width="63" alt="photo" style="width:63px;vertical-align:middle;border-radius:0;height:63px;border:0;display:block;"></td></tr><tr><td style="vertical-align:top;padding:.01px;width:87px;text-align:center;"><a href="https://catalogo.infema.cl/qr?cid=${cid}" style="display:block;font-size:.1px" target="_blank" rel="nofollow noreferrer"><img border="0" src="https://d36urhup7zbd7q.cloudfront.net/u/pwNXyOJwoyN/9c3263ad-54cc-4252-b84a-70bd87976a9f__400x598__.png" height="130" width="87" alt="photo" style="width:87px;vertical-align:middle;border-radius:0;height:130px;border:0;display:block;"></a></td></tr></table></td><td valign="top" style="padding:.01px 0.01px 0.01px 14px;vertical-align:top;"><table cellpadding="0" cellspacing="0" style="border-collapse:collapse;"><tr><td style="line-height:1.2;padding:.01px 0.01px 14px 0.01px;border-bottom:solid 1px #731A15;" nowrap><p style="margin:.1px;line-height:120%;font-size:17px;"><span style="font-family:Arial;font-size:17px;font-weight:bold;color:#731A15;letter-spacing:0;white-space:nowrap;">INFEMA LTDA.</span><br><span style="font-family:Arial;font-size:14px;font-weight:bold;color:#061A37;white-space:nowrap;">Regalos-Deco-Hogar</span></p></td></tr><tr><td nowrap width="137" height="0" style="height:0;padding-top:14px;white-space:nowrap;width:137px;font-family:Arial;"><p style="margin:1px;line-height:99%;font-size:13px;"><span style="white-space:nowrap;"><img src="https://gifo.srv.wisestamp.com/s/rfem1/731A15/28/trans.png" style="line-height:120%;width:18px;" width="18" alt="icon">&nbsp;<a href="mailto:infema@infema.cl" target="_blank" style="font-family:Arial;text-decoration:unset;" rel="nofollow noreferrer"><span style="line-height:120%;font-family:Arial;font-size:13px;color-scheme:only;color:#212121;white-space:nowrap;">infema@infema.cl</span></a></span></p></td></tr><tr><td nowrap width="103" height="0" style="height:0;padding-top:9px;white-space:nowrap;width:103px;font-family:Arial;"><p style="margin:1px;line-height:99%;font-size:13px;"><span style="white-space:nowrap;"><img src="https://gifo.srv.wisestamp.com/s/rfm1/731A15/28/trans.png" style="line-height:120%;width:18px;" width="18" alt="icon">&nbsp;<a href="tel:989006937" target="_blank" style="font-family:Arial;text-decoration:unset;" rel="nofollow noreferrer"><span style="line-height:120%;font-family:Arial;font-size:13px;color-scheme:only;color:#212121;white-space:nowrap;">9 8900 6937</span></a></span></p></td></tr><tr><td nowrap width="87" height="0" style="height:0;padding-top:9px;white-space:nowrap;width:87px;font-family:Arial;"><p style="margin:1px;line-height:99%;font-size:13px;"><span style="white-space:nowrap;"><img src="https://gifo.srv.wisestamp.com/s/rfw1/731A15/28/trans.png" style="line-height:120%;width:18px;" width="18" alt="icon">&nbsp;<a href="https://infema.cl" target="_blank" style="font-family:Arial;text-decoration:unset;" rel="nofollow noreferrer"><span style="line-height:120%;font-family:Arial;font-size:13px;color-scheme:only;color:#212121;white-space:nowrap;">infema.cl</span></a></span></p></td></tr><tr><td height="0" style="height:0;padding:14px 0.01px 0.01px 0.01px;"><table border="0" cellpadding="0" cellspacing="0"><tr><td align="left" style="padding-right:18px;text-align:center;padding-top:0;"><p style="margin:1px;"><a href="https://wa.me/56989006937" target="_blank" rel="nofollow noreferrer"><img width="28" height="28" src="https://gifo.srv.wisestamp.com/s/wa/25d366/56/4/background.png" style="float:left;border:none;" border="0" alt="wa" /></a></p></td><td align="left" style="padding-right:18px;text-align:center;padding-top:0;"><p style="margin:1px;"><a href="https://facebook.com/infemachile" target="_blank" rel="nofollow noreferrer"><img width="28" height="28" src="https://gifo.srv.wisestamp.com/s/fb/3b5998/56/4/background.png" style="float:left;border:none;" border="0" alt="facebook" /></a></p></td></tr></table></td></tr></table></td></tr></table></td></tr><tr><td height="0" style="height:0;line-height:1%;padding-top:16px;font-size:1px;"></td></tr><tr><td><table cellpadding="0" cellspacing="0" style="border-collapse:collapse;line-height:normal;width:100%;" width="100%"><tr><td height="0" style="height:0;text-align:left;"><p style="margin:1px;"><a href="https://clientes.infema.cl/catalogo?cid=${cid}" target="_blank" rel="nofollow noreferrer"><img src="https://d36urhup7zbd7q.cloudfront.net/u/pwNXyOJwoyN/be21182e-0cc5-46a7-b6f2-24f8c73ade59__510x168__.gif" style="width:299px;height:98px;" width="299" height="98" alt="App Banner Image"></a></p></td></tr></table></td></tr><tr><td height="0" style="height:0;line-height:1%;padding-top:16px;font-size:1px;"></td></tr></table></td></tr><tr><td style="font-family:'ws-id qvlXd27aqddG';font-size:.01px;line-height:0;">&nbsp;</td></tr></table></div>`;
};

const getTextSignature = (cid: string) => {
  return `Saludos,
Lorena Barros
─────────────
📧 infema@infema.cl
📞 9 8900 6937
🌐 https://www.infema.cl

📇 Guardar Contacto:
https://catalogo.infema.cl/qr?cid=${cid}`;
};

interface MessagePreviewProps {
  client: ClientData | null;
}

export const MessagePreview: React.FC<MessagePreviewProps> = ({ client }) => {
  const [editableMessage, setEditableMessage] = useState('');
  const [justCopied, setJustCopied] = useState(false);

  const generateCID = (client: ClientData) => {
    const email = client.email?.trim() || '';
    const phone = client.phone?.trim() || '';

    // Si tiene email (con o sin whatsapp)
    if (email) {
      const parts = email.split('@');
      if (parts.length === 2) {
        const prefix = parts[0];
        const domain = parts[1];
        const firstFour = prefix.substring(0, 4);
        const lastThree = prefix.slice(-3);
        const domainFirstThree = domain.substring(0, 3);
        return `${firstFour}${lastThree}.${domainFirstThree}`.toLowerCase();
      }
    }

    // Si tiene solo whatsapp (o no tiene email)
    if (phone) {
      const cleanPhone = phone.replace(/\D/g, '');
      const lastSix = cleanPhone.slice(-6);
      if (lastSix.length === 6) {
        return lastSix.split('').map(digit => (parseInt(digit, 10) + 1) % 10).join('');
      }
    }

    return "user.inf";
  };

  useEffect(() => {
    if (client) {
      const config = SELLER_CONFIG[client.seller];
      const cid = generateCID(client);
      
      const genderPrefix = client.gender === 'hombre' ? 'D. ' : client.gender === 'mujer' ? 'Sra. ' : '';
      let salutation = client.name 
        ? `👋 Hola ${genderPrefix}${client.name},` 
        : (client.company ? `${client.company}.\nEstimado cliente,` : `Estimado cliente,`);

      const connector = config.link.includes('?') ? '&' : '?';
      const fullLink = `${config.link}${connector}cid=${cid}`;
      
      let mainText = client.deliveryFormat === 'pdf' 
        ? "ADJUNTO PDFs." 
        : "📖 Le comparto el enlace directo al catálogo en línea (aquí lo estaremos actualizando).\n\n📌 Para entrar la primera vez por favor use el nombre de Usuario y Contraseña que aparecen en la foto:";
      
      let bodyText = "";
      if (client.sendMethod === 'email') {
        if (client.deliveryFormat === 'pdf') {
          const sigPlaceholder = client.seller === 'OF' ? "\n\n[FIRMA_WIS_PDF]" : "";
          bodyText = `${salutation}\n\n${mainText}\n\n${config.footer}${sigPlaceholder}`;
        } else {
          bodyText = `${salutation}\n\n${mainText}\n\n[ELEMENTO_ENLACE]`;
        }
      } else {
        if (client.deliveryFormat === 'pdf') {
          const signaturePart = (client.seller === 'OF') ? `\n\n${getTextSignature(cid)}` : `\n${config.footer}`;
          bodyText = `${salutation}\n\n${mainText}${signaturePart}`;
        } else {
          bodyText = `${salutation}\n\n${mainText}\n─────────────\n🔗 ${fullLink}\n─────────────\n${config.footer}`;
        }
      }
      setEditableMessage(bodyText);
    }
  }, [client]);

  const handleCopyAndShare = async () => {
    if (!client || !editableMessage) return;
    const config = SELLER_CONFIG[client.seller];
    const cid = generateCID(client);
    const connector = config.link.includes('?') ? '&' : '?';
    const clientLink = `${config.link}${connector}cid=${cid}`;
    try {
      const currentText = editableMessage;
      const plainText = currentText.replace('[ELEMENTO_ENLACE]', '').replace('[FIRMA_WIS_PDF]', '');
      let bodyHtml = currentText.replace(/\n/g, '<br>');
      if (client.sendMethod === 'email') {
        const footerHtml = config.footer.replace(/\n/g, '<br>');
        const dynamicSignature = getDynamicSignature(cid);
        if (client.deliveryFormat === 'link') {
          const visualBlock = `<div style="margin: 25px 0;"><a href="${clientLink}" target="_blank" style="text-decoration: none; border: 0;"><img src="${config.image}" width="550" alt="Ver Catálogo" style="width: 550px; max-width: 100%; border: 0; display: block; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);"></a></div>`;
          const emailSection = `${visualBlock}<br>${footerHtml}`;
          bodyHtml = bodyHtml.replace('[ELEMENTO_ENLACE]', emailSection);
        } else {
          bodyHtml = bodyHtml.replace('[FIRMA_WIS_PDF]', client.seller === 'OF' ? dynamicSignature : "");
        }
      }
      const finalHtml = `<html><head><meta charset="UTF-8"></head><body><div style="font-family: 'Segoe UI', Arial, sans-serif; color: #2d3748; line-height: 1.6; font-size: 12pt;">${bodyHtml}</div></body></html>`;
      const data = [new ClipboardItem({
        'text/plain': new Blob([plainText], { type: 'text/plain' }),
        'text/html': new Blob([finalHtml], { type: 'text/html' })
      })];
      await navigator.clipboard.write(data);
      setJustCopied(true);
      setTimeout(() => setJustCopied(false), 2000);
      if (client.sendMethod === 'whatsapp' && client.phone) {
        window.open(`https://wa.me/${client.phone.replace('+', '')}`, '_blank');
      } else if (client.sendMethod === 'email') {
        const subjectLine = client.deliveryFormat === 'pdf' ? "Adjunto PDFs." : "Adjunto Catálogo Digital";
        window.location.href = `mailto:${client.email}?subject=${encodeURIComponent(subjectLine)}`;
      }
    } catch (err) { console.error('Error al copiar:', err); }
  };

  if (!client) {
    return (
      <div className="bg-white rounded-xl border border-dashed border-slate-300 h-64 flex flex-col items-center justify-center p-6 text-center text-slate-400">
        <Info className="w-8 h-8 mb-2 opacity-20" />
        <p className="text-sm">Selecciona un cliente para ver la previa</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full min-h-[500px]">
      <div className="bg-slate-50 border-b border-slate-200 p-3 flex items-center">
        <Edit3 className="w-4 h-4 text-amber-600 mr-2" />
        <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">Personalización del Mensaje</span>
      </div>

      <div className="flex-grow p-4 flex flex-col overflow-hidden bg-slate-50">
        <textarea
          value={editableMessage}
          onChange={(e) => setEditableMessage(e.target.value)}
          className={`w-full h-full p-4 rounded-lg text-slate-900 text-sm lg:text-base leading-relaxed resize-none focus:ring-2 focus:ring-amber-500 outline-none border transition-colors ${
            client.sendMethod === 'whatsapp' ? 'bg-[#e5ddd5] border-[#d1d7db]' : 'bg-white border-slate-200 shadow-inner'
          }`}
          placeholder="Escribe tu mensaje aquí..."
        />
      </div>

      <div className="p-3 bg-slate-50 border-t border-slate-200">
        <button
          onClick={handleCopyAndShare}
          className={`w-full flex items-center justify-center gap-2 py-3 text-white rounded-lg font-bold text-sm transition-all shadow-md active:scale-95 ${
            justCopied ? 'bg-green-600' : (client.sendMethod === 'whatsapp' ? 'bg-[#25D366]' : 'bg-indigo-600')
          }`}
        >
          <ClipboardCheck className="w-5 h-5" />
          {justCopied ? '¡Copiado!' : (client.sendMethod === 'email' ? 'Copiar y abrir Email' : 'Copiar y abrir WhatsApp')}
        </button>
      </div>
    </div>
  );
};