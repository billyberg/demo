import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  // Projekt-id är en publik identifierare, inte en hemlighet. Att baka in den
  // gör att bygget fungerar även där miljövariabler saknas, till exempel i CI.
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? 'y3yhzlty',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2026-01-01',
  // Bygget är statiskt, så vi vill ha färskt innehåll vid varje bygge.
  useCdn: false,
})

const builder = imageUrlBuilder(sanityClient)

export function bildUrl(kalla: any) {
  return builder.image(kalla)
}

// Samma sida hämtas av flera komponenter under ett bygge. Genom att spara
// löftet blir det ett anrop i stället för ett per komponent.
const cache = new Map<string, Promise<any>>()

export function hamtaSida(id: string): Promise<any> {
  if (!cache.has(id)) {
    cache.set(id, sanityClient.fetch('*[_id == $id][0]', {id}))
  }
  return cache.get(id)!
}

export function hamtaLista(typ: string): Promise<any[]> {
  const nyckel = 'lista:' + typ
  if (!cache.has(nyckel)) {
    cache.set(
      nyckel,
      sanityClient.fetch('*[_type == $typ] | order(coalesce(ordning, 999) asc, _createdAt asc)', {typ}),
    )
  }
  return cache.get(nyckel)! as Promise<any[]>
}