'use client'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react'
import axios from 'axios';
import Modal from './Modal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Heading from '../navbar/Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';

const RegisterModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const registerModal = useRegisterModal();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/register', data).then(() => {
            // toast.success('Account created successfully');
        }).catch((error) => {
            toast.error('Something went wrong');
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome to Airbnb' subtitle='Create an account!' />
            <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required />
            <Input id='name' label='Name' disabled={isLoading} register={register} errors={errors} required />
            <Input id='password' label='Password' disabled={isLoading} register={register} errors={errors} required />

        </div>
    )
    const footerContent = (
        <div className='flex flex-col gap-4'>
        </div>
    )
    return (

        <>
            <Modal
                disabled={isLoading}
                isOpen={registerModal.isOpen}
                title='Sign In'
                actionLabel='Continue'
                onClose={registerModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
                body={bodyContent}
                footer={footerContent} />
        </>
    )
}

export default RegisterModal;