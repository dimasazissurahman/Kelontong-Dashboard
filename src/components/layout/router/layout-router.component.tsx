import React from 'react'
import { HeaderComponent } from '../header/layout-header.component'

export const LayoutRouter = (props: any) => {
  return (
    <div>
      <HeaderComponent />
      <div className="p-2">
        {props.children}
      </div>
    </div>
  )
}
