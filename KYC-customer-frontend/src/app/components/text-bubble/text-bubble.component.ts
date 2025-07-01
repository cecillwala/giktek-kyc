import { Component, input } from '@angular/core';
import { Message, Text } from '../../models/response.type';

@Component({
  selector: 'app-text-bubble',
  imports: [],
  templateUrl: './text-bubble.component.html',
  styleUrl: './text-bubble.component.css'
})
export class TextBubbleComponent {
  message = input<Message>({
    id: 0,
    message: "",
    chatId: "",
    admin: false
  });
}
