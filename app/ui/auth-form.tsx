'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../types/supabase'

export default function AuthForm({ isSignup = true }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const supabase = createClientComponentClient<Database>()

    const url = process.env.PUBLIC_UR

    async function signUpNewUser() {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    emailRedirectTo: `${url}/account/`,
                },
            })

        } catch (error) {
            console.log(error)
        }

    }

    async function signInWithEmail() {
        try {

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })

        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div>
            <p>{isSignup === true ? "Signup" : "Signin"}</p>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
            </div>
            {isSignup === true ?
                <div>
                    <button onClick={signUpNewUser}>Sign Up</button>
                </div>
                :
                <div>
                    <button onClick={signInWithEmail}>Signin</button>
                </div>
            }


        </div>
    )
}