import "./ResponsiveCarousel.css";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import { useEffect, useState } from "react";
import VacationModel from "../../../../Models/VacationModel";
import vacationsService from "../../../../Services/VacationsService";
import CarouselItem from "../CarouselItem/CarouselItem";
import config from "../../../../Utils/Config";
import Loading from "../../../SharedArea/Loading/Loading";
import { vacationsStore } from "../../../../Redux/Store";
import { Unsubscribe } from "redux";

function ResponsiveCarousel(): JSX.Element {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
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

  useEffect((async () => {

    let vacations = vacationsStore.getState().vacations;
    if(!vacations){
      vacations = await vacationsService.getAllVacations();
    }
    const bestVacations = vacations?.filter(v => v.price <= 150)
    const vacationsIdArr = bestVacations?.map(v => v.vacationId);
    setVacationsId(vacationsIdArr);

    unSub = vacationsStore.subscribe(() => {
      vacations = vacationsStore.getState().vacations;
      const bestVacations = vacations.filter(v => v.price <= 150)
      const vacationsIdArr = bestVacations.map(v => v.vacationId);
      setVacationsId(vacationsIdArr);
    })

    return () => {unSub();}
  }) as any, [])
    
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
