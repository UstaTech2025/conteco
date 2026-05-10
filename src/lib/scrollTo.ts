const HEADER_HEIGHT = 80;

export function scrollToSection(id: string) {
  // hash'i URL'den kaldır — tarayıcının scroll kilidi koymasını önle
  window.history.replaceState(null, "", window.location.pathname);

  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}
