// ** MUI Imports
import MuiAvatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'

// ** Utils Imports
import { getInitials } from '../../utils/getInitial'

// ** Styles Imports
import * as styles from '../../styles-page/styles'

const RenderImage = row => {
  return (
    <Box>
      {row?.image ? (
        <MuiAvatar src={row?.image} sx={styles.customImage} />
      ) : (
        <MuiAvatar skin='light' color={'primary'} sx={styles.customWithoutImage}>
          {getInitials(row?.product_name ? row?.product_name : 'Product')}
        </MuiAvatar>
      )}
    </Box>
  )
}

export default RenderImage
