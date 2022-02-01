import { SyntheticEvent, useEffect, useState } from "react";
import VacationModel from "../../../../Models/VacationModel";
import carouselService from "../../../../Services/CarouselService";
import config from "../../../../Utils/Config";
import CarouselSlider from "../CarouselSlider/CarouselSlider";
import "./Carousel.css";

interface CarouselProps {
    vacations: VacationModel[];
}

function Carousel(props: CarouselProps): JSX.Element {

    const slides = props.vacations.map(v => v.vacationId);

    const [vacationNum, setVacationNum] = useState<number>(slides[0]);

    const firstCard = vacationNum - 1;
    const secondCard = vacationNum % slides.length;
    const thirdCard = ((vacationNum + 1) % slides.length);
    
    const nextSlide = (e: SyntheticEvent) => {carouselService.setNextSlides(e, slides, vacationNum, setVacationNum)}



    return (
        <div className="Carousel">
                <CarouselSlider vacation={props.vacations[firstCard]} />
                <CarouselSlider vacation={props.vacations[secondCard]} />
                <CarouselSlider vacation={props.vacations[thirdCard]} />
			<a className="Prev" onClick={nextSlide}>&#10094;</a>
            <a className="Next" onClick={nextSlide}>&#10095;</a>
        </div>
    );
}

export default Carousel;
