import { Component, signal, input, inject } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { FormsModule } from '@angular/forms';
import { ChatId, Message, Response } from '../../models/response.type';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { TextBubbleComponent } from '../text-bubble/text-bubble.component';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, TextBubbleComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.client.activate();
    }
    this.route.paramMap.subscribe(params => {
      this.chatId.set({chatId: params.get('chat')});
      this.getMessages();
    });
  }

  route = inject(ActivatedRoute);

  query = signal({
    text : ""
  });

  messages = signal<Array<Message>>([]);
  service = inject(ChatService);
  chatId = signal<ChatId>({
    chatId: ""
  })

  client = new Client({
    brokerURL: "ws://localhost:8080/connect",
    connectHeaders: {},
    onConnect: () => {
      this.client.subscribe(`/messages/admin-texts/${this.chatId().chatId}`, (res) => {
        this.newMessage(JSON.parse(res.body))
      });
       this.client.subscribe(`/messages/customer-texts/${this.chatId().chatId}`, (res) => {
        this.newMessage(JSON.parse(res.body))
      });
      console.log("Ze blututs dzivais iz redzi tzu peya.")
    },
    onStompError: (error) => {
      console.log(error);
    },
    onDisconnect: () => {
      console.log("Wamefunga");
    }
  });

  getId(){
    this.route.paramMap.subscribe(params => {
      this.chatId.set({chatId: params.get('chat')});
    })  
  }

  message = signal<Message>({
    id: 0,
    message: "",
    chatId: this.chatId().chatId,
    admin: true
  });
  
  
  newMessage(message: Message){
    console.log(message);
    this.messages.update((current) => [...current, message]);
  }

  getMessages (){
    this.service.getMessages(this.chatId().chatId).pipe(
      )
    .subscribe((res) => {
      console.log(res);
      this.messages.set(res);
    })
  }

  onSubmit(){
    console.log(this.query().text);
    this.client.publish({
      destination: `/app/admin`,
      body: JSON.stringify({
        message: this.query().text,
        chatId: this.chatId().chatId,
        admin: true
      })
    });
    this.query.set({text:""});
  }

}
