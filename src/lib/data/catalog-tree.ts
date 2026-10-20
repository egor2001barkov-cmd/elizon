import type { BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import type { CatalogCategory as CatalogCategoryId } from "./catalog-categories";
import { catalogProducts, getProductById, type Product } from "./products";

import { PRODUCTS_BASE } from "@/lib/constants";
import { ROUTES } from "@/lib/seo/routes";

export const CATALOG_HUB_PATH = ROUTES.catalog;

export interface CatalogSubcategoryNode {
  slug: string;
  title: string;
  h1: string;
  metaTitle: string;
  description: string;
  keywords: string[];
  intro: string;
  productIds: string[];
  /** Уникальный контент раздела: абзацы и буллеты с инлайн-ссылками. */
  content?: CatalogContentSection[];
  /** Слаги статей блога для блока «Статьи по теме». */
  relatedArticles?: string[];
}

export interface CatalogContentSection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface CatalogCategoryNode {
  slug: string;
  id: CatalogCategoryId;
  title: string;
  h1: string;
  metaTitle: string;
  description: string;
  keywords: string[];
  intro: string;
  subcategories: CatalogSubcategoryNode[];
  content?: CatalogContentSection[];
  relatedArticles?: string[];
}

export const catalogHubSeo = {
  h1: "Каталог оптоволокна и телеком-оборудования",
  metaTitle: "Каталог оптоволокна — цены и заказ",
  description:
    "Каталог ELIZON: оптоволокно G.657.A2, G.652.D, оптоволоконные цилиндры FO-0.25, патч-корды, нестандартные длины. Прямые поставки, срок 14–21 день.",
  keywords: [
    "каталог оптоволокна",
    "купить оптоволокно",
    "G.657.A2",
    "цена оптоволокна",
    "оптом",
  ],
  intro:
    "Полный каталог оптического волокна и комплектующих. Все позиции — под заказ напрямую с завода, срок 14–21 рабочий день. Выберите раздел или воспользуйтесь калькулятором.",
};

export const catalogTree: CatalogCategoryNode[] = [
  {
    slug: "optovolokno",
    id: "fiber",
    title: "Оптоволокно",
    h1: "Оптоволокно купить — каталог ELIZON",
    metaTitle: "Оптоволокно купить оптом — G.657, G.652, G.655",
    description:
      "Купить оптоволокно G.657.A2, G.652.D, G.657.A1 и G.655. Катушки 50 км под заказ, прямые поставки с завода, срок 14–21 день. Цены от 120 000 ₽/50 км.",
    keywords: [
      "оптоволокно купить",
      "волокно оптическое",
      "G.657.A2",
      "G.652.D",
      "катушка 50 км",
    ],
    intro:
      "Одномодовое оптическое волокно стандартов МСЭ-Т для абонентского доступа, магистралей, городских сетей и спектрального уплотнения. Прямые поставки, документы на партию, фиксация цены от 10 катушек.",
    content: [
      {
        title: "Четыре типа волокна — один заказ",
        bullets: [
          "[G.657.A2](/optovolokno/g657/g657a2) — радиус изгиба 7,5 мм, от 150 000 ₽/50 км: плотная городская укладка, стояки, намотка",
          "[G.657.A1](/optovolokno/g657/g657a1) — радиус 10 мм, от 120 000 ₽/50 км: колодцы и распределительные шкафы",
          "[G.652.D](/optovolokno/g652/g652d) — от 120 000 ₽/50 км: магистральные и межузловые прямые участки",
          "[G.655](/optovolokno/g655/g655) — от 145 000 ₽/50 км: дальние линии со спектральным уплотнением",
        ],
      },
      {
        title: "Как проходит заказ",
        paragraphs: [
          "Заявка с типом волокна, числом катушек и городом → КП за 15 минут в рабочее время → счёт с фиксированным сроком 14–21 рабочий день → производство → комплектация в Лобне и отгрузка ТК или фурой. От 1 катушки, от 10 — фиксация цены на квартал.",
          "Смешанная партия из нескольких типов идёт одним счётом и одной поставкой: как разложить трассу по типам — в гайде [как выбрать оптоволокно](/blog/kak-vybrat-optovolokno), сравнение всех марок — в [сводной таблице типов волокна](/blog/svodnaya-tablica-tipov-volokna).",
        ],
      },
    ],
    relatedArticles: ["svodnaya-tablica-tipov-volokna", "kak-vybrat-optovolokno", "dokumenty-na-partiyu-volokna"],
    subcategories: [
      {
        slug: "g657",
        title: "Волокно G.657",
        h1: "Оптоволокно G.657 — волокно, нечувствительное к изгибу",
        metaTitle: "G.657 оптоволокно — G.657.A2 и G.657.A1 купить",
        description:
          "Оптоволокно G.657.A2 и G.657.A1 с улучшенной устойчивостью к изгибу. Радиус 7,5 мм и 10 мм. Для абонентского доступа, колодцев и плотной прокладки. G.657.A1 — от 120 000 ₽/50 км.",
        keywords: ["G.657", "G.657.A2", "G.657.A1", "нечувствительное к изгибу", "радиус изгиба"],
        intro:
          "Семейство G.657 — волокно с пониженной чувствительностью к изгибу. G.657.A2 (радиус 7,5 мм) — флагман для плотной прокладки. G.657.A1 (радиус 10 мм) — от 120 000 ₽ за 50 км, баланс цены и гибкости.",
        content: [
          {
            title: "Куда ставить A2, а куда A1",
            bullets: [
              "Стояки, гофра, распределительные коробки, микроканалы — [G.657.A2](/optovolokno/g657/g657a2): 7,5 мм прощают самую плотную укладку",
              "Колодцы, вводы в здания, шкафы с запасом места — [G.657.A1](/optovolokno/g657/g657a1): радиуса 10 мм достаточно, катушка на 30 000 ₽ дешевле",
              "Ровные межузловые участки — классика [G.652.D](/optovolokno/g652/g652d) из соседнего раздела",
              "Намотка на барабан (БПЛА, стенды) — только A2: при многократной смотке малый радиус не копит потерь",
            ],
          },
          {
            title: "Что важно знать о семействе",
            paragraphs: [
              "Оба подкласса полностью совместимы с G.652.D при сварке — сеть наращивается без переделки старых стыков. Затухание стандартное: до 0,35 дБ/км на 1310 нм и до 0,22 дБ/км на 1550 нм, водяного пика нет.",
              "Как устроена изгибостойкость и когда за неё не стоит платить — в статьях [изгибостойкое волокно](/blog/bend-insensitive-volokno) и [сравнение A1 и A2](/blog/g657a1-vs-g657a2). Цены по всем типам — на странице [цена оптоволокна](/cena-optovolokna).",
            ],
          },
        ],
        relatedArticles: ["bend-insensitive-volokno", "g657a1-vs-g657a2", "prokladka-v-usloviyah-goroda"],
        productIds: ["g657a2-242", "g657a1-242"],
      },
      {
        slug: "g652",
        title: "Волокно G.652",
        h1: "Оптоволокно G.652.D — стандартное одномодовое волокно",
        metaTitle: "G.652.D оптоволокно купить — катушка 50 км",
        description:
          "Купить G.652.D 242 мкм — классическое волокно для магистралей и спектрального уплотнения. Катушка 50 км от 120 000 ₽, поставка 14–21 день.",
        keywords: ["G.652.D", "стандартное волокно", "магистральное оптоволокно", "спектральное уплотнение"],
        intro:
          "G.652.D — наиболее распространённый стандарт одномодового волокна. Нулевая дисперсия около 1310 нм, низкое затухание на 1550 нм. Для магистралей и городских сетей.",
        content: [
          {
            title: "Почему магистрали строят на G.652.D",
            bullets: [
              "Затухание до 0,22 дБ/км на 1550 нм — плечи в десятки километров с минимальным числом промежуточных узлов",
              "Без водяного пика: ровный спектр от O до L, запас под будущие каналы — [подробнее о пике](/blog/vodyanoy-pik)",
              "Самая низкая цена километра в классе: от 120 000 ₽ за катушку 50 км (2 400 ₽/км)",
              "Штатная сварка с G.657.A1/A2 — комбинируйте с [изгибостойким разделом](/optovolokno/g657) в одном проекте",
            ],
          },
          {
            title: "Границы выбора",
            paragraphs: [
              "G.652.D создан для трасс с ровной геометрией: канализация, межузловые вставки, магистральные плечи. Если трасса уходит в плотную городскую укладку — берите G.657; если линия дальняя и с плотным спектральным уплотнением — смотрите [G.655](/optovolokno/g655).",
              "Разборы переходов: [G.657.A2 против G.652.D](/blog/g657a2-vs-g652d) — город против магистрали, [G.652.D против G.655](/blog/g652d-vs-g655) — когда нужна ненулевая дисперсия. Под расчёт стыков и бюджета — статья [бюджет оптической линии](/blog/byudzhet-opticheskoy-linii).",
            ],
          },
        ],
        relatedArticles: ["g657a2-vs-g652d", "g652d-vs-g655", "dispersiya-v-volokne"],
        productIds: ["g652d-242"],
      },
      {
        slug: "g655",
        title: "Волокно G.655",
        h1: "Оптоволокно G.655 — для дальних магистралей со спектральным уплотнением",
        metaTitle: "G.655 оптоволокно купить — магистраль со спектральным уплотнением",
        description:
          "G.655 242 мкм для длинных магистралей и систем спектрального уплотнения. Ненулевая смещённая дисперсия. Катушка 50 км от 145 000 ₽, под заказ 14–21 день.",
        keywords: ["G.655", "магистраль со спектральным уплотнением", "нулевая дисперсия", "дальняя магистраль"],
        intro:
          "G.655 оптимизировано для дальних магистральных линий со спектральным уплотнением. Снижает потребность в компенсаторах дисперсии на трассе.",
        content: [
          {
            title: "Что даёт ненулевая смещённая дисперсия",
            bullets: [
              "Каналы DWDM в C-диапазоне идут по трассе без компенсаторов дисперсии каждые 80–100 км",
              "Смежные спектральные каналы не «слипаются» — плотная сетка длин волн работает стабильно",
              "Сварка с G.652.D и G.657 штатная — стыки на границах сетей не требуют согласующих элементов",
              "От 145 000 ₽ за катушку 50 км, срок под заказ 14–21 рабочий день",
            ],
          },
          {
            title: "Когда G.655 нужен, а когда — лишний",
            paragraphs: [
              "Городские и региональные линии до ~100 км с умеренным числом каналов полностью закрываются [G.652.D](/optovolokno/g652) — переплата за G.655 там не отрабатывается. Ориентир простой: десятки каналов и межрегиональное плечо — этот раздел; город и доступ — соседние.",
              "Физику дисперсии и границы выбора разбираем в статьях [хроматическая дисперсия](/blog/dispersiya-v-volokne) и [спектральные диапазоны O, C, L](/blog/diapazony-o-c-l); прямое сравнение марок — [G.652.D против G.655](/blog/g652d-vs-g655).",
            ],
          },
        ],
        relatedArticles: ["g652d-vs-g655", "dispersiya-v-volokne", "diapazony-o-c-l"],
        productIds: ["g655-242"],
      },
    ],
  },
  {
    slug: "komplektuyushchie",
    id: "accessories",
    title: "Комплектующие",
    h1: "Комплектующие для оптических сетей",
    metaTitle: "Комплектующие для оптоволокна — патч-корды",
    description:
      "Патч-корды LC/LC, SC, FC для оптических сетей. Любая длина от 0,5 м, полировка торца, рефлектометрический контроль при отгрузке. Под заказ 14–21 день.",
    keywords: ["патч-корд", "комплектующие оптика", "LC LC", "оптический патч-корд"],
    intro:
      "Патч-корды и расходники для монтажа и эксплуатации оптических сетей. Изготовление под заказ с тестированием.",
    content: [
      {
        title: "Зачем заказывать шнуры вместе с волокном",
        bullets: [
          "Один счёт, один паспорт комплекта, одна отгрузка — вместо двух поставщиков и двух входных контролей",
          "Типы разъёмов LC, SC и FC подбираются под кроссы и оборудование конкретного узла",
          "Каждый разъём на трассе — 0,3–0,5 дБ: считайте их в [бюджете линии](/blog/byudzhet-opticheskoy-linii)",
          "Сварные стыки вместо лишних разъёмов там, где гибкость подключения не нужна",
        ],
      },
      {
        title: "Разделы по теме",
        paragraphs: [
          "Сами шнуры — в подразделе [патч-корды](/komplektuyushchie/patch-kordy); волокно для тех же проектов — в разделе [оптоволокно](/optovolokno). Таблица разъёмов и правила выбора — в статье [патч-корды LC, SC, FC](/blog/patch-kordy-lc-sc-fc).",
        ],
      },
    ],
    relatedArticles: ["patch-kordy-lc-sc-fc", "byudzhet-opticheskoy-linii", "svarka-g657a2"],
    subcategories: [
      {
        slug: "patch-kordy",
        title: "Патч-корды",
        h1: "Патч-корды оптические — LC, SC, FC",
        metaTitle: "Патч-корды купить — LC/LC, SC, FC под заказ",
        description:
          "Оптические патч-корды LC/LC, SC, FC любой длины от 0,5 м. полировка торца разъёма, рефлектометрический контроль. Под заказ от 450 ₽, срок 14–21 день.",
        keywords: ["патч-корд LC", "патч-корд купить", "оптический патч-корд", "LC LC"],
        intro:
          "Патч-корды для кроссов, серверных и узлов связи. Коннекторы LC, SC, FC. Тестирование рефлектометрия при отгрузке.",
        content: [
          {
            title: "Какой разъём под какую задачу",
            bullets: [
              "LC — малый форм-фактор с защёлкой: стойки, высокоплотные кроссы, SFP-модули",
              "SC — push-pull: городские кроссы, распределительные шкафы, линии доступа",
              "FC — резьбовая фиксация: измерительные тракты, стенды, вибронагруженные точки",
              "Комбинации типа SC–LC под переход «кросс → оборудование» — обычная позиция в заявке",
            ],
          },
          {
            title: "Что указать при заказе",
            paragraphs: [
              "Три параметра: разъёмы с обеих сторон, длина и одномодовое волокно под вашу линию — под катушки [G.657.A2](/optovolokno/g657/g657a2) или [G.652.D](/optovolokno/g652/g652d) берите одномодовые шнуры. Полировка — под требования оборудования.",
              "Полный разбор разъёмов и потерь — в статье [патч-корды LC, SC, FC](/blog/patch-kordy-lc-sc-fc). Заказ идёт тем же сроком, что и волокно — [раздел комплектующих](/komplektuyushchie).",
            ],
          },
        ],
        relatedArticles: ["patch-kordy-lc-sc-fc", "byudzhet-opticheskoy-linii"],
        productIds: ["patch-cable"],
      },
    ],
  },
  {
    slug: "na-zakaz",
    id: "custom",
    title: "Под заказ",
    h1: "Оптоволокно нестандартной длины под заказ",
    metaTitle: "Оптоволокно под заказ — нестандартная длина катушки",
    description:
      "Волокно нестандартной длины: 25, 75, 100 км. Любой тип G.652/G.657. Изготовление под заказ за 14–21 день, рефлектометрический контроль и документы.",
    keywords: ["оптоволокно под заказ", "нестандартная длина", "катушка 25 км", "катушка 100 км"],
    intro:
      "Нестандартные длины катушек и типы волокна — изготовим на заводе под ваш проект. Минимальный заказ от 1 катушки.",
    content: [
      {
        title: "Что делаем под заказ",
        bullets: [
          "Длины катушек 25, 75 и 100 км — под плечо трассы, без сшивки стандартных 50-километровых бухт",
          "Любой тип волокна из раздела [оптоволокно](/optovolokno): G.652.D, G.657.A1/A2, G.655",
          "Срок — те же 14–21 рабочий день, что и у базовой намотки",
          "Паспорт на партию и рефлектограмма по запросу — как на стандартные позиции",
        ],
      },
      {
        title: "Почему длина катушки — это деньги",
        paragraphs: [
          "Каждая сшивка двух бухт — сварка, муфта и точка будущего обслуживания. Подрезка длины под трассу убирает лишние стыки: как считать — в статьях [выбор длины катушки](/blog/kak-vybrat-dlinu-katushki) и [расчёт катушек на трассу](/blog/raschet-katushek).",
        ],
      },
    ],
    relatedArticles: ["kak-vybrat-dlinu-katushki", "optovolokno-pod-zakaz", "raschet-katushek"],
    subcategories: [
      {
        slug: "nestandartnaya-dlina",
        title: "Нестандартная длина",
        h1: "Катушки оптоволокна нестандартной длины",
        metaTitle: "Катушка оптоволокна 25, 75, 100 км — под заказ",
        description:
          "Изготовление катушек оптоволокна 25, 75, 100 км и других длин. G.652, G.657. Срок 14–21 день, рефлектограмма, документы на партию.",
        keywords: ["катушка 25 км", "катушка 100 км", "нестандартная катушка", "волокно под заказ"],
        intro:
          "Закажите катушку нужной длины — от 10 км. Подберём тип волокна под проект и рассчитаем стоимость.",
        content: [
          {
            title: "Типовые нестандартные задачи",
            bullets: [
              "Пилотный участок или тест — 25 км: не расходовать полноразмерную бухту на эксперимент",
              "Плечо 50–75 км — 75 км одной катушкой вместо сшивки двух",
              "Магистраль длиннее 75 км — 100 км с делением по участкам под доступы бригад",
              "Короткие длины 1–10 км — это не этот раздел: смотрите [FO-цилиндры](/optovolokonnye-cilindry)",
            ],
          },
          {
            title: "Как оформить",
            paragraphs: [
              "Пришлите длины плеч и тип волокна — разложим поставку по катушкам и посчитаем цену. Правила выбора длины и запаса — в статье [как выбрать длину катушки](/blog/kak-vybrat-dlinu-katushki); примеры расчёта — [расчёт катушек на трассу](/blog/raschet-katushek).",
              "Смешанный заказ — нестандартные длины плюс стандартные [катушки 50 км](/katushka-optovolokno) — собирается одним счётом и одной отгрузкой.",
            ],
          },
        ],
        relatedArticles: ["kak-vybrat-dlinu-katushki", "raschet-katushek", "byudzhet-opticheskoy-linii"],
        productIds: ["custom-length"],
      },
    ],
  },
  {
    slug: "optovolokonnye-cilindry",
    id: "cylinders",
    title: "Оптоволоконные цилиндры",
    h1: "Оптоволоконные цилиндры FO-0.25 — купить",
    metaTitle: "Оптоволоконные цилиндры — серия FO-0.25 | G.657A2",
    description:
      "Оптоволоконные цилиндры серии FO-0.25: волокно G.657A2, длина 1–90 км, затухание 0.185 дБ/км, диаметр 0.25 мм. Для полевых работ, дронов и высокогорных платформ. Цена по запросу.",
    keywords: [
      "оптоволоконный цилиндр",
      "FO-0.25",
      "G.657A2",
      "оптический трос",
      "цилиндр 1 км",
      "цилиндр 10 км",
    ],
    intro:
      "Компактные оптоволоконные цилиндры с волокном G.657A2 — готовое решение для быстрого развёртывания линии связи в полевых и экстремальных условиях. 15 моделей от 1 до 90 км. Цена по запросу.",
    content: [
      {
        title: "Три сценария цилиндров",
        bullets: [
          "Стенд и наладка — короткие длины 1–3 км: обрыв на эксперименте стоит цилиндра, а не куска 50-километровой бухты",
          "Полевые и временные линии — 3–5 км: быстрый разворот и смотка малой бригадой",
          "БПЛА и тросовые системы — 3–10 км на лётные проверки, серийная намотка — катушками [G.657.A2](/optovolokno/g657/g657a2) по 50 км",
        ],
      },
      {
        title: "Цилиндр или катушка",
        paragraphs: [
          "Внутри цилиндра — то же волокно G.657A2 242 мкм: сварка, измерения и документы стандартные. Разница в формате: цилиндр — управляемый расход коротких длин, катушка — плечо трассы. Подробно — в статье [FO-цилиндры: стенды, поле, БПЛА](/blog/fo-cilindry-standy-pole).",
          "Модели и длины серии — в подразделе [FO-0.25](/optovolokonnye-cilindry/fo-0-25). Для сборки оптического троса — статья [оптоволоконный трос для БПЛА](/blog/opticheskiy-tros-bpla): мы поставляем волокно и цилиндры, сборку троса делает сборщик.",
        ],
      },
    ],
    relatedArticles: ["fo-cilindry-standy-pole", "opticheskiy-tros-bpla", "optovolokno-vs-radiokanal-fpv"],
    subcategories: [
      {
        slug: "fo-0-25",
        title: "Серия FO-0.25",
        h1: "Оптоволоконные цилиндры серии FO-0.25",
        metaTitle: "Цилиндры FO-0.25 — G.657A2, 1–90 км | ELIZON",
        description:
          "Серия FO-0.25: оптоволоконные цилиндры 1, 2, 3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60 и 90 км. G.657A2, 0.185 дБ/км. Цена по запросу.",
        keywords: [
          "FO-0.25-1",
          "FO-0.25-15",
          "оптоволоконный цилиндр купить",
          "цилиндр G.657A2",
        ],
        intro:
          "15 моделей оптоволоконных цилиндров с волокном G.657A2. Компактный корпус ABS, защита от ЭМП, температура −40…+85°C. Скачайте спецификацию и запросите цену.",
        content: [
          {
            title: "Серия FO-0.25: конструкция",
            bullets: [
              "Волокно G.657A2 с радиусом изгиба 7,5 мм — плотная смотка без роста потерь",
              "Затухание 0,185 дБ/км, диаметр волокна 0,25 мм",
              "Корпус ABS с защитой от электромагнитных помех, рабочая температура −40…+85°C",
              "Длины 1–90 км: 15 моделей под стенд, поле, БПЛА и высокогорные платформы",
            ],
          },
          {
            title: "Как выбрать модель",
            paragraphs: [
              "Ориентир — сценарий: лаборатория и учебный полигон — 1–3 км; полевые работы — 3–5 км; привязные БПЛА — 3–10 км с запасом на высоту. Таблица применения по длинам — в статье [FO-цилиндры](/blog/fo-cilindry-standy-pole).",
              "Цена — по запросу: пришлите длину и число цилиндров, соберём КП вместе с [катушками](/katushka-optovolokna) или [патч-кордами](/komplektuyushchie/patch-kordy), если нужны в той же поставке. Спецификация серии — PDF в карточках моделей.",
            ],
          },
        ],
        relatedArticles: ["fo-cilindry-standy-pole", "opticheskiy-tros-bpla"],
        productIds: [
          "fo-0-25-1",
          "fo-0-25-2",
          "fo-0-25-3",
          "fo-0-25-4",
          "fo-0-25-5",
          "fo-0-25-6",
          "fo-0-25-7",
          "fo-0-25-8",
          "fo-0-25-9",
          "fo-0-25-10",
          "fo-0-25-11",
          "fo-0-25-12",
          "fo-0-25-13",
          "fo-0-25-14",
          "fo-0-25-15",
        ],
      },
    ],
  },
];

export function getCategoryBySlug(slug: string): CatalogCategoryNode | undefined {
  return catalogTree.find((c) => c.slug === slug);
}

export function getSubcategoryBySlug(
  categorySlug: string,
  subcategorySlug: string
): { category: CatalogCategoryNode; subcategory: CatalogSubcategoryNode } | undefined {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;
  const subcategory = category.subcategories.find((s) => s.slug === subcategorySlug);
  if (!subcategory) return undefined;
  return { category, subcategory };
}

export function getProductsForSubcategory(subcategory: CatalogSubcategoryNode): Product[] {
  return subcategory.productIds
    .map((id) => getProductById(id))
    .filter((p): p is Product => Boolean(p));
}

export function getProductsForCategory(category: CatalogCategoryNode): Product[] {
  return category.subcategories.flatMap((sub) => getProductsForSubcategory(sub));
}

export function getProductCatalogPath(product: Product): string {
  for (const category of catalogTree) {
    for (const sub of category.subcategories) {
      if (sub.productIds.includes(product.id)) {
        return `${PRODUCTS_BASE}/${category.slug}/${sub.slug}/${product.slug}`;
      }
    }
  }
  return CATALOG_HUB_PATH;
}

export function resolveProductByPath(
  categorySlug: string,
  subcategorySlug: string,
  productSlug: string
): { category: CatalogCategoryNode; subcategory: CatalogSubcategoryNode; product: Product } | undefined {
  const resolved = getSubcategoryBySlug(categorySlug, subcategorySlug);
  if (!resolved) return undefined;
  const product = getProductsForSubcategory(resolved.subcategory).find((p) => p.slug === productSlug);
  if (!product) return undefined;
  return { ...resolved, product };
}

export function getAllCategorySlugs(): string[] {
  return catalogTree.map((c) => c.slug);
}

export function getAllSubcategoryParams(): { category: string; subcategory: string }[] {
  return catalogTree.flatMap((c) =>
    c.subcategories.map((s) => ({ category: c.slug, subcategory: s.slug }))
  );
}

export function getAllProductParams(): { category: string; subcategory: string; product: string }[] {
  return catalogTree.flatMap((c) =>
    c.subcategories.flatMap((s) =>
      getProductsForSubcategory(s).map((p) => ({
        category: c.slug,
        subcategory: s.slug,
        product: p.slug,
      }))
    )
  );
}

export function buildCatalogBreadcrumbs(
  category?: CatalogCategoryNode,
  subcategory?: CatalogSubcategoryNode,
  product?: Product
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { label: "Главная", href: "/" },
    { label: "Каталог", href: CATALOG_HUB_PATH },
  ];

  if (category) {
    items.push({
      label: category.title,
      href: product || subcategory ? `${PRODUCTS_BASE}/${category.slug}` : undefined,
    });
  }

  if (category && subcategory) {
    items.push({
      label: subcategory.title,
      href: product ? `${PRODUCTS_BASE}/${category.slug}/${subcategory.slug}` : undefined,
    });
  }

  if (product) {
    items.push({ label: product.shortName });
  }

  return items;
}

export function getCatalogSiblings(
  categorySlug: string,
  subcategorySlug?: string
): CatalogSubcategoryNode[] | CatalogCategoryNode[] {
  if (!subcategorySlug) return catalogTree;
  const category = getCategoryBySlug(categorySlug);
  return category?.subcategories ?? [];
}