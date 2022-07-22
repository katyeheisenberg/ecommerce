import React from 'react'

import Head from './head'
import Header from './header'
import Products from './products'

const Main = () => {
  return (
    <div className="flex flex-col bg-gradient-to-br from-pink-800 to-teal-800">
      <Head title="Main" />
      <Header caption="SkillCrucial 5 Shop" />
      <Products />
    </div>
  )
}

export default React.memo(Main)
