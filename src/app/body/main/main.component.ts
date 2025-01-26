import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { CarouselComponent } from '../../carousel/carousel.component';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, CarouselComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  username = 'MuriloSilvestre';
  token = '';
  isLoading = false;
  errorMessage = '';
  skills = [
    {
      name: 'C#',
      url: 'assets/svg/CSharp.svg',
    },
    {
      name: '.NET',
      url: 'assets/svg/DotNet.svg',
    },
    {
      name: 'Angular',
      url: 'assets/svg/Angular.svg',
    },
    {
      name: 'TypeScript',
      url: 'assets/svg/Typescript.svg',
    },
    {
      name: 'JavaScript',
      url: 'assets/svg/Javascript.svg',
    },
    {
      name: 'HTML5',
      url: 'assets/svg/HTML5.svg',
    },
    {
      name: 'CSS3',
      url: 'assets/svg/CSS3.svg',
    },
    {
      name: 'Entity FW',
      url: 'assets/images/EntityFramework.png',
    },
    {
      name: 'SQL Server',
      url: 'assets/svg/SQLServer.svg',
    },
    {
      name: 'PostgreSQL',
      url: 'assets/svg/PostgreSQL.svg',
    },
    {
      name: 'APIs RESTful',
      url: 'assets/svg/APIsRESTful.svg',
    },
    {
      name: 'Git',
      url: 'assets/svg/Git.svg',
    },
    {
      name: 'SOLID',
      url: 'assets/images/SOLID.png',
    },
    {
      name: 'Dry',
      url: 'assets/images/Dry.jpg',
    },
    {
      name: 'KISS',
      url: 'assets/images/KISS.png',
    },
  ];
  projects: any[] = [];
  languages: { [repoName: string]: string[] } = {};

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.fetchRepos();
  }

  fetchRepos(): void {
    this.githubService.getPublicRepos(this.username, this.token).subscribe({
      next: (repos) => {
        this.projects = repos;

        const languageRequests = repos.map((repo) =>
          this.githubService
            .getPRepoLanguages(this.username, repo.name)
            .pipe(map((languages: any) => ({ repoName: repo.name, languages })))
        );

        forkJoin(languageRequests).subscribe({
          next: (languageData) => {
            languageData.forEach((data) => {
              this.languages[data.repoName] = Object.keys(data.languages);
            });
          },
          error: (error) => {
            console.error('Erro ao buscar linguagens:', error);
          },
        });
      },
      error: (error) => {
        console.error('Erro ao buscar repositórios:', error);
      },
    });
  }
  currentSlide = 0;

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  nextSlide() {
    if (this.currentSlide < this.projects.length - 1) {
      this.currentSlide++;
    }
  }
}
