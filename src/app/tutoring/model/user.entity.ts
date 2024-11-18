export class User {
  id: number;
  fullName: string;
  email: string;
  password: string;
  avatarUrl: string;
  gender: string;
  semester: number;
  roleType: string;
  tutorId: number | null;

  constructor(data: any) {
    this.id = data.id;
    this.fullName = data.fullName;
    this.email = data.email;
    this.password = data.password;
    this.avatarUrl = data.avatarUrl;
    this.gender = data.gender;
    this.semester = data.semester;
    this.roleType = data.roleType;
    this.tutorId = data.tutorId;
  }
}
