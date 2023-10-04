// react imports
import { useEffect, useRef, useState } from "react";

// rrd imports
import { Form, useFetcher } from "react-router-dom"

// illustrations
import illustration from "../assets/person saving money.png"

// library imports
import { UserPlusIcon } from "@heroicons/react/24/solid"

// http client imports
import axios from "axios";

const Intro = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")
    

// write to table users
    // function handleSubmit(event) {
    //     event.preventDefault();
    //     axios.post("http://localhost:8081/users", {userName, email, password})
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err));
    // }


    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting"

    const formRef = useRef();

    // clears text in field
    useEffect(() => {
        if(!isSubmitting){
            formRef.current.reset()
        }
    }, [isSubmitting])

  return (
    <div className="intro">
        <div>
            <h1>
                Take Control of <span className="accent">Your Future</span>
            </h1>
            <p>Seize control of your future and embark on the path to financial freedom. Get started today.</p>
            <Form
            method="post"
            ref={formRef}
            // onSubmit={handleSubmit}
            >
                {/* input field */}
                <input
                    type="text"
                    name="userName"
                    placeholder="What is your name?"
                    aria-label="Your Name"
                    autoComplete="given-name"
                    required
                    onChange={e => setUserName(e.target.value)}
                />
                <input
                    type="email"
                    name="newEmail"
                    placeholder="Enter a valid email address"
                    aria-label="Your Email"
                    autoComplete="given-email"
                    required
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    name="newPassword"
                    placeholder="Enter a password"
                    aria-label="Your Password"
                    autoComplete="given-password"
                    required
                    onChange={e => setPassword(e.target.value)}
                />
                <input type="hidden" name="_action" value="newUser"/>
                <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                    {
                        // disable button
                        isSubmitting ? <span>Creating account...</span> : (
                            <>
                                <span>Create Account</span>
                                <UserPlusIcon width={20}/>
                            </>
                        )
                    }
                </button>
            </Form>
        </div>
        <img src={illustration} alt="Person saving money" width={600}/>
    </div>
  )
}

export default Intro