export class Tutor {
  id: number;
  name: string;
  surename: string;
  email: string;
  password: string;
  avatar: string;
  gender: string;
  cycle: string;


  constructor(tutor: {id?: number, name?: string, surename?: string, email?: string, password?: string, avatar?: string, gender?: string ,cycle?: string,}) {
    this.id = tutor.id || 0;
    this.name = tutor.name || '';
    this.surename = tutor.surename || '';
    this.email = tutor.email || '';
    this.password = tutor.password || '';
    this.avatar = tutor.avatar || '';
    this.gender = tutor.gender || '';
    this.cycle = tutor.cycle || '';
  }
}
