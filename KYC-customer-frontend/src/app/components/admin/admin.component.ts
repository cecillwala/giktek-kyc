import { Component, signal, input, inject } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { FormsModule } from '@angular/forms';
import { ChatId, Message, Response } from '../../models/response.type';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { TextBubbleComponent } from '../text-bubble/text-bubble.component';
import { ReceiverComponent } from "../receiver/receiver.component";
import { SenderComponent } from '../sender/sender.component';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, SenderComponent, ReceiverComponent],
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
    brokerURL: "ws://localhost:8084/ws/connect",
    connectHeaders: {},
    onConnect: () => {
      this.client.subscribe(`/messages/admin-texts/${this.chatId().chatId}`, (res) => {
        this.newMessage(JSON.parse(res.body));
        console.log(res);
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
    chatId: localStorage.getItem("chatId"),
    admin: true
  });
  
  
  newMessage(message: Message){
    console.log(`This is what we're getting back ${message}`);
    
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
      destination: `/ws/admin`,
      body: JSON.stringify({
        message: this.query().text,
        chatId: this.chatId().chatId,
        admin: true
      })
    });
    this.message.update((current) => ({
      ...current,
      message: this.query().text
    }))

    this.newMessage(this.message());
    this.query.set({text:""});
  }

}
