'use client'
import React, { useMemo, useState } from 'react'
import Modal from './Modal'
import useRentModal from '@/app/hooks/useRentModal';
import Heading from '../navbar/Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../CategoryInput';
import { FieldValues, useForm } from 'react-hook-form';
import CountrySelect from '../inputs/CountrySelect';
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('../Map'), { 
    ssr: false,
    loading: () => <div className="h-[35vh] rounded-lg bg-neutral-200" />
});

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}
const RentModal = () => {
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        },
    });
    const category = watch('category');
    const location = watch('location');
    const onBack = () => {
        setStep((value) => value - 1);
    }
    const onNext = () => {
        setStep((value) => value + 1);
    }
    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create';
        }
        return 'Next';
    }, [step]);
    const secondaryActionLabel: string | undefined = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return 'Back';
    }, [step]);
const setCustomValue = (id:string,value:any)=>{
    setValue(id,value,{
        shouldDirty:true,
        shouldTouch:true,
        shouldValidate:true
    })
}

    let bodyContent = (
        <>
                <div className='flex flex-col gap-8'>
            <Heading
                title='Which of these best describes your place?'
                subtitle='Pick a category'
            />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
                {categories.map((item)=>(
                    <div key={item.label} className='col-span-1'>
                        <CategoryInput
                        icon={item.icon}
                        label={item.label}
                        onClick={(category)=>setCustomValue('category',category)}
                        selected={category===item.label}
                        />
                    </div>
                ))}
            </div>
        </div>
       </>
    )
    if(step===STEPS.LOCATION)
        {
            bodyContent = (<>
            <div className='flex flex-col gap-8'>
                <Heading
                title='Where is your place located?'
                subtitle='Help guests find you!'
            />
            <CountrySelect
            value={location}
            onChange={(value)=>setCustomValue('location',value)}
            />
             <Map center={location?.latlng} />
            </div>
            </>)
        }
    const footerContent = (
        <div className='flex flex-col gap-2'>
            <hr />
        </div>
    )
    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={onNext}
            title='Airbnb your home!'
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent} footer={footerContent} />
    )
}

export default RentModal