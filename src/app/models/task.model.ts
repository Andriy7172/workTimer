export class Task {
  constructor(
    public taskNumber: number,
    public title: string,
    public description: string,
    public startTime: number,
    public duration: number
  ) {}
}
