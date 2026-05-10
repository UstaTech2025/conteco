/** Tek kaynak: üst menü ve footer aynı öğeleri kullanır. */

export const SITE_NAV_PRIMARY_LABELS = [
  "Şarj İstasyonları",
  "İş Ortaklığı",
  "Ürünler",
  "Çözümler",
  "Kampanyalar",
] as const;

export const SITE_NAV_MORE_LABELS = [
  "Hakkımızda",
  "Sıkça Sorulan Sorular",
  "Fiyatlandırma",
  "İletişim",
] as const;

export const SITE_NAV_ITEMS = SITE_NAV_PRIMARY_LABELS.map((label) => ({ label }));

export const FOOTER_NAV_GROUPS = [
  { baslik: "Menü", linkler: [...SITE_NAV_PRIMARY_LABELS] },
  { baslik: "Daha Fazla", linkler: [...SITE_NAV_MORE_LABELS] },
] as const;
