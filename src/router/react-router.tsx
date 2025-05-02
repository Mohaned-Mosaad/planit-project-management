import { BrowserRouter, Route, Routes } from 'react-router'

import { AuthProvider } from '@/contexts'

import {
  DashboardLayout,
  FormsLayout,
  ProtectedRoute,
  PublicRoute,
  RootLayout,
} from '@/layouts'
import { Overview, Tasks, Categories } from '@/pages/routes'
import { Login, Register } from '@/pages/auth'
import { ErrorPage } from '@/pages/error'

export default function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<RootLayout />}>
            {/* protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route index element={<Overview />} />
                <Route path='tasks' element={<Tasks />} />
                <Route path='categories' element={<Categories />} />
              </Route>
            </Route>

            {/* public routes*/}
            <Route element={<PublicRoute />}>
              <Route element={<FormsLayout />}>
                <Route index path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
              </Route>
            </Route>

            <Route path='*' element={<ErrorPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
