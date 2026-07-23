import { flagshipProduct } from "./products";

export const productsCategory = {
  title: "Продукты",
  description:
    "Подробные страницы ключевых позиций — характеристики, 3D-визуализация, отзывы и оформление заказа.",
};

export const productPages = [
  {
    slug: flagshipProduct.slug,
    productId: flagshipProduct.id,
    title: flagshipProduct.shortName,
    subtitle: flagshipProduct.name,
    description: flagshipProduct.description,
  },
] as const;