import { useEffect, useState } from "react";
import { Donor } from "@zm-blood-components/common";
import * as CoordinatorFunctions from "../../firebase/CoordinatorFunctions";
import SearchDonorsScreen from "./SearchDonorsScreen";

export default function SearchDonorsScreenContainer() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    CoordinatorFunctions.getAllDonors().then((res) => {
      setDonors(res);
      setIsLoading(false);
    });
  }, []);

  return <SearchDonorsScreen donors={donors} isLoading={isLoading} />;
}
