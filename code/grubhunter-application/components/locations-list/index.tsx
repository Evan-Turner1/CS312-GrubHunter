import styles from "./index.module.css";
import LocationsListItem from "../locations-list-item";
import { Location } from "@/mongoose/locations/schema";

interface Props {
  locations: Location[];
}

const LocationsList = ({ locations }: Props) => {
  return (
    <ul className={styles.root}>
      {locations.map((location) => (
        <LocationsListItem
          key={location.location_id}
          location={location}
        />
      ))}
    </ul>
  );
};

export default LocationsList;