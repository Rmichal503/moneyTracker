import { Card, Metric, ProgressBar } from '@tremor/react'
import React from 'react'

export default function AnalisysChart() {
  return (
    <Card>
        <Metric color='rose'>Work in progress</Metric>
        <ProgressBar value={30} color='rose'/>
    </Card>
  )
}
