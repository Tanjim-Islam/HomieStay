"use client";

import { useEffect, useState } from "react";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";
import LoadingSkeleton from "@/app/components/LoadingSkeleton";

interface ListingsPageProps {
  initialListings: any[];
}

const ListingsPage: React.FC<ListingsPageProps> = ({ initialListings }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    setListings(initialListings);
    setIsLoading(false);
  }, [initialListings]);

  if (isLoading) {
    return (
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
          {Array.from({ length: 6 }).map((_, index) => (
            <LoadingSkeleton key={index} />
          ))}
        </div>
      </Container>
    );
  }

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
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
        {listings.map((listing) => (
          <ListingCard key={listing.id} data={listing} />
        ))}
      </div>
    </Container>
  );
};

export default ListingsPage;
