import { SyntheticEvent } from "react";

class CarouselService {

    public setNextSlides(e: SyntheticEvent, slides:number[], vacationNum:number, setVacationNum: Function ) {
            let num = 0;
            const currentIndex = slides.indexOf(vacationNum);
    
            if((e.target as any).classList.value === "Prev") {
                if(vacationNum === slides[0]){
                    setVacationNum(slides[slides.length - 1]);
                    return;
                }
    
                num = -1;
            }
            if((e.target as any).classList.value === "Next"){
                if(vacationNum === slides[slides.length - 1]){
                    setVacationNum(slides[0]);
                    return;
                }
    
                num = 1;
            } 
    
            const nextSlide = slides[currentIndex + num];
            // console.log(nextSlide);
            setVacationNum(nextSlide);
        }
}

const carouselService = new CarouselService();

export default carouselService;