// ai.js - client-side AI helper with server proxy + local fallback
(function(global){
  const isBrowser = typeof window !== 'undefined' && typeof window.fetch === 'function';

  function localFallback(prompt) {
    const p = (prompt||'').toLowerCase();
    if (!p) return "Maaf saya tidak menerima input. / I didn't get input.";
    if (p.includes('halo')||p.includes('hai')) return "Halo! Saya Kisah Sukses Final AI — bagaimana saya bisa bantu?";
    if (p.includes('motivasi')||p.includes('inspir')) return "Consistency beats intensity. Konsistensi mengalahkan intensitas.";
    if (p.includes('ringkas')||p.includes('summarize')) return "Ringkasan singkat: fokus pada langkah kecil dan konsisten setiap hari.";
    return "Sorry, offline fallback tidak bisa menjawab itu. Try again online.";
  }

  async function askAI(prompt, opts={}){
    // try server
    try {
      const res = await fetch('/api/ai', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({prompt, max_tokens: opts.max_tokens||300})
      });
      if (res.ok) {
        const j = await res.json();
        return j.text || JSON.stringify(j);
      }
    } catch(e){
      // ignore
    }
    return localFallback(prompt);
  }

  global.KSPai = { askAI };
})(window);
