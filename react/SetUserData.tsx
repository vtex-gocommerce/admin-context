import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import getUser from './queries/user.gql'

interface HandleAccountProps {
  UserContext
  getUser: {
    user
    loading: boolean
    refetch: Function
  }
}

class SetUserData extends React.Component<HandleAccountProps, any> {
  render() {
    const userData = this.props.getUser && this.props.getUser.user ? this.props.getUser.user : null
    const refetch = this.props.getUser && this.props.getUser.refetch ? this.props.getUser.refetch : () => {}
    const { UserContext, children } = this.props
    return <UserContext.Provider value={{ userData, refetch, query: getUser }}>{children}</UserContext.Provider>
  }
}

export default compose(
  graphql(getUser, {
    name: 'getUser',
    options: props => ({
      ssr: false,
      variables: {},
      errorPolicy: 'all'
    })
  })
)(SetUserData)
