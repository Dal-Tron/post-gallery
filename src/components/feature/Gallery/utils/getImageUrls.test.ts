import { describe, test, expect } from 'vitest'
import { getImageUrls } from './getImageUrls'
import {
  CustomField as OriginalCustomField,
  CustomFieldRelation as OriginalCustomFieldRelation
} from '@/graphql/generated/types'

interface TestMedia {
  __typename: 'Image' | 'Video'
  urls?: {
    medium?: string
  }
}

interface TestCustomFieldRelation
  extends Omit<
    OriginalCustomFieldRelation,
    'medias' | 'members' | 'posts' | 'spaces' | 'tags'
  > {
  medias: TestMedia[]
  members?: any[]
  posts?: any[]
  spaces?: any[]
  tags?: any[]
}

interface TestCustomField
  extends Omit<OriginalCustomField, 'relationEntities'> {
  relationEntities?: TestCustomFieldRelation | null
}

describe('getImageUrls', () => {
  test('returns an empty object if fields is null or undefined', () => {
    expect(getImageUrls(null)).toEqual({})
    expect(getImageUrls(undefined)).toEqual({})
  })

  test('returns an empty object if no cover_image field is found', () => {
    const fields: TestCustomField[] = [
      { key: 'other_image', value: null, relationEntities: null }
    ]
    expect(getImageUrls(fields)).toEqual({})
  })

  test('returns the urls of the cover_image field if found', () => {
    const fields: TestCustomField[] = [
      {
        key: 'cover_image',
        value: null,
        relationEntities: {
          medias: [
            {
              __typename: 'Image',
              urls: {
                medium: 'https://example.com/medium-image.jpg'
              }
            }
          ]
        }
      }
    ]
    expect(getImageUrls(fields)).toEqual({
      medium: 'https://example.com/medium-image.jpg'
    })
  })

  test('returns an empty object if the cover_image field has no medias', () => {
    const fields: TestCustomField[] = [
      {
        key: 'cover_image',
        value: null,
        relationEntities: {
          medias: []
        }
      }
    ]
    expect(getImageUrls(fields)).toEqual({})
  })

  test('returns an empty object if the cover_image field has medias but none are images', () => {
    const fields: TestCustomField[] = [
      {
        key: 'cover_image',
        value: null,
        relationEntities: {
          medias: [
            {
              __typename: 'Video'
            }
          ]
        }
      }
    ]
    expect(getImageUrls(fields)).toEqual({})
  })
})
