export interface WarehousePhoto {
  src: string;
  alt: string;
  caption: string;
  batchDate?: string;
}

/** Склад комплектации ~5000 м², Лобня. Улицу/дом не публикуем. */
export const WAREHOUSE_INFO = {
  city: "Лобня",
  areaSqm: 5000,
  role: "комплектация и отгрузка партий оптоволокна",
  note: "Адрес склада для самовывоза крупных партий сообщаем после подтверждения заказа.",
} as const;

/** Только файлы с нормальными правами и рабочей отдачей */
export const warehousePhotos: WarehousePhoto[] = [
  {
    src: "/images/warehouse/batch-spools-2026-07.jpg",
    alt: "Партия катушек G.657.A2 с красными фланцами на складе ELIZON, июль 2026",
    caption: "Партия G.657.A2, красные фланцы",
    batchDate: "2026-07",
  },
  {
    src: "/images/products/spool-stack-red-flange.jpg",
    alt: "Стопка катушек оптоволокна с красными фланцами — фото партии ELIZON",
    caption: "Катушки на комплектации",
    batchDate: "2026-07",
  },
  {
    src: "/images/warehouse/batch-existing-warehouse.jpg",
    alt: "Катушки оптоволокна на складе ELIZON — готовы к отгрузке",
    caption: "Готово к отгрузке",
    batchDate: "2026-06",
  },
  {
    src: "/images/warehouse/batch-packaging.jpg",
    alt: "Упаковка катушек оптоволокна для транспортировки по России, ELIZON",
    caption: "Упаковка под ТК",
    batchDate: "2026-06",
  },
  {
    src: "/images/products/spool-warehouse.jpg",
    alt: "Катушки оптоволокна G.657.A2 на складе ELIZON",
    caption: "Складской штабель",
    batchDate: "2026-06",
  },
];

export const accountingDocuments = [
  {
    title: "Счёт на оплату",
    text: "На юрлицо или ИП. Сумма, срок поставки, реквизиты — как согласовали в КП.",
  },
  {
    title: "ТОРГ-12 / УПД",
    text: "Отгрузочные документы на каждую поставку. Формат зависит от схемы учёта.",
  },
  {
    title: "Счёт-фактура",
    text: "Если работаем с НДС — по правилам вашей схемы. Уточняем при первом счёте.",
  },
  {
    title: "Паспорт / протокол на партию",
    text: "На катушки — паспорт качества. Рефлектограмма — по запросу к партии.",
  },
  {
    title: "Спецификация",
    text: "Параметры G.657.A2 / другого типа — в счёте и приложении. PDF пришлём в Telegram или на почту.",
  },
] as const;
