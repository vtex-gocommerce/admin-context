import * as React from 'react'
import { Notify } from 'gocommerce.styleguide'
import Functions from './utils/functions'

export interface GlobalNotificationsProps {
  GlobalNotificationsContext: any
}

export interface GlobalNotificationsState {
  GlobalNotificationsContext: React.Context<any>
  isGraphQlLoaderEnabled: boolean
  graphQlLoaders: string[]
  isUILoaderEnabled: boolean
  alert: {
    isActive: boolean
    message: string
    type: string
    isCloseActive: boolean
    id: number
    isClosed: boolean
  }
}

export default class GlobalNotifications extends React.Component<GlobalNotificationsProps, GlobalNotificationsState> {
  state: GlobalNotificationsState = {
    GlobalNotificationsContext: this.props.GlobalNotificationsContext,
    isGraphQlLoaderEnabled: false,
    graphQlLoaders: [],
    isUILoaderEnabled: false,
    alert: {
      isActive: false,
      message: '',
      type: 'success',
      isCloseActive: true,
      id: 0,
      isClosed: false
    }
  }

  enableGraphQlLoader = (id: string) => {
    this.setState(prevState => ({
      ...prevState,
      isGraphQlLoaderEnabled: true,
      graphQlLoaders: Functions.addUniqueToArray(id, prevState.graphQlLoaders),
      alert: {
        isActive: false,
        message: '',
        type: 'success',
        isCloseActive: true,
        id: 0,
        isClosed: false
      }
    }))
  }

  disableGraphQlLoader = (id: string) => {
    this.setState(prevState => ({
      ...prevState,
      ...{
        isGraphQlLoaderEnabled: false,
        graphQlLoaders: Functions.removeValueInArrayNoIndex(id, prevState.graphQlLoaders)
      }
    }))
  }

  resetAlert = () => {
    this.setState(prevState => ({
      ...prevState,
      alert: {
        isActive: false,
        message: '',
        type: 'success',
        isCloseActive: true,
        id: 0,
        isClosed: false
      }
    }))
  }

  closeAlert = () => {
    this.setState(prevState => ({ alert: { ...prevState.alert, isClosed: true, isActive: false } }))
  }

  openAlert = (message: string, type: string, isCloseActive: boolean) => {
    this.setState(prevState => {
      return prevState.alert.id === null || !prevState.alert.isClosed
        ? {
            ...prevState,
            alert: {
              isActive: message !== prevState.alert.message,
              message,
              type,
              isCloseActive,
              onClose: this.closeAlert,
              id: prevState.alert.id === null ? Math.random() : prevState.alert.id,
              isClosed: false
            }
          }
        : null
    })
  }

  public render() {
    const {
      graphQlLoaders,
      isGraphQlLoaderEnabled,
      GlobalNotificationsContext: GlobalNotificationsContext
    } = this.state

    const providerValue = {
      enableGraphQlLoader: this.enableGraphQlLoader,
      disableGraphQlLoader: this.disableGraphQlLoader,
      isGraphQlLoaderEnabled: isGraphQlLoaderEnabled,
      openAlert: this.openAlert,
      closeAlert: this.closeAlert,
      resetAlert: this.resetAlert,
      alert: this.state.alert,
      graphQlLoaders
    }
    return (
      <GlobalNotificationsContext.Provider value={providerValue}>
        <>
          <Notify.Notify />
          {this.props.children}
        </>
      </GlobalNotificationsContext.Provider>
    )
  }
}
