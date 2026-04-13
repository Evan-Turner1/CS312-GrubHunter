import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Button from "@/components/button";
import styles from "./index.module.css";
import { Location } from "@/mongoose/locations/schema";

interface Props {
  location?: Location | null;
}

interface WishlistInterface {
  locationId: string;
  userId: string;
}

const LocationDetails = ({ location }: Props) => {
  const { data: session } = useSession();
  const [onWishlist, setOnWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!location) return;

    const userId = session?.user?.fdlst_private_userId;

    setOnWishlist(
      !!userId &&
        Array.isArray(location.on_wishlist) &&
        location.on_wishlist.includes(userId)
    );
  }, [location, session]);

  if (!location) {
    return null;
  }

  const wishlistAction = async ({
    locationId,
    userId,
  }: WishlistInterface) => {
    if (loading) return;

    setLoading(true);

    const query = onWishlist
      ? `
        mutation RemoveWishlist($location_id: String!, $user_id: String!) {
          removeWishlist(location_id: $location_id, user_id: $user_id) {
            _id
            on_wishlist
          }
        }
      `
      : `
        mutation AddWishlist($location_id: String!, $user_id: String!) {
          addWishlist(location_id: $location_id, user_id: $user_id) {
            _id
            on_wishlist
          }
        }
      `;

    try {
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: {
            location_id: locationId,
            user_id: userId,
          },
        }),
      });

      const result = await response.json();

      if (response.ok && !result.errors) {
        setOnWishlist((prev) => !prev);
      }
    } catch (error) {
      console.error("Wishlist update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const userId = session?.user?.fdlst_private_userId;
  const locationId = String(location.location_id);

  return (
    <ul className={styles.root}>
      <li>
        <strong>Address:</strong> {location.address}
      </li>
      <li>
        <strong>Zipcode:</strong> {location.zipcode}
      </li>
      <li>
        <strong>Borough:</strong> {location.borough}
      </li>
      <li>
        <strong>Cuisine:</strong> {location.cuisine}
      </li>
      <li>
        <strong>Grade:</strong> {location.grade}
      </li>

      {userId && (
        <li>
          <Button
            variant={onWishlist ? "outline" : "blue"}
            disabled={loading}
            clickHandler={() =>
              wishlistAction({
                locationId,
                userId,
              })
            }
          >
            {onWishlist
              ? "Remove from your Wishlist"
              : "Add to your Wishlist"}
          </Button>
        </li>
      )}
    </ul>
  );
};

export default LocationDetails;