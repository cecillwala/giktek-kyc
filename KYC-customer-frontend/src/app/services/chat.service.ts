import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Message, Response } from '../models/response.type';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  baseUrl = `http://localhost:8084/chats/`

  constructor() { }
  http = inject(HttpClient)

  loadChats(){
    return this.http.get<Array<string>>(`${this.baseUrl}admin/load-chats`);
  }

  getIdAPI() {
    const url = `${this.baseUrl}chat-id`;
    //  <Array<Task>> Specifies the type of Array that should be returned
    return this.http.get<Response>(url);
   }


  getMessages(chatId: any ){
    return this.http.get<Array<Message>>(`${this.baseUrl}messages/${chatId}`)
  }
}
