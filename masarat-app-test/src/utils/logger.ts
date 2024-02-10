// src/utils/logger.ts
import axios from 'axios';

const SERVER_URL = 'http://localhost:3001/log';

export const logInteraction = async (interactionType: string) => {
  const timestamp = new Date().toISOString();

  try {
    await axios.post(SERVER_URL, { interactionType, timestamp });
  } catch (error) {
    console.error('Error logging interaction:', error);
  }
};
