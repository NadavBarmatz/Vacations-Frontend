import "./ResponsiveNameCarousel.css";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import { useEffect, useState } from "react";
import VacationModel from "../../../../Models/VacationModel";
import vacationsService from "../../../../Services/VacationsService";
import config from "../../../../Utils/Config";
import Loading from "../../../SharedArea/Loading/Loading";
import { vacationsStore } from "../../../../Redux/Store";
import CarouselNameItem from "../CarouselNameItem/CarouselNameItem";
import notificationService from "../../../../Services/NotificationService";

function ResponsiveNameCarousel(): JSX.Element {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
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

  const [vacations, setVacations] = useState<VacationModel[]>([]);

  useEffect((async () => {
    try{
      const vacationsFromRedux = vacationsStore.getState().vacations;
      if(!vacationsFromRedux){
        const vacations = await vacationsService.getAllVacations();
        setVacations(vacations);
      }
      else{
        setVacations(vacationsFromRedux);
      }
    }
    catch(err: any) {
      notificationService.error(err);
    }
  }) as any, [])
    
  return (
    <div className="ResponsiveNameCarousel">
      {
        vacations.length === 0 && <Loading />
          ||
        <Carousel infinite={true} responsive={responsive}>
          {vacations.map(v => <div key={v.vacationId}>
            <CarouselNameItem vacation={v} />
          </div>)}
        </Carousel>
      }
    </div>
  );
}

export default ResponsiveNameCarousel;
