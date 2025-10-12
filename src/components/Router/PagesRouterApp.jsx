import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomeApp } from "../Pages";
import PacketDecoderApp from "../Pages/PacketsApp";


export const PagesRouterApp = () => {
  return (
    <>
        <Routes>
          <Route path='home' element={<HomeApp />} />
          <Route path='/packets' element={<PacketDecoderApp />} />
          <Route path='/*' element={<HomeApp />} />


        </Routes>
    </>
  )
}
