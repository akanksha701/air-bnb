import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import useLoginModal from "./useLoginModal";
import { SafeUser } from "../types";

interface IUseFavourite {
    listingId: string;
    currentUser?: SafeUser | null;
}
export default function useFavourite({ listingId, currentUser }: IUseFavourite) {
    const loginModal = useLoginModal();
    const router = useRouter();
    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoritesIds || [];
        return list.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavorite = useCallback(async (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
        if (!currentUser) {

            return loginModal.onOpen();
        }
        try {
            let request;
            if (hasFavorited) {
                request = () => axios.delete(`/api/favourites/${listingId}`);
            } else {
                request = () => axios.post(`/api/favourites/${listingId}`);
            }
            await request();
            await router.refresh();
            toast.success('Success');
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong');
        }
        router.refresh();

    }, [currentUser, loginModal, hasFavorited, listingId, router]);
    return {
        hasFavorited,
        toggleFavorite,
    }
}