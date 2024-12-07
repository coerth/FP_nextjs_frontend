export async function fetchJWTToken(): Promise<string> {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/api/auth/token`, {
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