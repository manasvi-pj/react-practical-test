/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

// ** MUI Imports
import {
  TextField,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  CircularProgress
} from '@mui/material'

const defaultValues = {
  product_name: '',
  sku: '',
  price: '',
  stock_quantity: '',
  image: null,
  status: true
}

const ProductForm = ({ open, editData, onClose, onSave }) => {
  // ** State
  const [preview, setPreview] = useState(null)

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues
  })

  // ** Watch status toggle
  const status = watch('status')

  const handleImageChange = event => {
    const file = event.target.files[0]

    if (file) {
      const imageUrl = URL.createObjectURL(file) // Convert File to temporary URL
      setPreview(imageUrl)
    }
  }

  const onSubmit = data => {
    const formData = {
      ...data,
      image: preview ? preview : null
    }

    if (formData.id) {
      onSave(formData.id, formData)
    } else {
      onSave(null, formData)
      reset()
    }
  }

  useEffect(() => {
    if (editData) {
      reset(editData)
      if (editData?.image) setPreview(editData?.image)
    } else {
      reset(defaultValues)
      setPreview(null)
    }
  }, [editData])

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        {editData ? 'Edit Product' : 'Add New Product'}
      </DialogTitle>
      <DialogContent>
        <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Product Name */}
          <Controller
            name='product_name'
            control={control}
            rules={{
              required: 'Product Name is required',
              minLength: {
                value: 2,
                message: 'Product Name must be at least 2 characters'
              },
              maxLength: {
                value: 100,
                message: "Product Name can't be more than 100 characters"
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label='Product Name'
                variant='outlined'
                fullWidth
                margin='normal'
                error={Boolean(errors.product_name)}
                helperText={errors.product_name?.message}
              />
            )}
          />

          {/* SKU */}
          <Controller
            name='sku'
            control={control}
            rules={{
              required: 'SKU is required',
              minLength: {
                value: 4,
                message: 'SKU must be at least 4 characters'
              },
              maxLength: {
                value: 16,
                message: "SKU can't be more than 16 characters"
              },
              pattern: {
                value: /^[A-Z0-9]+$/i,
                message: 'Please enter valid SKU'
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label='SKU'
                variant='outlined'
                fullWidth
                margin='normal'
                error={!!errors.sku}
                helperText={errors.sku?.message}
              />
            )}
          />

          {/* Price */}
          <Controller
            name='price'
            control={control}
            rules={{
              required: 'Price is required',
              min: { value: 1, message: 'Price must be greater than 0' },
              maxLength: {
                value: 10,
                message: "Price can't be more than 10 digits"
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label='Price'
                type='number'
                variant='outlined'
                fullWidth
                margin='normal'
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            )}
          />

          {/* Stock */}
          <Controller
            name='stock_quantity'
            control={control}
            rules={{
              required: 'Stock is required',
              maxLength: {
                value: 10,
                message: "Stock can't be more than 10 digits"
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type='number'
                label='Stock Quantity'
                variant='outlined'
                fullWidth
                margin='normal'
                error={!!errors.stock_quantity}
                helperText={errors.stock_quantity?.message}
              />
            )}
          />

          {/* Status */}
          <Controller
            name='status'
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Switch {...field} checked={status} />}
                label={status ? 'Active' : 'Inactive'}
              />
            )}
          />

          {/* Image Upload */}
          <Controller
            name='image'
            control={control}
            render={() => (
              <input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                style={{ marginTop: 8, width: '100%' }}
              />
            )}
          />

          {preview && (
            <img
              src={preview}
              alt='Preview'
              width={'auto'}
              height={'200px'}
              style={{ marginTop: 10, borderRadius: 8 }}
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ pb: 3, pr: 3 }}>
        <Button onClick={handleSubmit(onSubmit)} color='primary' variant='contained' disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size={25} color='inherit' /> : editData ? 'Update' : 'Add'}
        </Button>
        <Button
          onClick={() => {
            onClose()
            reset()
            setPreview(null)
          }}
          color='secondary'
          variant='outlined'
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProductForm
