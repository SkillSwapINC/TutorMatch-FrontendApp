export class Course {
  id: number;
  name: string;
  description: string;
  cycle: number;

  constructor(course: {id?: number, name?: string, description?: string, cycle?: number}) {
    this.id = course.id || 0;
    this.name = course.name || '';
    this.description = course.description || '';
    this.cycle = course.cycle || 0;
  }
}
