'use client'
import useSearchModal from '@/app/hooks/useSearchModal';
import Modal from './Modal';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import Heading from '../navbar/Heading';
import CountrySelect from '../inputs/CountrySelect';
import Calendar from '../inputs/Calendar';
import { Range } from 'react-date-range';
import dynamic from 'next/dynamic';
import qs from 'query-string';
import { CountrySelectValue } from '../inputs/CountrySelect';
import { formatISO } from 'date-fns';
import Counter from '../inputs/Counter';
interface SearchModalProps {
    isOpen?: boolean;
    onClose?: () => void;

}

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
}

const SearchModal: React.FC<SearchModalProps> = () => {
    const router = useRouter();
    const params = useSearchParams();
    const [location, setLocation] = useState<CountrySelectValue>();
    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState<number>(1);
    const [roomCount, setRoomCount] = useState<number>(1);
    const [bathroomCount, setBathroomCount] = useState<number>(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const searchModal = useSearchModal();
    const Map = useMemo(() => dynamic(() => import('../Map'), { ssr: false }), [location]);
    const onNext = () => setStep((value) => value + 1);
    const onSubmit = async () => {
        if (step !==STEPS.INFO) {
            return onNext();
        }
        let currentQuery = {};
        if (params) {
            currentQuery = qs.parse(params.toString());
        }
        const updatedQuery:any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount,
        }
        if (dateRange?.startDate ) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }
        if (dateRange?.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }
        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery,
        }, { skipNull: true });
        console.log(url);
        setStep(STEPS.LOCATION);
        searchModal.onClose();
        router.push(url);
    }

    const actionLabel = step === STEPS.INFO ? 'Search' : 'Next';

    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading
                title='Where do you want to go?'
                subtitle='Find the perfect location!'
            />
            <CountrySelect
                value={location as CountrySelectValue}
                onChange={(value) => setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    )
    if (step === STEPS.DATE) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='When do you want to go?'
                    subtitle='Make sure everyone is free!'
                />
                <Calendar
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />

            </div>
        )
    }
    if (step === STEPS.INFO) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title="More information"
                    subtitle="Find your perfect place!"
                />
                <Counter 
                    title="Guests"
                    subtitle="How many guests are coming?"
                    value={guestCount}
                    onChange={(value) => setGuestCount(value)}
                />
                <Counter 
                    title="Rooms"
                    subtitle="How many rooms do you need?"
                    value={roomCount}
                    onChange={(value) => setRoomCount(value)}
                />
                <Counter 
                    title="Bathrooms"
                    subtitle="How many bathrooms do you need?"
                    value={bathroomCount}
                    onChange={(value) => setBathroomCount(value)}
                />
            </div>
        )
    }
    const footerContent = (
        <div className='flex flex-col gap-4'>
            <hr />
        </div>
    )
    return (
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            title='Filters'
            actionLabel={actionLabel}
            onSubmit={onSubmit}
            body={bodyContent} 
            footer={footerContent} />
    )
}

export default SearchModal;
