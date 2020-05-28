import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from 'react-apollo'
import Cookies from 'js-cookie'

import { defaultCurrencyType, defaultAccount } from './types'
import FullPageStatus from './utils/fullPageStatus'

import GET_ACCOUNT from './queries/account.gql'
import SET_ACCOUNT_SELLER from './queries/setAccountSeller.gql'

const buildStoreData = (accountData: defaultCurrencyType) => (accountData ? {
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

interface HandleAccountProps {
  AccountContext: any
}

const SetAccountData = (props: React.PropsWithChildren<HandleAccountProps>) => {
  const [forceLoading, setForceLoading] = useState(false)
  const { data, loading, error, refetch } = useQuery(GET_ACCOUNT)
  const [setSellerInfo, {
    loading: mutationLoading,
  }] = useMutation(SET_ACCOUNT_SELLER)

  const redirectToWizard = (currentDomain: string) => {
    if (Cookies.get('gc_firstAccess')) {
      setForceLoading(true)
      Cookies.remove('gc_firstAccess', { domain: currentDomain })
      window.location.pathname = '/admin/wizard/vtex-local'
    }
  }

  useEffect(() => {
    if (
      window?.location?.hostname?.indexOf('app.') !== 0 &&
      window?.location?.pathname?.indexOf('/admin/auth') < 0 &&
      window?.location?.pathname?.indexOf('/admin/wizard') < 0
    ) {
      const currentDomain = window.location.hostname.split('.').slice(1).join('.')
      if (
        Cookies.get('gc_createdAccountDomain') &&
        Cookies.get('gc_sponsor') &&
        Cookies.get('gc_invitation')
      ) {
        setSellerInfo().then(({ data }) => {
          if (data?.setAccountSeller?.invite) {
            Cookies.remove('gc_createdAccountDomain', { domain: currentDomain })
            Cookies.remove('gc_sponsor', { domain: currentDomain })
            Cookies.remove('gc_invitation', { domain: currentDomain })
            Cookies.remove('gc_document', { domain: currentDomain })
          } else {
            console.log(data)
          }
          redirectToWizard(currentDomain)
        }).catch((e) => {
          console.log(e)
          redirectToWizard(currentDomain)
        })
      } else {
        redirectToWizard(currentDomain)
      }
    }
  }, [])

  // Show loading if account is not ready yet
  if(loading || mutationLoading || forceLoading) {
    return <FullPageStatus status="loading" />
  }
  // Return erro when account was not found
  if(error || !data.accountDetails || !data.accountDetails.id) {
    console.log('ERROR: ', data)
    return <FullPageStatus status="error" showText={true} />
  }
  const accountData: defaultCurrencyType = buildStoreData(
    data?.accountDetails ? data.accountDetails : null
  )
  // Don't allow access to admin through custom host
  if(accountData?.host === window?.location?.host) {
    window.location.pathname = '/'
    return <FullPageStatus status="error" />
  }
  // Don't allow access to admin from an domain different from the contract domain
  if(accountData?.contractHost !== window?.location?.host?.split('.')?.slice(1)?.join('.')) {
    return <FullPageStatus status="error" showText={true} contractDomain={accountData?.contractHost} />
  }

  const { AccountContext, children } = props
  return (
    <AccountContext.Provider value={{ accountData, refetch, query: GET_ACCOUNT }}>{children}</AccountContext.Provider>
  )
}

export default React.memo(SetAccountData)
