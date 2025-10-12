import { Route, Routes } from "react-router-dom"
import { NavBarApp } from "../Shared"
import { PagesRouterApp } from "../components/Router"


export const RouterApp = () => {
  return (
    <>
        <NavBarApp />
        <Routes>
            <Route path='/*' element={<PagesRouterApp />} />
        </Routes>
    </>
  )
}
