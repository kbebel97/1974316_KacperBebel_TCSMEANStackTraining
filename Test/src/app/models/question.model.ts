export class question { // this class is use to map json data.

  constructor(public id:number , public question : string , public text : Array<string>, public choices : Array<string>, public answer: number){}

}
