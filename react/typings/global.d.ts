declare module 'vtex.render-runtime'
declare module 'vtex.styleguide'
declare module 'gocommerce.admin-auth'
declare module 'gocommerce.form-utils'

declare module '*.css'
declare module '*.gql' {
  import { DocumentNode } from 'graphql'

  const value: DocumentNode
  export default value
}
