function normalize(url) {
  return (url || "").trim().replace(/\/+$/, "");
}

async function getJson(url, outEl) {
  outEl.textContent = "Cargando...";
  try {
    const res = await fetch(url, { method: "GET" });
    const text = await res.text();
    // Intento parsear JSON si corresponde
    let parsed = text;
    try { parsed = JSON.parse(text); } catch {}
    outEl.textContent = `HTTP ${res.status}\n` + (typeof parsed === "string" ? parsed : JSON.stringify(parsed, null, 2));
  } catch (e) {
    outEl.textContent = "Error: " + (e?.message || e);
  }
}

document.getElementById("btnBackend").addEventListener("click", () => {
  const base = normalize(document.getElementById("backendUrl").value);
  const out = document.getElementById("outBackend");
  if (!base) return (out.textContent = "Pegá la URL del backend (ej: https://xxxx.onrender.com)");
  getJson(`${base}/api/hola`, out);
});

document.getElementById("btnService").addEventListener("click", () => {
  const base = normalize(document.getElementById("serviceUrl").value);
  const out = document.getElementById("outService");
  if (!base) return (out.textContent = "Pegá la URL del servicio X (ej: https://yyyy.onrender.com)");
  getJson(`${base}/api/frase`, out);
});