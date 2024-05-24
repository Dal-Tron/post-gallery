import { GET_POST } from '@/graphql/queries/posts/getPost'

export const mockGetPost = {
  request: {
    query: GET_POST,
    variables: { id: '1' }
  },
  result: {
    data: {
      post: {
        id: '1',
        title: 'Post Title',
        description: 'Post Description',
        textContent: 'Post Text Content',
        reactionsCount: 5,
        fields: [
          {
            key: 'cover_image',
            value: 'thumbnail',
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
      }
    }
  }
}
