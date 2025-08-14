import React, { useState } from 'react'
import { login, register } from '../api/api'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    try {
      if(isLogin){
        const res = await login(email, pass)
        localStorage.setItem('token', res.token)
      } else {
        await register(name, email, pass)
        const res = await login(email, pass)
        localStorage.setItem('token', res.token)
      }
      navigate('/')
    } catch {
      alert('Error. Check details.')
    }
  }

  return (
    <div className="max-w-md mx-auto card">
      <h2 className="text-xl mb-4">{isLogin ? 'Login' : 'Create Account'}</h2>
      <form onSubmit={submit} className="flex flex-col gap-3">
        {!isLogin && <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="p-3 rounded" />}
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="p-3 rounded" />
        <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" className="p-3 rounded" />
        <button className="btn-accent">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <button onClick={()=>setIsLogin(v=>!v)} className="mt-3 underline">
        {isLogin ? 'New here? Create account' : 'Have an account? Login'}
      </button>
    </div>
  )
}
