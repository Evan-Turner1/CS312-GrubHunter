import Head from "next/head";
import type { GetStaticProps } from "next";
import LocationsList from "@/components/locations-list";
import { findAllLocations } from "@/mongoose/locations/services";
import { Location } from "@/mongoose/locations/schema";

interface Props {
  locations: string;
}

const HomePage = ({ locations }: Props) => {
  const parsedLocations: Location[] = JSON.parse(locations);
  const pageTitle = "All Locations";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="List of all locations" />
      </Head>

      <div style={{ width: "100%" }}> 
        <h1 style ={{ marginBottom: "1.5rem" }}>{pageTitle}</h1>
        <LocationsList locations={parsedLocations} />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const locations = await findAllLocations();

  return {
    props: {
      locations: JSON.stringify(locations),
    },
  };
};

export default HomePage;