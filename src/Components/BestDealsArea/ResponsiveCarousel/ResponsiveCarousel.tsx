import "./ResponsiveCarousel.css";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import CarouselItem from "../CarouselItem/CarouselItem";
import config from "../../../Utils/Config";
import Loading from "../../SharedArea/Loading/Loading";

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

  const [vacations, setVacations] = useState<VacationModel[]>([]);

  useEffect((async () => {
    try{
      const vacations = await vacationsService.getAllVacations();
      setVacations(vacations);
    }
    catch(err: any) {
      alert(err.message);
    }
  }) as any, [])
    
  return (
    <div className="ResponsiveCarousel">
      {
        vacations.length === 0 && <Loading />
          ||
        <Carousel infinite={true} responsive={responsive}>
          {vacations.map(v => <div key={v.vacationId}>
            <CarouselItem vacation={v} />
          </div>)}
        </Carousel>
      }
    </div>
  );
}

export default ResponsiveCarousel;
