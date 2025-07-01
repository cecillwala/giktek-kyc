import { Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-welcome',//defines the html tag for the component
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {//starts the component class
  constructor(private router: Router) {}

  ngOnInit(): void {
  }
  
  service = inject(ChatService);
  loadChat(){
    this.service.getIdAPI().pipe(
    )
    .subscribe((res) => {
      if (!localStorage.getItem("chatId")){
        localStorage.setItem("chatId", res.chatId ?? '');
      }
      this.router.navigate(['/chat', localStorage.getItem('chatId')]);
    });
  }


  loadAdminChats(){
    this.router.navigate(['/admin-chats']);
  }
  
  getId(){

  }

  onContinue() {
    this.router.navigate(['/step1']);
  }
} 