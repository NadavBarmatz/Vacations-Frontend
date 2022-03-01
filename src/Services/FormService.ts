import { SyntheticEvent } from 'react';
class FormService {

    public dateTimeMinValue = (new Date().toISOString().split(".")[0]).substring(0, 16);

    public handleEndTimeValidation(e: SyntheticEvent, setState: Function): void {
        const time = (e.target as HTMLInputElement).value;
        setState(time);
    }

    public handleSelectChange(e: SyntheticEvent, setState: Function): void {
        const optionElement = e.target as HTMLOptionElement;
        setState(parseInt(optionElement.value));
    }

}

const formService = new FormService();

export default formService;