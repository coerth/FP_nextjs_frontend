export async function fetchJWTToken(): Promise<string> {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ' ';
      const response = await fetch(`${baseUrl}/api/auth/token`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        return '';
      }
  
      const { accessToken } = await response.json();
      return accessToken;
    } catch (error) {
      // console.error('Error fetching JWT token:', error);
      // throw error;
      return '';
    }
  }