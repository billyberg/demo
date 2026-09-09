/**
 * Fyller Sanity med texterna som stod i prototypen, så att kunden möts av sin
 * färdiga sajt i stället för tomma fält.
 *
 *   1. Skapa en token på sanity.io/manage → API → Tokens, roll "Editor"
 *   2. Lägg den i .env som SANITY_WRITE_TOKEN
 *   3. npm run seed
 *
 * Sidorna skrivs över varje gång. Listposter skapas bara om listan är tom,
 * så att ett andra körning inte dubblerar innehållet.
 */
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2026-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

if (!process.env.SANITY_WRITE_TOKEN) {
  console.error('SANITY_WRITE_TOKEN saknas. Se .env.example.')
  process.exit(1)
}

const nyckel = () => Math.random().toString(36).slice(2, 12)

/** Gör en adressvänlig sträng: "Vår tjänst" → "var-tjanst" */
const slugga = (text) =>
  String(text ?? '')
    .toLowerCase()
    .replace(/[åä]/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)

/** Gör vanlig text till Portable Text. */
const block = (text) =>
  String(text ?? '')
    .split(/\n{2,}/)
    .filter((s) => s.trim() !== '')
    .map((stycke) => ({
      _type: 'block',
      _key: nyckel(),
      style: 'normal',
      markDefs: [],
      children: [{_type: 'span', _key: nyckel(), text: stycke.trim(), marks: []}],
    }))

const sidor = [
  {
    _id: "sidaStart",
    _type: "sidaStart",
    headline: "Vi bygger digitala upplevelser som håller",
  },
]

const listor = {
  "services": [
    {
      _type: "services",
      ordning: 1,
      rubrik: "Design",
      text: "Gränssnitt som är enkla att använda och lätta att bygga vidare på.",
    },
    {
      _type: "services",
      ordning: 2,
      rubrik: "Utveckling",
      text: "Snabba, tillgängliga sajter utan onödiga lager av teknik.",
    },
    {
      _type: "services",
      ordning: 3,
      rubrik: "Förvaltning",
      text: "Vi finns kvar efter lansering och håller sajten vid liv.",
    },
  ],
}

async function kor() {
  for (const sida of sidor) {
    await client.createOrReplace(sida)
    console.log('Sida:', sida._id)
  }

  for (const [typ, poster] of Object.entries(listor)) {
    const antal = await client.fetch('count(*[_type == $typ])', {typ})
    if (antal > 0) {
      console.log('Hoppar över', typ, '– innehåller redan', antal, 'poster')
      continue
    }
    for (const post of poster) {
      const kalla = post[Object.keys(post).find((k) => !k.startsWith('_') && k !== 'ordning')]
      const skapad = await client.create({
        ...post,
        slug: {_type: 'slug', current: slugga(kalla) || nyckel()},
      })
      console.log('Post:', typ, skapad._id)
    }
  }

  console.log('\nKlart. Öppna Studion och titta.')
}

kor().catch((fel) => {
  console.error(fel.message)
  process.exit(1)
})