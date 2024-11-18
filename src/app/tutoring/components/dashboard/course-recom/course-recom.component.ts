import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-course-recom',
  templateUrl: './course-recom.component.html',
  styleUrl: './course-recom.component.css'
})
export class CourseRecomComponent implements OnInit {
  recommendedCourses = [
    {
      title: 'Complejidad Algorítmica: Asesorías',
      author: 'Carlos Domínguez',
      rating: 4.0,
      price: 'S/. 19,90',
      image: 'CompleAlgo.png'
    },
    {
      title: 'Aplicaciones Web: Parte del Frontend (Vue.js)',
      author: 'José Cuevas',
      rating: 3.0,
      price: 'S/. 9,90',
      image: 'Vue.png'
    },
    {
      title:'Algoritmos y Estructura de Datos: Árboles Binarios',
      author:'Alejandra Pérez',
      rating:'4.0',
      price:'S/. 29,90',
      image:'Arboles.png'
    },
    {
      title:'Diseño de Bases de Datos: MongoDB',
      author:'Gabriela Franco',
      rating:'3.0',
      price:'S/. 14,90',
      image:'Mongo.png'
    }

  ];

  selectedIndex = 0;

  ngOnInit(): void {
    this.startAutoPlay();
  }

  /**
   * @method startAutoPlay
   * @description Starts the autoplay of the recommended courses
   * @returns void
   */

  startAutoPlay() {
    setInterval(() => {
      this.selectedIndex = (this.selectedIndex + 1) % this.recommendedCourses.length;
    }, 5000);
  }

  /**
   * @method onTabChange
   * @description Changes the selected index of the recommended courses
   * @param event - Event that contains the new index
   * @returns void
   */

  onTabChange(event: any) {
    this.selectedIndex = event.index;
  }
}
