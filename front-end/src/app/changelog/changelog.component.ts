import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import  * as moment from 'moment';

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.css']
})
export class ChangelogComponent implements OnInit {

  public sortedChanges: any[] = [];

  constructor(private http: HttpClient,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadChangelog();
  }

  private loadChangelog() {
    this.getChangeDetails()
      .subscribe({
        next: (detailsResponse) => {
          this.groupChangesByDate(detailsResponse.Items);
          this.sortChangesByType();
        },
        error: () => { this.snackBar.open('Error loading changelog details', 'X') }
      });
  }

  private groupChangesByDate(changeDetails: any[]){
    for (let i = 0; i < changeDetails.length; i++) {
      let changeDetail: any = changeDetails[i];

      const date = moment.unix(changeDetail.date).format('LL');
      let foundDate = this.sortedChanges.find(sc => sc.date == date);
      if (!foundDate) {
        foundDate = {
          date: date,
          changes: []
        }

        this.sortedChanges.push(foundDate);
      }

      foundDate.changes.push({
        type: changeDetail.type,
        description: changeDetail.description,
        icon: this.getIconForType(changeDetail.type)
      });
    }
  }

  private sortChangesByType(){
    for(let i = 0; i < this.sortedChanges.length; i++){
      let sortedChange = this.sortedChanges[i];

      sortedChange.changes.sort(function(a, b) {
        let textA = a.type.toUpperCase();
        let textB = b.type.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    }
  }

  private getChangeDetails(): Observable<any> {
    const url = `${environment.changelogApiUrl}/details`;
    return this.http
      .get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error);
  }

  private getIconForType(type: string) {
    switch (type) {
      case 'Bug':
        return 'bug_report';
      case 'Story':
        return 'add_task'
      case 'New Feature':
        return 'fiber_new';
      case 'Improvement':
        return 'trending_up'
      default:
        return 'done';
    }
  }
}
