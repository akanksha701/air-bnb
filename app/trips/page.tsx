'use server'
import EmptyState from '../components/navbar/EmptyState';
import { getReservations } from '../actions/getReservations';
import getCurrentUser from '../actions/getCurrentUser';
import TripsClient from './TripsClient';

export async function TripsPage() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return <>
            <EmptyState
                title='Unauthorized'
                subtitle='Please login'
            />
        </>
    }
    const reservations = await getReservations({
        userId: currentUser?.id
    });
    if (reservations.length === 0) {
        return (
            <>
                <EmptyState
                    title='No trips found'
                    subtitle='Looks like you havent reserved any trips.'
                />
            </>
        )
    }
    return (
        <>
            <TripsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </>
    )
}

export default TripsPage;