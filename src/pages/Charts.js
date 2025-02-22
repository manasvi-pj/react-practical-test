// ** React Imports
import React, { useEffect, useState } from 'react'

// ** Constant Imports
import { strings } from '../constants/strings'

// ** MUI Imports
import { Box, Typography, Card } from '@mui/material'

// ** Charts Imports
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// ** Fake Sales Data
const generateFakeSalesData = () => {
  const data = []
  const today = new Date()

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    data.push({
      date: date.toLocaleDateString(),
      sales: Math.floor(Math.random() * 5000) + 1000
    })
  }

  return data
}

const SalesChart = () => {
  const [salesData, setSalesData] = useState([])

  useEffect(() => {
    setSalesData(generateFakeSalesData())
  }, [])

  return (
    <Card sx={{ p: 2, boxShadow: 3 }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        {strings.salesAnalytics}
      </Typography>
      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Line type='monotone' dataKey='sales' stroke='#1976D2' strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  )
}

export default SalesChart
