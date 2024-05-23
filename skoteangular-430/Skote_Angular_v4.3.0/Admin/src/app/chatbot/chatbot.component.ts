import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  expanded: boolean = false;
  welcomeMessage: string = 'Welcome! How can I assist you today?';
  userInput: string = '';
  currentInput: string = '';
  showTypingDots: boolean = false;

  toggleChatbox() {
    this.expanded = !this.expanded;
    this.userInput = '';
    this.currentInput = '';
    this.showTypingDots = false;
  }

  submitQuestion() {
    if (this.currentInput.trim() !== '') {
      this.userInput = this.currentInput;
      this.currentInput = '';
      this.showTypingDots = true;


      setTimeout(() => {
        this.showTypingDots = false;
        // Integrate your message response logic here
      }, 2000); // Adjust the delay as needed
    }
  }
}
