import { Component, input } from '@angular/core';
import { Message } from '../../models/response.type';

@Component({
  selector: 'app-sender',
  imports: [],
  templateUrl: './sender.component.html',
  styleUrl: './sender.component.css'
})
export class SenderComponent {
  message = input<Message>({
    id: 0,
    message: "",
    chatId: "",
    admin: false
  });
}
