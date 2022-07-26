import React from 'react'
import { useSelector } from 'react-redux'

import Head from './head'
import Header from './header'

const Logs = () => {
  const { logList } = useSelector((s) => s.log)
  return (
    <div className="flex flex-col bg-gradient-to-br from-pink-800 to-teal-800 h-screen">
      <Head title="Logs" />
      <Header caption="SkillCrucial 5 Shop" />
      {logList.map((log) => (
        <div key={log?.id}>{log?.string}</div>
      ))}
    </div>
  )
}

export default React.memo(Logs)
