import { Component, signal, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { Client } from '@stomp/stompjs';
import { Text, ChatId, Message } from '../../models/response.type';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { SenderComponent } from '../sender/sender.component';
import { ReceiverComponent } from '../receiver/receiver.component';
@Component({
  selector: 'app-chat-room',
  imports: [MatInputModule, FormsModule, SenderComponent, ReceiverComponent],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.css'
})
export class ChatRoomComponent implements OnInit{

  ngOnInit(): void {
    
    this.client.activate();
    this.route.paramMap.subscribe(params => {
      this.chatId.set({chatId: params.get('chat')});
      this.getMessages();
    });
    
  }
  route = inject(ActivatedRoute)
  service = inject(ChatService);
  messages = signal<Array<Message>>([]);
  query = signal<Text>({text: ""});
  

  chatId = signal<ChatId>({
    chatId: ""
  })
  client = new Client({
    brokerURL: `ws://localhost:8084/ws/connect`,
    connectHeaders: {},
    onConnect: () => {
      this.client.subscribe(`/messages/customer-texts/${this.chatId().chatId}`, (res) => {
        this.newMessage(JSON.parse(res.body))
        console.log(res.body);
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

  message = signal<Message>({
    id: 0,
    message: "",
    chatId: localStorage.getItem("chatId"),
    admin: false
  });


  newMessage(message: Message){
    console.log(message);
    this.messages.update((current) => [...current, message]);
  }

  getMessages (){
  this.service.getMessages(this.chatId().chatId).pipe(
    )
    .subscribe((res) => {
      this.messages.set(res);
    })
  }

  onSubmit(){
    this.client.publish({
      destination: `/ws/customer`,
      body: JSON.stringify({
        message: this.query().text,
        chatId: localStorage.getItem("chatId"),
        admin: false
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
