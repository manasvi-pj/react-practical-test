// ** React Imports
import React from 'react'

// ** MUI Imports
import { Card, CardContent, Typography, Box } from '@mui/material'
import { green, orange, blue, purple } from '@mui/material/colors'

// ** Static Order Data
const orderData = {
  totalOrders: 120,
  pendingOrders: 35,
  completedOrders: 85,
  revenue: 45920.75
}

const SummaryCard = ({ title, value, color }) => {
  return (
    <Card sx={{ borderLeft: `5px solid ${color}`, boxShadow: 2, p: 1 }}>
      <CardContent>
        <Typography variant='h6' sx={{ color }}>
          {title}
        </Typography>
        <Typography variant='h5'>{value}</Typography>
      </CardContent>
    </Card>
  )
}

const OrderSummaryCard = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 3,
        py: 2
      }}
    >
      <SummaryCard title='Total Orders' value={orderData.totalOrders} color={blue[500]} />
      <SummaryCard title='Pending Orders' value={orderData.pendingOrders} color={orange[500]} />
      <SummaryCard title='Completed Orders' value={orderData.completedOrders} color={green[500]} />
      <SummaryCard title='Revenue' value={`₹${orderData.revenue.toLocaleString('en-IN')}`} color={purple[500]} />
    </Box>
  )
}

export default OrderSummaryCard
