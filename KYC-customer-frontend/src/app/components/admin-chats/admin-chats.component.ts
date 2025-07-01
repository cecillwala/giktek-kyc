import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-admin-chats',
  imports: [],
  templateUrl: './admin-chats.component.html',
  styleUrl: './admin-chats.component.css'
})
export class AdminChatsComponent implements OnInit{

  router = inject(Router);
  chats = signal<Array<String>>([]);
  service = inject(ChatService);

  ngOnInit(): void {
      this.loadChats();
  }

  switchPage(chat: any){
    console.log("nimeclick");
    this.router.navigate(['/admin-chat', chat]);
  }

  loadChats(){
    this.service.loadChats().pipe()
    .subscribe((res) => {
      console.log(res);
      this.chats.set(res);
    })
  }

}
