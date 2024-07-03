import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getListings, { IListingsParams } from "@/app/actions/getListings";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);

  return (
    <ClientOnly>
      {listings.length === 0 ? (
        <EmptyState showReset />
      ) : (
        <Container>
          <div
            className="
              pt-40
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4
              xl:grid-cols-5
              2xl:grid-cols-6
              gap-8
            "
          >
            {listings.map((listing: any) => (
              <ListingCard key={listing.id} data={listing} />
            ))}
          </div>
        </Container>
      )}
    </ClientOnly>
  );
};

// Extracting the searchParams from URL
export async function generateMetadata({
  searchParams,
}: {
  searchParams: IListingsParams;
}) {
  return {
    title: "HomieStay",
    description: "Rent whatever you like!",
  };
}

export default Home;
