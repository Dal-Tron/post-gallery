import { CustomField } from '@/graphql/generated/types'

export const getImageUrls = (fields: CustomField[] | null | undefined) => {
  if (!fields) return {}

  for (const field of fields) {
    if (field.key === 'cover_image' && field.relationEntities?.medias) {
      const image = field.relationEntities.medias.find(
        (media) => media.__typename === 'Image'
      ) as { __typename: 'Image'; urls: { medium?: string } } | undefined
      if (image) {
        return image.urls || {}
      }
    }
  }
  return {}
}
