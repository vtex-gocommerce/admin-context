### GC-Context

## How to use

```js
import { Context } from 'gocommerce.gc-context'

<Context.AccountContext.Consumer>
  {(data) => {
    return null
  }}
</Context.AccountContext.Consumer>

<Context.UserContext.Consumer>
  {(data) => {
    return null
  }}
</Context.UserContext.Consumer>

<Context.GlobalNotificationsContext.Consumer>
  {(data) => {
    return null
  }}
</Context.GlobalNotificationsContext.Consumer>
```
