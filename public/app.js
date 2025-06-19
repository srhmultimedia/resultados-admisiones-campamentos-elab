const frm  = document.getElementById('frm');
const docI = document.getElementById('doc');
const msg  = document.getElementById('msg');

// helper: muestra icono + texto con color
function show(type, text) {
  const iconMap = {
    admitido: 'check-circle-2',
    revision: 'alert-circle',
    not_found: 'search-x',
    error: 'x-octagon'
  };

  /* paletas accesibles (bg-50 + text-700) */
  const styleMap = {
    admitido:  ['bg-green-50',  'border-green-400',  'text-green-700'],
    revision:  ['bg-amber-50',  'border-amber-400',  'text-amber-700'],
    not_found: ['bg-red-50',    'border-red-400',    'text-red-700'],
    error:     ['bg-red-50',    'border-red-400',    'text-red-700'],
    loading:   ['bg-slate-50',  'border-slate-400',  'text-slate-700']
  };

  /* caso especial “Consultando…” */
  if (type === 'loading') text = 'Consultando…';

  const [bg, border, txt] = styleMap[type] || styleMap.error;

  msg.className = `animate__animated animate__fadeInDown w-full max-w-md rounded-xl border ${border} ${bg} px-4 py-3 flex items-center gap-3 shadow-md mt-6`;

  msg.innerHTML = `
    <i data-lucide="${iconMap[type] || 'loader-2'}" 
       class="w-12 h-12 sm:w-10 sm:h-10 ${txt} ${type === 'loading' ? 'animate-spin' : ''}"></i>
    <span class="font-medium ${txt}">${text}</span>
  `;
  lucide.createIcons();

  /* confeti sólo cuando es admitido */
  if (type === 'admitido') {
    confetti({ particleCount: 130, spread: 100, origin: { y: 0.6 } });
  }
}

frm.addEventListener('submit', async e => {
  e.preventDefault();
  show('revision', 'Consultando…');          // gris/naranja como estado “loading”

  try {
    const res  = await fetch('/api/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documento: docI.value.trim() })
    });
    const data = await res.json();

    if (data.status === 'admitido')     show('admitido', data.message);
    else if (data.status === 'revision') show('revision', data.message);
    else                                 show('not_found', 'Documento no encontrado');
  } catch {
    show('error', 'Error de red. Intenta más tarde.');
  }
});
