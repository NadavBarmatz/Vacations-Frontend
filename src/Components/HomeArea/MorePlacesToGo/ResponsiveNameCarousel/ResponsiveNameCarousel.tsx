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
import DestinationModel from "../../../../Models/DestinationModel";
import destinationsService from "../../../../Services/DestinationsService";

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

  const [vacations, setVacations] = useState<DestinationModel[]>([]);

  useEffect((async () => {
    try{
        const vacations = await destinationsService.getAllDestinations();
        setVacations(vacations);
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
          {vacations.map(v => <div key={v.destinationId}>
            <CarouselNameItem vacation={v} />
          </div>)}
        </Carousel>
      }
    </div>
  );
}

export default ResponsiveNameCarousel;
