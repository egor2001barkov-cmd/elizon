import { catalogProducts, type Product } from "./products";

export interface ProductPhoto {
  src: string;
  alt: string;
  caption: string;
}

export const g657a2Photos: ProductPhoto[] = [
  {
    src: "/images/products/spool-warehouse.jpg",
    alt: "Катушки оптоволокна G.657.A2 242 мкм на складе ELIZON — готовы к отгрузке",
    caption: "Катушки на складе — готовы к отгрузке под заказ",
  },
  {
    src: "/images/products/spool-packaging.jpg",
    alt: "Упаковка катушек оптоволокна G.657.A2 для безопасной транспортировки по России",
    caption: "Надёжная упаковка для безопасной доставки",
  },
];

export const g657a2MainPhoto = g657a2Photos[0];

const CYLINDER_IMAGE_VARIANTS = [
  {
    src: "/images/products/cylinders/fo-cylinder-cad.jpg",
    caption: "Компактный корпус ABS, волокно G.657A2",
  },
  {
    src: "/images/products/cylinders/fo-cylinder-2km.jpg",
    caption: "Оптоволоконный модуль связи OAD с размоткой волокна",
  },
  {
    src: "/images/products/cylinders/fo-cylinder-2m.jpg",
    caption: "Цилиндр с оптическим разъёмом и волокном G.657A2",
  },
] as const;

function cylinderVariantIndex(productId: string): number {
  const match = productId.match(/fo-0-25-(\d+)$/);
  if (!match) return 0;
  return (parseInt(match[1], 10) - 1) % CYLINDER_IMAGE_VARIANTS.length;
}

function buildCylinderAlt(modelCode: string, km: number): string {
  return `Оптоволоконный цилиндр ${modelCode} ${km} км, волокно G.657A2, корпус ABS — фото ELIZON`;
}

function buildCylinderPhoto(productId: string, modelCode: string, km: number): ProductPhoto {
  const variant = CYLINDER_IMAGE_VARIANTS[cylinderVariantIndex(productId)];
  return {
    src: variant.src,
    alt: buildCylinderAlt(modelCode, km),
    caption: `${modelCode} · ${km} км — ${variant.caption}`,
  };
}

const STATIC_PRODUCT_PHOTOS: Record<string, ProductPhoto> = {
  "g657a2-242": {
    src: g657a2Photos[0].src,
    alt: "Волокно оптическое G.657.A2 242 мкм — катушка 50 км на складе ELIZON",
    caption: g657a2Photos[0].caption,
  },
  "g652d-242": {
    src: "/images/products/spool-warehouse.jpg",
    alt: "Катушка оптоволокна G.652.D 242 мкм, 50 км — магистральное одномодовое волокно ELIZON",
    caption: "G.652.D для магистральных и городских сетей",
  },
  "g657a1-242": {
    src: "/images/products/spool-packaging.jpg",
    alt: "Катушка оптоволокна G.657.A1 242 мкм, 50 км — гибкое волокно для абонентского доступа от ELIZON",
    caption: "G.657.A1 — улучшенная гибкость для сетей доступа",
  },
  "g655-242": {
    src: "/images/products/spool-warehouse.jpg",
    alt: "Катушка оптоволокна G.655 242 мкм, 50 км — для магистралей со спектральным уплотнением ELIZON",
    caption: "G.655 — низкая дисперсия для дальних трасс",
  },
  "patch-cable": {
    src: "/images/products/spool-packaging.jpg",
    alt: "Патч-корды LC/LC и другие коннекторы — оптические коммутационные шнуры ELIZON",
    caption: "Патч-корды под заказ с рефлектометрическим контролем",
  },
  "custom-length": {
    src: "/images/products/spool-warehouse.jpg",
    alt: "Оптоволокно нестандартной длины на катушке — индивидуальный заказ ELIZON",
    caption: "Любая длина и тип волокна под ваш проект",
  },
};

const productPhotoCache = new Map<string, ProductPhoto>();

function cacheCylinderPhotos(): void {
  for (const product of catalogProducts) {
    if (!product.id.startsWith("fo-0-25-")) continue;
    const km = product.kmPerSpool;
    const modelCode = product.modelCode ?? product.id.toUpperCase();
    productPhotoCache.set(
      product.id,
      buildCylinderPhoto(product.id, modelCode, km)
    );
  }
}

cacheCylinderPhotos();

export function getProductMainPhoto(productId: string): ProductPhoto | undefined {
  if (productId.startsWith("fo-0-25-")) {
    return productPhotoCache.get(productId);
  }
  return STATIC_PRODUCT_PHOTOS[productId];
}

export function getProductPhotos(product: Product | string): ProductPhoto[] {
  const productId = typeof product === "string" ? product : product.id;

  if (productId === "g657a2-242") {
    return g657a2Photos;
  }

  const main = getProductMainPhoto(productId);
  return main ? [main] : [];
}

export function getProductOgImage(product: Product): { url: string; alt: string } {
  const photo = getProductMainPhoto(product.id);
  if (photo) {
    return { url: photo.src, alt: photo.alt };
  }
  return {
    url: "/og-image.svg",
    alt: product.name,
  };
}