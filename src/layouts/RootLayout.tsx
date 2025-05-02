import { Outlet } from 'react-router'
import { Toaster } from '@/components/ui/sonner'
import { useAuth } from '@/contexts/AuthContext'
import PageSpinner from '@/components/loaders/PageSpinner'

import LoadersInitiator from '@/components/shared/LoadersInitiator'

const RootLayout = () => {
  const { isLoadingUser, isLoggingOut } = useAuth()
  const isLoading = isLoadingUser || isLoggingOut

  return (
    <>
      <Toaster />

      <LoadersInitiator isLoading={isLoading} loaderComponent={<PageSpinner />}>
        <Outlet />
      </LoadersInitiator>
    </>
  )
}

export default RootLayout
