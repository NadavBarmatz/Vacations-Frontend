import "./ResponsiveNameCarousel.css";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import { useEffect, useState } from "react";
import Loading from "../../../SharedArea/Loading/Loading";
import CarouselNameItem from "../CarouselNameItem/CarouselNameItem";
import notificationService from "../../../../Services/NotificationService";
import DestinationModel from "../../../../Models/DestinationModel";
import destinationsService from "../../../../Services/DestinationsService";

function ResponsiveNameCarousel(): JSX.Element {

  // In use for the carousel library:
  const responsive = {
    superLargeDesktop: {
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

  const [destinations, setDestinations] = useState<DestinationModel[]>([]);

  useEffect((async () => {
    try {
      const destinations = await destinationsService.getAllDestinations();
      setDestinations(destinations);
    }
    catch (err: any) {
      notificationService.error(err);
    }
  }) as any, [])

  return (
    <div className="ResponsiveNameCarousel">
      {
        destinations.length === 0 && <Loading />
        ||
        <Carousel infinite={true} responsive={responsive}>
          {destinations.map(d => <div key={d.destinationId}>
            <CarouselNameItem destination={d} />
          </div>)}
        </Carousel>
      }
    </div>
  );
}

export default ResponsiveNameCarousel;
