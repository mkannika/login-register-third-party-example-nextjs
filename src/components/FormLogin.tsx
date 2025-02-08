"use client"

import LoginThirdParty from '@/components/LoginThirdParty'
import { TextField } from '@radix-ui/themes'
import Link from 'next/link'
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Checkbox } from './ui/checkbox'

type LoginData = {
    email: string
    password: string
    remember_me: boolean
}

export default function FormLogin() {
    const method = useForm<LoginData>({
        defaultValues: {
            email: '',
            password: '',
            remember_me: false,
        },
    })
    const onSubmit: SubmitHandler<LoginData> = (data) => console.log(data)

    return (
        <FormProvider {...method}>
            <form onSubmit={method.handleSubmit(onSubmit)} className='flex flex-col gap-6'>
                <Controller
                    name="email"
                    control={method.control}
                    rules={{ required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } }}
                    render={({ field }) => (
                        <div className="input-wrapper">
                            <TextField.Root
                                {...field}
                                placeholder="Email"
                                type="email"
                            />
                            {method.formState.errors.email && <p className="text-[#FF8682] text-sm mt-1">{method.formState.errors.email.message}</p>}
                        </div>
                    )}
                />
                <Controller
                    name="password"
                    control={method.control}
                    rules={{ required: 'Password is required', pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, message: 'Invalid password' } }}
                    render={({ field }) => (
                        <div className="input-wrapper">
                            <TextField.Root
                                {...field}
                                placeholder="Password"
                                type="password"
                            />
                            {method.formState.errors.password && <p className="text-[#FF8682] text-sm mt-1">{method.formState.errors.password.message}</p>}
                        </div>
                    )}
                />
                <div className="flex justify-between items-center">
                    <Controller
                        name="remember_me"
                        control={method.control}
                        render={({ field }) => (
                            <label className='flex items-center gap-2 text-[#313131] text-sm font-medium'>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                Remember me
                            </label>
                        )}
                    />
                    <Link className='text-sm font-medium text-[#FF8682] hover:underline' href={'/forgot-password'}>Forgot Password</Link>
                </div>
                <div className="mt-10 flex items-center gap-4 flex-col">
                    <button type="submit" className="hover:opacity-75">Submit</button>
                    <p className="text-sm font-medium">Don’t have an account? <Link href="href" className='text-[#FF8682] hover:underline'>Sign up</Link></p>
                </div>
                <LoginThirdParty />
            </form>
        </FormProvider>
    )
}

