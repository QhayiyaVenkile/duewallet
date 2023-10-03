// rrd imports
import { Form, NavLink } from "react-router-dom"

// library imports
import { TrashIcon } from '@heroicons/react/24/solid'

// assets
import logo from "../assets/logo-(no-bg).png"

const Nav = ({ users }) => {
  return (
    <nav>
        {/* nav link logo leads to homepage */}
        <NavLink
        to="/"
        aria-label="Home"
        >
        <img src={logo} alt="" height={30} />
        <span>DueWallet</span>
        </NavLink>
        {
            users && users.length > 0 && (
                <Form
                method="post"
                action="/logout"
                onSubmit={(event) => {
                    if (!confirm("Delete your account and all its data?")) {
                        event.preventDefault()
                    }
                }}
                >
                    <button type="submit" className="btn btn--warning">
                        <span>Delete Account</span>
                            <TrashIcon width={20} />
                    </button>
                </Form>
            )
        }
    </nav>
  )
}

export default Nav