export type Layouts = 'admin' | 'login'

export type AlertType = 'success' | 'error' | 'warning' | 'info'

export interface Alert {
  isActive: boolean
  message: string
  type: AlertType
  isCloseActive: boolean
}

export interface Container {
  colapsedSideBar: boolean
  layout: Layouts
  graphQlLoaders: number[]
  isGraphQlLoaderEnabled: boolean
  isUILoaderEnabled: boolean
  alert: Alert
}

export interface defaultCurrencyType {
  accountName: string
  contract: string
  country: string
  currencySpec: {
    currencyFormatInfo: {
      currencyDecimalDigits: number
      currencyDecimalSeparator: string
      currencyGroupSeparator: string
      currencyGroupSize: number
      startsWithCurrencySymbol: boolean
    }
    currencySymbol: string
  }
  defaultLocale: string
  friendlyName: string
  host: string
  id: string
  isActive: boolean
  isProvisioned: boolean
  salesChannels: {
    countryCode: string
    cultureInfo: string
    currencyCode: string
    currencyFormatInfo: {
      currencyDecimalDigits: number
      currencyDecimalSeparator: string
      currencyGroupSeparator: string
      currencyGroupSize: number
      startsWithCurrencySymbol: boolean
    }

    currencyLocale: number
    currencySymbol: string
    id: number
    isActive: boolean
    name: string
    position: number
    timeZone: string
  }[]
}

export const defaultAccount: defaultCurrencyType = {
  accountName: '',
  contract: '',
  country: '',
  currencySpec: {
    currencyFormatInfo: {
      currencyDecimalDigits: 2,
      currencyDecimalSeparator: '.',
      currencyGroupSeparator: ',',
      currencyGroupSize: 2,
      startsWithCurrencySymbol: false
    },
    currencySymbol: ''
  },
  defaultLocale: '',
  friendlyName: '',
  host: '',
  id: '',
  isActive: false,
  isProvisioned: false,
  salesChannels: [
    {
      countryCode: '',
      cultureInfo: '',
      currencyCode: '',
      currencyFormatInfo: {
        currencyDecimalDigits: 0,
        currencyDecimalSeparator: '',
        currencyGroupSeparator: '',
        currencyGroupSize: 0,
        startsWithCurrencySymbol: false
      },
      currencyLocale: 0,
      currencySymbol: '',
      id: 0,
      isActive: false,
      name: '',
      position: 0,
      timeZone: ''
    }
  ]
}
