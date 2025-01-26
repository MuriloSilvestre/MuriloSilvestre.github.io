import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private baseUrl = 'https://api.github.com/users';
  private languagesUrl = 'https://api.github.com/repos';

  constructor(private http: HttpClient) {}

  getPublicRepos(username: string, token?: string): Observable<any[]> {
    const headers = token
      ? new HttpHeaders({ Authorization: `token ${token}` })
      : undefined;

    return this.http.get<any[]>(`${this.baseUrl}/${username}/repos`, {
      headers,
    });
  }

  getPRepoLanguages(username: string, repo: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.languagesUrl}/${username}/${repo}/languages`,
      {}
    );
  }
}
