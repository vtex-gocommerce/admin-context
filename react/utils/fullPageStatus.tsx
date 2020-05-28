import * as React from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import { IconSpinner } from 'gocommerce.styleguide'
import errorSvg from '../assets/error404.svg'

interface fullPageStatusProps {
  status: 'loading' | 'error' | 'notFound'
  showText?: boolean
  contractDomain?: string
}

const fullPageStatus = (props:fullPageStatusProps) => (
  <div className="vh-100 flex flex-column items-center justify-center ph4">
    {props.status === 'loading' ? (
      <IconSpinner animate width="50" height="50" />
    ) : (
      <img src={errorSvg} />
    )}
    {props.contractDomain && (
      <p className="f3 w-60 tc g-mt10">
        <FormattedMessage
          id="admin/error.WrongContract"
          defaultMessage="Invalid domain, access from {contractDomain}"
          values={{
            contractDomain: props.contractDomain
          }}
        />
      </p>
    ) || props.showText && (
      <p className="f3 w-60 tc g-mt10">
        <FormattedMessage id={messages[props.status].id} />
      </p>
    )}
  </div>
)

const messages = defineMessages({
  loading: {
    id: 'admin/error.Loading',
    defaultMessage: 'Loading',
  },
  error: {
    id: 'admin/error.InternalServerError',
    defaultMessage: 'An error has occurred, try again later',
  },
  notFound: {
    id: 'admin/error.NotFound',
    defaultMessage: "Ops! It looks like you're trying to access a page that either has been deleted or never even existed",
  },
});

export default fullPageStatus
