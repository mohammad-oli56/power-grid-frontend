import { useGetAllAuditLogs } from '@/hooks/admin.hooks'
import React from 'react'

const AuditLogs = () => {
    const {data,isPending,isError}=useGetAllAuditLogs()
    if(isPending) return <h1>loding</h1>
    console.log(data)
  return (
    <div>
      
    </div>
  )
}

export default AuditLogs
