import Head from "next/head";
import type { GetServerSideProps } from "next";
import LocationDetails from "@/components/location-details";
import { findLocationById } from "@/mongoose/locations/services";
import { Location } from "@/mongoose/locations/schema";

interface Props {
  location: string;
}

const LocationPage = ({ location }: Props) => {
  const parsedLocation: Location = JSON.parse(location);
  const pageTitle = parsedLocation.name;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`Details for ${parsedLocation.name}`} />
      </Head>

      <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "1.5rem" }}>{parsedLocation.name}</h1>
        <LocationDetails location={parsedLocation} />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const locationId = context.params?.locationId;

  if (!locationId || typeof locationId !== "string") {
    return {
      notFound: true,
    };
  }

  try {
    const location = await findLocationById({ id: locationId });

    if (!location) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        location: JSON.stringify(location),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};

export default LocationPage;