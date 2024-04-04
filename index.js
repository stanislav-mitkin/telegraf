import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

const TOKEN = "6748836434:AAGMcz5CB8ACnpUpTnJenvBPvkQ1g14hwvE";
const DOMAIN = "telegrafbot.vercel.app";

const bot = new Telegraf(TOKEN);

bot.on(message("text"), (ctx) => ctx.reply("Hello"));

// Start webhook via launch method (preferred)
bot.launch({
  webhook: {
    domain: DOMAIN,
    port: 8080,
  },
});
