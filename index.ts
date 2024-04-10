import { Context, Telegraf, Markup, session } from "telegraf";
import { message } from "telegraf/filters";

const REQUEST_TIMEOUT = 60 * 1000; // 60 seconds;

async function requestCode(restId: number) {
  const res = await fetch(
    `https://evrasia.spb.ru/api/v1/restaurant-discount/?REST_ID=${restId}`,
    {
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
        "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
        "sec-ch-ua":
          '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        cookie:
          "CHOOSED_RESTAURANT_EVERYTIME=true; BITRIX_SM_LOGIN=%2B7+%28995%29+661-78-79; BITRIX_SM_SOUND_LOGIN_PLAYED=Y; PHPSESSID=20d76ec97701750131052d60a6c35193; BITRIX_SM_UIDH=cd2e45944d5ae042211668ac50b09484; BITRIX_SM_UIDL=%2B7+%28995%29+661-78-79; BITRIX_SM_SALE_UID=209445630; BITRIX_CONVERSION_CONTEXT_s1=%7B%22ID%22%3A11%2C%22EXPIRE%22%3A1712437140%2C%22UNIQUE%22%3A%5B%22conversion_visit_day%22%5D%7D; cf_clearance=4.Q_Id11KkCUd43.mjWfRviC79RJ2GBPWmwtkpggJnw-1712391595-1.0.1.1-u6rkP4aRzzCqKTtmcH6a4l2AeCJ9TfzCqOOaGW_qDwxbC7lKHLQS06EyWJZIAJ01Hs9QKi1jeDbfuYY566Pxsg",
        Referer: "https://evrasia.spb.ru/account/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    }
  );

  const r = await res.json();

  if (r.checkin) {
    return r.checkin;
  } else {
    return "";
  }
}

const RESTS = [
  {
    id: 214,
    name: "Сестрорецк, Приморское ш., 348",
  },
  {
    id: 215,
    name: "Кронштадт, пр. Ленина, 31",
  },
  {
    id: 222,
    name: "пр. Просвещения, 32",
  },
  {
    id: 224,
    name: "пр. Энгельса, 134 к.3",
  },
  {
    id: 228,
    name: "пр. Просвещения, 78",
  },
  {
    id: 230,
    name: "Гражданский пр., 116",
  },
  {
    id: 234,
    name: "Комендантский пр., 13 к.1",
  },
  {
    id: 236,
    name: "пр. Энгельса, 21",
  },
  {
    id: 237,
    name: "Крестовский пр., 24",
  },
  {
    id: 238,
    name: "наб. Черной речки, 51А",
  },
  {
    id: 240,
    name: "Пискаревский пр., 25",
  },
  {
    id: 258,
    name: "Ленинский пр., 95",
  },
  {
    id: 260,
    name: "Кронверкский пр., 13/2",
  },
  {
    id: 261,
    name: "Литейный пр., 28",
  },
  {
    id: 263,
    name: "пр. Стачек, 99 (ТРК Континент, 3 этаж)",
  },
  {
    id: 265,
    name: "пр. Стачек, 77",
  },
  {
    id: 266,
    name: "ул. Жуковского, 36",
  },
  {
    id: 268,
    name: "Владимирский пр., 14",
  },
  {
    id: 269,
    name: "Московский пр., 145",
  },
  {
    id: 275,
    name: "Труда пл., 3",
  },
  {
    id: 278,
    name: "ул. Фучика, 2А (ТРЦ Рио, 1 этаж)",
  },
  {
    id: 282,
    name: "Лиговский пр., 93",
  },
  {
    id: 283,
    name: "ул. Белы Куна, 3 (ТРК Международный, 3 этаж)",
  },
  {
    id: 289,
    name: "Загородный пр., 64",
  },
  {
    id: 292,
    name: "Заневский пр., 67/2",
  },
  {
    id: 295,
    name: "Московский пр., 195",
  },
  {
    id: 298,
    name: "Индустриальный пр., 26/24",
  },
  {
    id: 300,
    name: "Московский пр., 222",
  },
  {
    id: 306,
    name: "Большая Морская, 13",
  },
  {
    id: 307,
    name: "пр. Славы, 43",
  },
  {
    id: 311,
    name: "Балканская пл., 5 (ТЦ Балкания Nova, 2 этаж)",
  },
  {
    id: 312,
    name: "пр. Большевиков, 2",
  },
  {
    id: 313,
    name: "наб. канала Грибоедова, 10/12",
  },
  {
    id: 314,
    name: "Пулковское ш., 25, к.1 (ТРК Лето, 2 этаж)",
  },
  {
    id: 315,
    name: "Шереметьевская ул., 13 (ТЦ Масштаб, 1 этаж)",
  },
  {
    id: 318,
    name: "наб. канала Грибоедова, 22/5",
  },
  {
    id: 320,
    name: "Ломоносов, ул. Красноармейская, 19А (ТЦ Рамбов, 3 этаж)",
  },
  {
    id: 323,
    name: "Пушкин, Октябрьский бул., 7",
  },
  {
    id: 324,
    name: "Красное Село, пр. Ленина, 51 (ТК Тетрис, 1 этаж)",
  },
  {
    id: 325,
    name: "Гатчина, пр. 25 октября, 59",
  },
  {
    id: 327,
    name: "Колпино, Октябрьская ул., 8",
  },
  {
    id: 331,
    name: "Колпино, ул. Пролетарская, 7А",
  },
  {
    id: 502,
    name: "Приозерск, ул. Калинина, 11",
  },
  {
    id: 503,
    name: "Выборг, Ленинградский пр., 29/2",
  },
  {
    id: 3670,
    name: "бул. Новаторов, 32",
  },
  {
    id: 137979,
    name: "Кудрово, Европейский пр., 8",
  },
  {
    id: 142183,
    name: "Якорная ул., 5А, (ТРЦ Охта Молл, 3 этаж)",
  },
  {
    id: 645308,
    name: "Каменноостровский пр., 44",
  },
  {
    id: 645322,
    name: "Большая Конюшенная ул., 10",
  },
  {
    id: 645326,
    name: "Итальянская ул., 29",
  },
  {
    id: 741759,
    name: "Заневский пр., 71 к.2 (ТРК Заневский каскад, 4 этаж) Детский клуб",
  },
  {
    id: 801338,
    name: "ул. Ефимова, 2. (ТРК Пик, 2 этаж)",
  },
  {
    id: 839130,
    name: "Невский пр., 42",
  },
  {
    id: 869805,
    name: "ул. Савушкина, 141 (ТРК Меркурий, 3 этаж)",
  },
  {
    id: 875269,
    name: "пр. Энгельса, 154 (ТРК Гранд Каньон, 3 этаж)",
  },
  {
    id: 888767,
    name: "Петергофское ш., 51А (ТРЦ Жемчужная Плаза, 1 этаж)",
  },
  {
    id: 1039378,
    name: "пр. Большевиков, 18 к.2 (ТРК Невский, 4 этаж)",
  },
  {
    id: 1074699,
    name: "6 линия Васильевского острова,17-19",
  },
  {
    id: 1153645,
    name: "Московский пр., 157",
  },
  {
    id: 1308568,
    name: "Мурманское ш., 12-й км, 1А (СТЦ Мега Дыбенко)",
  },
  {
    id: 1457827,
    name: "Захарьевская ул., 27",
  },
  {
    id: 1663583,
    name: "Мурино, Екатерининская ул. 17",
  },
];

const TOKEN = process.env.TOKEN || "";
const DOMAIN = "telegrafbot.vercel.app";
const PORT = 8080;

interface BotContext extends Context {
  session?: {
    lastRequestTime: Date;
  };
}
async function startBot() {
  const bot = new Telegraf<BotContext>(TOKEN);

  bot.use(session());

  const restaurantsList = Markup.keyboard(
    RESTS.map((rest) => Markup.button.callback(rest.name, rest.name))
  );

  bot.start((ctx) => {
    ctx.replyWithHTML(
      `Добро пожаловать в бота для получения скидки по красной карте Евразия
Напишите <b>/menu</b> для получения списка ресторанов
    `
    );
  });

  bot.command("menu", async (ctx) => {
    ctx.reply("Выберите ресторан", restaurantsList);
  });

  bot.command("help", async (ctx) => {
    ctx.replyWithHTML(`
<b>Инструкция при нахождении в заведении:</b>
1️⃣ Выберите нужный ресторан с помощью команды /menu
2️⃣ Дождитесь получения кода от бота
3️⃣ Скажите официанту что у вас Красная карта
4️⃣ Назовите ему код из бота (4 цифры)
5️⃣ Профит! Красные цены теперь ваши.

По красной бонусной карте вы получаете скидку на меню (красные цены) и возможность получать выгодные предложения
💲Плюсы карты - получаете СКИДКУ 30% на все блюда в меню и даже на алкоголь 🍾
1️⃣➕1️⃣ Действует 1+1 в счастливые часы и красные ценники.
`);
  });

  bot.on(message("text"), async (ctx) => {
    const text = ctx.message.text;

    if (
      ctx.session?.lastRequestTime &&
      new Date().getTime() - ctx.session.lastRequestTime?.getTime() <
        REQUEST_TIMEOUT
    ) {
      ctx.replyWithHTML(
        `Слишком частые запросы, код можно запрашивать не чаще чем раз в <b>1 минуту</b>`
      );
      return;
    }

    const resto = RESTS.find((rest) => rest.name.includes(text));

    if (resto) {
      try {
        const result = await requestCode(resto.id);
        ctx.session ??= { lastRequestTime: new Date() };

        if (!!result) {
          ctx.replyWithHTML(
            `Код для ресторана <i>${resto.name}</i>: <b>${result}</b>`,
            {
              reply_markup: {
                remove_keyboard: true,
              },
            }
          );
        } else {
          ctx.replyWithHTML(`<b>Не</b> удалось получить код`);
        }
      } catch (err) {
        ctx.replyWithHTML(`<b>Не</b> удалось получить код`);
      }
    } else {
      ctx.replyWithHTML(`<b>Не</b> удалось найти ресторан с таким названием`);
    }
  });

  bot
    .launch({ webhook: { domain: DOMAIN, port: PORT } })
    .then(() => console.log("Webhook bot listening on port", PORT));
}

startBot();
