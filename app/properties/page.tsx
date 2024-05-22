// app/properties/page.tsx

import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";

import PropertiesClient from "./PropertiesClient";

interface PropertiesPageProps {
  listings: any[];
  currentUser: any;
}

const PropertiesPage = ({ listings, currentUser }: PropertiesPageProps) => {
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export async function getServerSideProps() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      props: {
        listings: [],
        currentUser: null,
      },
    };
  }

  const listings = await getListings({ userId: currentUser.id });

  return {
    props: {
      listings,
      currentUser,
    },
  };
}

export default PropertiesPage;
