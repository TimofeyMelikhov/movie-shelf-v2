import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { RootState } from '@/app/appStore'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
