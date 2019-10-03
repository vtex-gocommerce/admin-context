import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import getProfile from './queries/getProfile.gql'

interface HandleAccountProps {
  UserContext
  getUser: {
    getUserData: {
      name: string
      email: string
      picture: string
    }
    loading: boolean
    refetch: Function
  }
}

class SetUserData extends React.Component<HandleAccountProps, any> {
  render() {
    const { getUser, UserContext, children } = this.props
    const userDataReturn = getUser && getUser.getUserData ? getUser.getUserData : null
    const userData = userDataReturn && {
      avatar: userDataReturn.picture,
      email: userDataReturn.email,
      name: userDataReturn.name,
    } || {}
    const refetch = getUser && getUser.refetch ? getUser.refetch : () => {}
    return <UserContext.Provider value={{ userData, refetch, query: getProfile }}>{children}</UserContext.Provider>
  }
}

export default compose(
  graphql(getProfile, {
    name: 'getUser',
    options: props => ({
      ssr: false,
      variables: {},
      errorPolicy: 'all'
    })
  })
)(SetUserData)
