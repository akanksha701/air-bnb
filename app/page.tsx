import { Nunito } from "next/font/google";
import Container from "./components/Container";
import EmptyState from "./components/navbar/EmptyState";
import getListings from "./actions/getListings";
import ListingCard from "./components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";
import { IListingsParams } from "./actions/getListings";

interface HomeProps {
  searchParams: IListingsParams;
}

export default async function Home({ searchParams }: HomeProps) {
    const currentUser = await getCurrentUser();
    const listings = await getListings(searchParams);
 

    if (listings.length === 0) {
      return <EmptyState showReset />;
    }
    return (
      <>
        <Container>
          <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {listings.map((listing) => {
              return <ListingCard
                key={listing.id}
                data={listing}
                currentUser={currentUser}
              />
            })}
          </div>
        </Container>
      </>
    );
  }
