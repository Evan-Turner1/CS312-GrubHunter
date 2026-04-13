import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import dbConnect from "@/middleware/db";
import LocationModel from "@/mongoose/locations/model";
import LocationsList from "@/components/locations-list";

type PageProps = {
  userId: string;
  locations: string;
};

export default function WishListPage({
  userId,
  locations,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession();

  const parsedLocations = JSON.parse(locations || "[]");
  const currentUserId = session?.user?.fdlst_private_userId;
  const isOwnList = currentUserId === userId;

  const title = isOwnList ? "Your Wish List" : "Wish List";

  return (
    <>
      <Head>
        <title>{title} | GrubHunter</title>
      </Head>

      <section className="layout-grid">
        <h1>{title}</h1>

        {parsedLocations.length === 0 ? (
          <p style={{ marginTop: "1rem"}}>
            {isOwnList
              ? "Your wish list is currently empty."
              : "This wish list is currently empty."}
          </p>
        ) : (
          <LocationsList locations={parsedLocations} />
        )}
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  const userId = String(context.query.userId || "");

  try {
    await dbConnect();

    const locations = await LocationModel.find({
      on_wishlist: userId,
    }).lean();

    return {
      props: {
        userId,
        locations: JSON.stringify(locations ?? []),
      },
    };
  } catch (error) {
    return {
      props: {
        userId,
        locations: JSON.stringify([]),
      },
    };
  }
};