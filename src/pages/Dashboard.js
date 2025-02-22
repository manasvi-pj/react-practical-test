/* eslint-disable react-hooks/rules-of-hooks */
// ** React Imports
import React, { useState } from 'react'

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, deleteProduct, toggleProductStatus, updateProduct, viewProduct } from '../features/productsSlice'

// ** MUI Imports
import { DataGrid } from '@mui/x-data-grid'
import { Button, Box, TextField, Switch, IconButton } from '@mui/material'

// ** Constant Imports
import { strings } from '../constants/strings'

// ** Component Imports
import ProductModal from '../components/ProductForm'
import { useDebouncedValue } from '../hooks/useDebounce'
import RenderImage from '../components/CustomAvatar'

// ** Icon Imports
import { Icon } from '@iconify/react'

// ** Styles Imports
import * as styles from '../styles-page/styles'

const Dashboard = () => {
  // ** States
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const searchTasks = (products, searchQuery) => {
    // ** If search query is empty, return all products
    if (!searchQuery) return products

    return products.filter(product =>
      Object.values(product).join(' ').toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  // ** Vars
  const dispatch = useDispatch()
  const rows = useSelector(state => state.products || [])
  const debouncedSearchQuery = useDebouncedValue(searchText, 500)
  const filteredProducts = searchTasks(rows, debouncedSearchQuery)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
    setEditData(null)
  }

  const handleSave = (id, data) => {
    if (id) {
      dispatch(updateProduct({ id: id, updatedProduct: data }))
    } else {
      dispatch(addProduct(data))
    }
    handleCloseDialog()
  }

  const handleDelete = id => {
    dispatch(deleteProduct(id))
  }

  const handleEdit = async id => {
    setOpen(true)
    await dispatch(viewProduct(id)).then(result => {
      const task = result.payload
      setEditData(task)
    })
  }

  const columns = [
    { field: 'no', headerName: 'Sr No.', width: 120, sortable: false },
    { field: 'product_name', headerName: 'Product Name', width: 230, sortable: false },
    { field: 'sku', headerName: 'SKU', width: 170, sortable: false },
    { field: 'price', headerName: 'Price', width: 140 },
    { field: 'stock_quantity', headerName: 'Stock', width: 120 },
    {
      field: 'image',
      headerName: 'Image',
      width: 120,
      sortable: false,
      renderCell: params => (
        <Box display={'flex'} alignItems={'center'} height={'100%'}>
          {RenderImage(params?.row)}
        </Box>
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: params => (
        <Switch checked={params.row.status} onChange={() => dispatch(toggleProductStatus(params.row.id))} />
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: params => (
        <Box>
          <IconButton
            sx={styles.paddingOfIcon}
            onMouseUp={() => {
              handleEdit(params.row.id)
            }}
          >
            <Icon icon='mdi:pencil-outline' fontSize='1.25rem' />
          </IconButton>
          <IconButton
            sx={styles.paddingOfIcon}
            onMouseUp={() => {
              handleDelete(params.row.id)
            }}
          >
            <Icon icon='mdi:delete-outline' fontSize='1.25rem' color='red' />
          </IconButton>
        </Box>
      )
    }
  ]

  return (
    <Box>
      <Box display={'flex'} justifyContent={'end'} flexWrap={'wrap'} py={3} gap={1}>
        <TextField
          variant='outlined'
          placeholder='Search...'
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          size='small'
          sx={{ width: 300 }}
        />
        <Button variant='contained' color='primary' onClick={handleOpen}>
          {strings.add}
        </Button>
      </Box>
      <DataGrid
        sx={styles.dataGrid}
        disableColumnMenu
        getRowId={row => row?.id}
        rows={filteredProducts || []}
        columns={columns}
        rowCount={filteredProducts?.length}
        initialState={{
          pagination: {
            paginationModel: {
              page: page,
              pageSize: pageSize
            }
          }
        }}
        onPaginationModelChange={newPageSize => {
          setPageSize(newPageSize.pageSize)
          setPage(newPageSize.page)
        }}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        disableRowSelectionOnClick
      />
      <ProductModal open={open} editData={editData} onClose={handleCloseDialog} onSave={handleSave} />
    </Box>
  )
}

export default Dashboard
