'use client'
import Container from '@/app/components/Container';
import { categories } from '@/app/components/navbar/Categories';
import { SafeListing, SafeUser, SafeReservation } from '@/app/types';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ListingHead from './ListingHead';
import ListingInfo from './ListingInfo';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval, endOfDay, set, startOfDay } from 'date-fns';
import axios from 'axios';
import toast from 'react-hot-toast';
import ListingReservation from './ListingReservation';
import { DateRange } from 'react-date-range';
const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
};
interface ListingClientProps {
    listing: SafeListing & {
        user: SafeUser;
    };
    currentUser?: SafeUser | null;
    reservations?: SafeReservation[];
}

const ListingClient = ({ listing, currentUser, reservations }: ListingClientProps) => {
    const loginModal = useLoginModal();
    const router = useRouter();
    const disabledDates = useMemo(() => {
        let dates: Date[] = [];
        reservations?.forEach((reservation: any) => {
            console.log(reservation,"reservation")
            const range = eachDayOfInterval({
                start: startOfDay(reservation.startDate),
                end: endOfDay(reservation.endDate),
            });
            dates = [...dates, ...range];
        });
        console.log(dates,"dates")
        return dates;
    }, [reservations]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<any>(initialDateRange);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }
        setIsLoading(true);
        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id,
        }).then(() => {
            toast.success('Listing reserved!');
            setDateRange(initialDateRange);
            router.refresh();
        }).catch(() => {
            toast.error('Something went wrong.');
        }).finally(() => setIsLoading(false));
    }, [currentUser, loginModal, totalPrice, dateRange, listing?.id, router]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);
            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [DateRange, listing.price]);
    const category: any = useMemo(() => {
        return categories.find((item) => item.label === listing.category);
    }, [listing.category]);

console.log(disabledDates,"listing")
    return (
        <Container>
                <div className='max-w-screen-lg mx-auto'>
                    <div className='flex flex-col gap-6'>
                        <ListingHead
                            title={listing.title}
                            imageSrc={listing.imageSrc}
                            locationValue={listing.locationValue}
                            id={listing.id}
                            currentUser={currentUser}
                        />
                       <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description || ''}
                            listingCategory={listing.category}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        />
                        <div className='order-first mb-10 md:order-last md:col-span-3'> 
                            <ListingReservation
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value as Range)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
                       </div>
                    </div>
                </div>
        </Container>
    )
}

export default ListingClient