export class Tutoring {
  id: number;
  title: string;
  description: string;
  price: number;
  times: { dayOfWeek: number, availableHours: string[] }[];
  image: string;
  whatTheyWillLearn: string;
  tutorId: number;
  courseId: number;

  constructor(tutoring: {
    id?: number,
    title?: string,
    description?: string,
    price?: number,
    times?: { dayOfWeek: number, availableHours: string[] }[],
    image?: string,
    whatTheyWillLearn?: string,
    tutorId?: number,
    courseId?: number
  }) {
    this.id = tutoring.id || 0;
    this.title = (tutoring.title || '').trim();
    this.description = (tutoring.description || '').trim();
    this.price = tutoring.price || 0;
    this.times = (tutoring.times || []).map(day => ({
      dayOfWeek: day.dayOfWeek,
      availableHours: day.availableHours || [],
    }));
    this.image = tutoring.image || '';
    this.whatTheyWillLearn = (tutoring.whatTheyWillLearn || '').trim();
    this.tutorId = tutoring.tutorId || 0;
    this.courseId = tutoring.courseId || 0;
  }
}
