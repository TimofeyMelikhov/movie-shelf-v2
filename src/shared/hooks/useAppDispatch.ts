import { useDispatch } from 'react-redux'

import { AppDispatch } from '@/app/appStore'

export const useAppDispatch = () => useDispatch<AppDispatch>()
