import type {StructureBuilder, StructureResolver} from 'sanity/structure'

// Sidorna är singletons: ett fast dokument-id gör att det bara kan finnas ett av varje.
function singleton(S: StructureBuilder, typ: string, titel: string) {
  return S.listItem()
    .title(titel)
    .id(typ)
    .child(S.document().schemaType(typ).documentId(typ).title(titel))
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Innehåll')
    .items([
        singleton(S, 'sidaStart', "Startsida"),
        S.divider(),
        S.documentTypeListItem('services'),
    ])
