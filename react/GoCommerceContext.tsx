import * as React from 'react'
import Context from './Context'
import SetAccountData from './SetAccountData'
import SetUserData from './SetUserData'
import GlobalNotifications from './GlobalNotifications'

class GoCommerceContext extends React.Component<{}, {}> {
  render() {
    return (
      <SetAccountData AccountContext={Context.AccountContext}>
        <SetUserData UserContext={Context.UserContext}>
          <GlobalNotifications GlobalNotificationsContext={Context.GlobalNotificationsContext}>
            {this.props.children}
          </GlobalNotifications>
        </SetUserData>
      </SetAccountData>
    )
  }
}

export default GoCommerceContext
