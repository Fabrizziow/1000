import { Component, OnInit, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'flowbiteBlocks';

  @ViewChild('titulo', { static: true }) titulo!: ElementRef;
  @ViewChild('subtitulo', { static: true }) subtitulo!: ElementRef;
  @ViewChild('etiqueta', { static: true }) etiqueta!: ElementRef;
  @ViewChild('boton', { static: true }) boton!: ElementRef;
  @ViewChild('tituloTiempo', { static: true }) tituloTiempo!: ElementRef;
  @ViewChild('textoResultados', { static: true }) textoResultados!: ElementRef;
  @ViewChild('tituloCanciones', { static: true }) tituloCanciones!: ElementRef;
  @ViewChild('textoCanciones', { static: true }) textoCanciones!: ElementRef;
  @ViewChildren('card') cards!: QueryList<ElementRef>;

  ngOnInit(): void {
    initFlowbite();
    document.documentElement.classList.add('dark');
  }

  ngAfterViewInit(): void {
    
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.titulo.nativeElement,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });

    // Animación del título
    tl.from(this.titulo.nativeElement, { opacity: 0, y: -50, scale: 0.8, duration: 1.5, ease: "power2.out" });

    // Animación del subtítulo
    tl.from(this.subtitulo.nativeElement, { opacity: 0, y: 20, duration: 1, ease: "power2.out" }, "-=0.5");

    // Animación de la etiqueta
    tl.from(this.etiqueta.nativeElement, { opacity: 0, y: 10, duration: 1, ease: "power2.out" }, "-=0.3");

    // Animación del botón
    tl.from(this.boton.nativeElement, { opacity: 0, y: 50, scale: 0.9, duration: 1, ease: "bounce.out" }, "-=0.2");

    // Disparar confeti al cargar la página
    this.lanzarConfeti();

    // Animaciones adicionales
    this.animarElementos();
  }

  animarElementos(): void {
    gsap.from(this.tituloTiempo.nativeElement, {
      opacity: 0,
      y: -30,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: this.tituloTiempo.nativeElement,
        start: "top 85%",
        toggleActions: "play none none none",
      }
    });

    gsap.from(this.textoResultados.nativeElement, {
      opacity: 0,
      y: 20,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: this.textoResultados.nativeElement,
        start: "top 90%",
        toggleActions: "play none none none",
      }
    });

    gsap.from(this.tituloCanciones.nativeElement, {
      opacity: 0,
      y: 20,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: this.tituloCanciones.nativeElement,
        start: "top 85%",
        toggleActions: "play none none none",
      }
    });

    gsap.from(this.textoCanciones.nativeElement, {
      opacity: 0,
      y: 20,
      duration: 1.2,
      delay: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: this.textoCanciones.nativeElement,
        start: "top 85%",
        toggleActions: "play none none none",
      }
    });

    this.cards.forEach((card, index) => {
      gsap.from(card.nativeElement, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power2.out",
        delay: index * 0.2,
        scrollTrigger: {
          trigger: card.nativeElement,
          start: "top 85%",
          toggleActions: "play none none none",
        }
      });
    });
  }

  lanzarConfeti(): void {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });

    }, 250);
  }
}
