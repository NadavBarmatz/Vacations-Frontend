class VacationModel {
	public vacationId: number;
    public destinationId: number;
    public city: string;
    public country: string;
    public description: string;
    public start: string;
    public end: string;
    public price: number;
    public likes: number;
    public imageName: string;
    public image: FileList;
}

export default VacationModel;
