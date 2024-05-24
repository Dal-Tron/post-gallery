import { GRAPHQL_VARIABLES } from '@/constants/graphql'
import { GET_POSTS } from '@/graphql/queries/posts/getPosts'

export const mockGetPosts = {
  request: {
    query: GET_POSTS,
    variables: {
      ...GRAPHQL_VARIABLES,
      after: ''
    }
  },
  result: {
    data: {
      posts: {
        edges: [
          {
            node: {
              id: '1',
              title: 'Post 1',
              description: 'Description 1',
              reactionsCount: 5,
              fields: [
                {
                  key: 'cover_image',
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
        ],
        pageInfo: {
          hasNextPage: false,
          endCursor: null
        }
      }
    }
  }
}

export const mockGetPostsError = {
  request: {
    query: GET_POSTS,
    variables: {
      ...GRAPHQL_VARIABLES,
      after: ''
    }
  },
  error: new Error('An error occurred')
}

export const mockGetPostsEmpty = {
  request: {
    query: GET_POSTS,
    variables: {
      after: ''
    }
  },
  result: {
    data: {
      posts: {
        edges: [],
        pageInfo: {
          hasNextPage: false,
          endCursor: null
        }
      }
    }
  }
}
