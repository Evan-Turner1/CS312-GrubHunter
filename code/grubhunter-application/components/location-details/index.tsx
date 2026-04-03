import styles from "./index.module.css";
import { Location } from "@/mongoose/locations/schema";

interface Props {
  location?: Location | null;
}

const LocationDetails = ({ location }: Props) => {
  if (!location) {
    return null;
  }

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
    </ul>
  );
};

export default LocationDetails;