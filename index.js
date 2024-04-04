import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

const TOKEN = "6748836434:AAGMcz5CB8ACnpUpTnJenvBPvkQ1g14hwvE";

const bot = new Telegraf(TOKEN);

bot.on(message("text"), (ctx) => ctx.reply("Hello"));

// Start webhook via launch method (preferred)
bot.launch({
  webhook: {
    domain: "example.com",
    port: 8080,
  },
});
