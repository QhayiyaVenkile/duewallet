//rrd imports
import { Outlet, useLoaderData } from "react-router-dom";

// components
import Nav from "../components/Nav";

// helper functions
import { fetchData } from "../helpers"

// loader
export function mainLoader(){
    const users = fetchData("users");
    return { users };
}

const Main = () => {
    const { users } = useLoaderData()

  return (
    <div className="layout">
        <Nav users={users} />
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default Main