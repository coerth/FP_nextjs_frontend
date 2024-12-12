import { getAccessToken } from '@auth0/nextjs-auth0';

export default async function handler(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res, {
      audience: process.env.AUTH0_AUDIENCE, 
      scopes: ['openid', 'profile', 'email'], 
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error('Error getting access token:', error);
    res.status(error.status || 500).json({ error: error.message });
  }
}