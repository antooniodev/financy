import { client, db } from "."
import { categorySchema } from "./schema"

async function seed() {
  const haveRegisters = await db.select().from(categorySchema)
  if (haveRegisters.length === 0) {
    await db.insert(categorySchema).values([
      { title: "Casa", color: "#5C4ED2", icon: "fa-house", type: false },
      {
        title: "Alimentação",
        color: "#FF741E",
        icon: "fa-utensils",
        type: false,
      },
      { title: "Transporte", color: "#03CA1A", icon: "fa-bus", type: false },
      {
        title: "Saúde",
        color: "#0000EE",
        icon: "fa-suitcase-medical",
        type: false,
      },
      {
        title: "Cartão de crédito",
        color: "#F60505",
        icon: "fa-credit-card",
        type: false,
      },
      { title: "Lazer", color: "#F6DE05", icon: "fa-tv", type: false },
      { title: "Outros", color: "#8C8C88", icon: "fa-hashtag", type: false },
      { title: "Educação", color: "#F51870", icon: "fa-book", type: false },
      {
        title: "Salário",
        color: "#0AA41C",
        icon: "fa-dollar-sign",
        type: true,
      },
      {
        title: "Outras rendas",
        color: "#8C8C88",
        icon: "fa-building-columns",
        type: true,
      },
      {
        title: "Investimentos",
        color: "#5C4ED2",
        icon: "fa-money-bill-trend-up",
        type: true,
      },
      {
        title: "Transferências",
        color: "#F60505",
        icon: "fa-comments-dollar",
        type: true,
      },
    ])
  } else {
    console.log("(Seed) The database is already populated")
  }
}

seed().finally(() => {
  client.end()
})
