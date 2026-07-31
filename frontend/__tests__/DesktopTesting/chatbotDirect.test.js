
jest.mock('../../src/component/ChatBot/ChatBot.css', () => ({}));
jest.mock('../../src/component/ChatBot/initialContent.css', () => ({}));
jest.mock('../../src/component/ProgressBar/Loadinglights.css', () => ({}));
jest.mock('../../src/assets/chatbotImg.png', () => ({
    default: '../../src/assets/chatbotImg.png', // Replace 'mocked-chatbot-image-path.png' with the desired mock image path
  }));

import React from 'react';
import { render, screen, waitFor, debug } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chatbot from '../../src/component/DashBoard/ChatbotDirect';
import { describe, test, expect } from '@jest/globals';



describe('Chatbot Component', () => {
    test('clicking on the chatbot link navigates to the chatbot page', async () => {
      render(<Chatbot />);
  
      // Wait for the chatbot link to become visible
      await waitFor(() => {
        const chatbotLink = screen.getByText(/Let's start chatting/i);
        expect(chatbotLink).toBeInTheDocument();
      });

      // Debug the rendered DOM
      debug();
  
      // Click on the chatbot link
      const chatbotLink = screen.getByText(/Let's start chatting/i);
      userEvent.click(chatbotLink);
  
      // Check if navigation to chatbot page is successful
      expect(window.location.href).toContain('/chatbot');
    });
});
