export class Post {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  tutorId: number;
  courseId: number;


  constructor(post: {id?: number, title?: string, description?: string, price?: number, image?: string, tutorId?: number, courseId?: number}) {
    this.id = post.id || 0;
    this.title = post.title || '';
    this.description = post.description || ''
    this.price = post.price || 0;
    this.image = post.image || '';
    this.tutorId = post.tutorId || 0;
    this.courseId = post.courseId || 0;
  }
}
