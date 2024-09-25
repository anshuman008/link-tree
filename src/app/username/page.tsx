'use client'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { AddUserName, findUser } from '../ServerActions/Links'
import { useRouter } from 'next/navigation'


export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const session = useSession();
  const getUser = async() =>{
    if(session){
      const res = await findUser(session.data?.user?.email || "");
      
      if(res?.status === 400){
        router.push('/dashboard')
      }
     }
  }
  
  useEffect(() => {
      getUser();
  },[session])


  const AddUser = async () => {
    const res = await AddUserName(session.data?.user?.email || "", username);

    if (res.status === 400) {
      setError('usernam is already exist!!')
    }


    if (res.status === 200) {
      router.push('/dashboard');
    }


    console.log(res);
  }


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    AddUser()
    // console.log('Username submitted:', username)
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-1 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              here is session  "-{'>'}"
              <span className="text-green-500 ml-1">*</span>
            </h1>
          </div>
          <div className="mt-10">
            <h2 className="text-3xl font-extrabold text-gray-900">Welcome to Linktree!</h2>
            <p className="mt-2 text-sm text-gray-600">
              Choose your Linktree username. You can always change it later.
            </p>
          </div>
          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">linktr.ee/</span>
                  </div>
                  <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-20 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              <div>
                <Button type="submit" className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300">
                  Continue
                </Button>
              </div>
            </form>

            {
              error && <div className="mt-4 text-center text-xs font-bold text-red-500">
                {error}
              </div>
            }
            <div className="mt-4 text-center text-xs text-gray-500">
              By continuing, you agree to receive offers, news and updates from Linktree
            </div>
            <div className="mt-6 text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-green-600 hover:text-green-500">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}