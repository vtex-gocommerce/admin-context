import { loggerMiddleware, buildGraphQLError } from '@gocommerce/utils'

const splunkToken = 'dd433cc0-9106-4b0d-883a-377d57e8eb1a'

interface Context {
  [key: string]: any
}
interface Params {
  [key: string]: any
}
interface Info {
  [key: string]: any
}

export class GlobalErrors extends Error {
  public extensions: any

  constructor(extensions: object) {
    super('Something went wrong, please try again')
    this.extensions = { code: 'internal_server_error', ...extensions }
  }
}

export const resolvers = loggerMiddleware(splunkToken, {
  Query: {
    adminAccount: async function(_: any, _param: Params, ctx: Context, _info: Info, makeApiCall: Function) {
      const host = ctx.request.header['x-forwarded-host']
      const url = `/accounts/search?host=${host}`
      const { data, error } = await makeApiCall(url, 'get')

      if (error) throw buildGraphQLError('', error.status)

      return data
    },
  },
  Mutation: {
    blankMutation: async function(_: any, _param: Params, _ctx: Context) {
      return {
        data: ''
      }
    }
  }
})
