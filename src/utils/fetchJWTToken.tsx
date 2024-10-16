export async function fetchJWTToken(): Promise<string> {
    try {
      const response = await fetch('/api/auth/token', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch JWT token');
      }
  
      const { accessToken } = await response.json();
      return accessToken;
    } catch (error) {
      console.error('Error fetching JWT token:', error);
      throw error;
    }
  }