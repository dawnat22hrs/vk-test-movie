import { RouterProvider } from "react-router-dom"
import { router } from "./router/router"

export const App = () => {

  return (
    <>
      <main>
        <RouterProvider router={router} />
      </main>
    </>
  )
}

