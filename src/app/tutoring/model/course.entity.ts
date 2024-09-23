export class Course {
  id: number;
  name: string;
  description: string;
  cycle: string;

  constructor(course: {id?: number, name?: string, description?: string, cycle?: string}) {
    this.id = course.id || 0;
    this.name = course.name || '';
    this.description = course.description || '';
    this.cycle = course.cycle || '';
  }
}
