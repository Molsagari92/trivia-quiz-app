export class Category{
  id: number;
  title: string;
  cluesCount: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: number, title: string, cluesCount:number, createdAt:string, updatedAt:string) {
    this.id=id;
    this.title=title;
    this.cluesCount=cluesCount;
    this.createdAt=new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }
}
