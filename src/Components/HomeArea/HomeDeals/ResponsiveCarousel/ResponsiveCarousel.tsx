import "./ResponsiveCarousel.css";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import { useEffect, useState } from "react";
import vacationsService from "../../../../Services/VacationsService";
import CarouselItem from "../CarouselItem/CarouselItem";
import Loading from "../../../SharedArea/Loading/Loading";
import { vacationsStore } from "../../../../Redux/Store";
import { Unsubscribe } from "redux";
import VacationModel from "../../../../Models/VacationModel";

function ResponsiveCarousel(): JSX.Element {

  // In use for the carousel library:
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const [vacationsId, setVacationsId] = useState<number[]>([]);

  let unSub: Unsubscribe;
  let vacations: VacationModel[];

  useEffect(() => {

    (async()=>{
      // check for vacations in redux:
      vacations = vacationsStore.getState().vacations;
      // If not in redux:
      if (!vacations) {
        vacations = await vacationsService.getAllVacations();
      }
      // Filter vacations by price <= 115: 
      const bestVacations = vacations?.filter(v => v.price <= 115);

      // Map destination id after filtering to new array to send to carousel items:
      const vacationsIdArr = bestVacations?.map(v => v.vacationId);
      setVacationsId(vacationsIdArr);

    })();

    // Listen to changes to update GUI
    unSub = vacationsStore.subscribe(() => {
      vacations = vacationsStore.getState().vacations;
      const bestVacations = vacations?.filter(v => v.price <= 115);
      const vacationsIdArr = bestVacations?.map(v => v.vacationId);
      setVacationsId(vacationsIdArr);
    });

    return () => { unSub(); }
  }, [])

  return (
    <div className="ResponsiveCarousel">
      {
        vacationsId?.length === 0 && <Loading />
        ||
        <Carousel infinite={true} responsive={responsive}>
          {vacationsId?.map(v => <div key={v}>
            <CarouselItem vacationId={v} />
          </div>)}
        </Carousel>
      }
    </div>
  );
}

export default ResponsiveCarousel;
