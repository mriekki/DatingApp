import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { LikesService } from '../_services/likes.service';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';
import { MemberCardComponent } from "../members/member-card/member-card.component";
import { PaginationComponent } from 'ngx-bootstrap/pagination';

@Component({
    selector: 'app-lists',
    imports: [ButtonsModule, FormsModule, MemberCardComponent, PaginationComponent],
    templateUrl: './lists.component.html',
    styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit, OnDestroy {
    likesService = inject(LikesService);
    predicate = 'liked';
    pageNumber = 1;
    pageSize = 5;

    ngOnInit(): void {
        this.loadlikes();
    }

    getTitle() {
        switch (this.predicate) {
            case 'liked' : return 'Members you like'
            case 'likedBy' : return 'Members who like you'
            default : return 'Mutual'
        }
    }

    loadlikes() {
        this.likesService.getLikes(this.predicate, this.pageNumber, this.pageSize);
    }

    pageChanged(event: any) {
        if (this.pageNumber !== event.page) {
            this.pageNumber = event.page;
            this.loadlikes();
        }
    }

    ngOnDestroy(): void {
        this.likesService.paginatedResult.set(null);
    }
}
