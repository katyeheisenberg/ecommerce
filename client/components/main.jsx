import React from 'react'

import Head from './head'
import Header from './header'
import Products from './products'

const Main = () => {
  return (
    <div className="flex flex-col">
      <Head title="Main" />
      <Header caption="SkillCrucial 5 Shop" />
      <Products />
    </div>
  )
}

export default React.memo(Main)
