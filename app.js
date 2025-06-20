/*  app.js  —  Front-end para Campamentos E-lab
 *  - Tailwind CDN para estilos
 *  - lucide-react CDN para iconos (ya cargado en index.html)
 *  - Animate.css para transiciones
 *  - canvas-confetti para la celebración
 */

/* ---------- Selección de nodos ---------- */
const frm   = document.getElementById('frm');
const docIn = document.getElementById('doc');
const msg   = document.getElementById('msg');

/* ---------- Ajusta el prefijo según tu carpeta ---------- */
const BASE = '/resultados/resultados-admisiones-campamentos-elab';

/* ---------- Utilidades de presentación ---------- */
function show(type, text) {
  const iconMap = {
    admitido:   'check-circle-2',
    revision:   'alert-circle',
    not_found:  'search-x',
    error:      'x-octagon',
    loading:    'loader-2',
  };

  const styleMap = {
    admitido:   ['bg-green-50',  'border-green-400',  'text-green-700'],
    revision:   ['bg-amber-50',  'border-amber-400',  'text-amber-700'],
    not_found:  ['bg-red-50',    'border-red-400',    'text-red-700'],
    error:      ['bg-red-50',    'border-red-400',    'text-red-700'],
    loading:    ['bg-slate-50',  'border-slate-400',  'text-slate-700'],
  };

  const [bg, border, txt] = styleMap[type] || styleMap.error;

  msg.className = `
    animate__animated animate__fadeInDown
    w-full max-w-md rounded-xl border ${border} ${bg}
    px-4 py-3 flex items-center gap-3 shadow-md
  `.replace(/\s+/g, ' ').trim();

  const spin = type === 'loading' ? 'animate-spin' : '';
  msg.innerHTML = `
    <i data-lucide="${iconMap[type] || 'alert-circle'}"
       class="w-10 h-10 sm:w-8 sm:h-8 ${txt} ${spin}"></i>
    <span class="text-xl sm:text-lg font-semibold ${txt}">${text}</span>
  `;

  lucide.createIcons();

  if (type === 'admitido') {
    confetti({ particleCount: 120, spread: 100, origin: { y: 0.65 } });
  }
}

/* ---------- Manejador del formulario ---------- */
frm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const documento = docIn.value.trim();
  if (!/^\d{6,15}$/.test(documento)) {
    show('error', 'Documento inválido');
    return;
  }

  show('loading', 'Consultando…');

  try {
    const res = await fetch(`${BASE}/api/check.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documento }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    if (data.status === 'admitido')      show('admitido',  data.message);
    else if (data.status === 'revision') show('revision',  data.message);
    else if (data.status === 'not_found')show('not_found', 'Documento no encontrado.');
    else                                 show('error',     'Respuesta inesperada.');
  } catch (err) {
    console.error(err);
    show('error', 'Error de red. Inténtalo más tarde.');
  }
});
