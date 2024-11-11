'use client'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react'
import Modal from './Modal';
import Heading from '../navbar/Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Buttons from '../navbar/Buttons';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signIn } from 'next-auth/react';
import  { useRouter } from 'next/navigation';
import useRegisterModal from '@/app/hooks/useRegisterModal';
const LoginModal = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn('credentials', {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false);
            if (callback?.ok) {
                toast.success('Logged in successfully');
                loginModal.onClose();
                router.refresh();
            }
            if (callback?.error) {
                toast.error(callback.error);
            }
        }).finally(() => {
            setIsLoading(false);
        })
    }
const openRegister= ()=>
{
    loginModal.onClose();
    registerModal.onOpen();
}
    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome again' subtitle='Login to your account!' />
            <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required />
            <Input id='password' label='Password' disabled={isLoading} register={register} errors={errors} required />

        </div>
    )
    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Buttons outline label='Continue with Google' Icon={FcGoogle}  onClick={() => {
          signIn("google");
        }} />
            <Buttons outline label='Continue with Github' Icon={AiFillGithub} onClick={() => { signIn("github")}} />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div>Don't have an account?</div>
                    <div onClick={()=>{ openRegister()}} className='text-neutral-800 cursor-pointer hover:underline'>Sign up</div>
                </div>
            </div>
        </div>
    )
    return (

        <>
            <Modal
                disabled={isLoading}
                isOpen={loginModal.isOpen}
                title='Sign In'
                actionLabel='Continue'
                onClose={loginModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
                body={bodyContent}
                footer={footerContent} />
        </>
    )
}

export default LoginModal;
