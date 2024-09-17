import React from 'react'
import { useSelector } from 'react-redux'
const Dashboard = () => {
  const user = useSelector((state) => {console.log(state)})
  return (
    <div>
      dashboard
    </div>
  )
}

export default Dashboard
