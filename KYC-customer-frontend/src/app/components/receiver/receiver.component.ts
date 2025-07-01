import { Component, input } from '@angular/core';
import { Message } from '../../models/response.type';

@Component({
  selector: 'app-receiver',
  imports: [],
  templateUrl: './receiver.component.html',
  styleUrl: './receiver.component.css'
})
export class ReceiverComponent {
  message = input<Message>({
    id: 0,
    message: "",
    chatId: "",
    admin: false
  });
}
