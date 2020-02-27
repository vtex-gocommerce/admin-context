import * as React from 'react'
import { graphql, compose } from 'react-apollo'
// import { FormattedMessage } from 'react-intl'
import getAccount from './queries/account.gql'
import FullPageStatus from './utils/fullPageStatus'
import { defaultCurrencyType, defaultAccount } from './types'

interface HandleAccountProps {
  AccountContext: any
  getAccount: {
    accountDetails: any
    loading: boolean
    refetch: Function
    error: any
  }
}

class SetAccountData extends React.Component<HandleAccountProps, any> {
  buildStoreData = accountData => (accountData ? {
    currencySpec:
      accountData && accountData.salesChannels && accountData.salesChannels.length > 0
        && {
            currencySymbol: accountData.salesChannels[0].currencySymbol,
            currencyFormatInfo: accountData.salesChannels[0].currencyFormatInfo
        },
    ...accountData
  } : {
    ...defaultAccount
  })

  render() {
    // Show loading if account is not ready yet
    if(this.props.getAccount && this.props.getAccount.loading) {
      return <FullPageStatus status="loading" />
    }
    // Return erro when account was not found
    if(!this.props.getAccount || this.props.getAccount.error || !this.props.getAccount.accountDetails || !this.props.getAccount.accountDetails.id) {
      console.log('ERROR: ', this.props.getAccount)
      return <FullPageStatus status="error" showText={true} />
    }
    const accountData: defaultCurrencyType = this.buildStoreData(
      this.props.getAccount && this.props.getAccount.accountDetails ? this.props.getAccount.accountDetails : null
    )
    // Don't allow access admin through custom host
    if(accountData && accountData.host && accountData.host === (window.location && window.location.host)) {
      window.location.pathname = '/'
      return <FullPageStatus status="error" />
    }
    const refetch = this.props.getAccount && this.props.getAccount.refetch ? this.props.getAccount.refetch : () => {}
    const { AccountContext, children } = this.props
    return (
      <AccountContext.Provider value={{ accountData, refetch, query: getAccount }}>{children}</AccountContext.Provider>
    )
  }
}

export default compose(
  graphql(getAccount, {
    name: 'getAccount',
    options: props => ({
      variables: {},
      errorPolicy: 'all'
    })
  })
)(SetAccountData)
