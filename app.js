const BASE = '/resultados/resultados-admisiones-campamentos-elab';
frm.addEventListener('submit', async e => {
  e.preventDefault();
  show('loading', 'Consultando…');
  try {
    const res  = await fetch(`${BASE}/api/check.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documento: docI.value.trim() })
    });
    const data = await res.json();
    // … misma lógica show(admitido / revision / not_found)
  } catch {
    show('error', 'Error de red. Intenta más tarde.');
  }
});
