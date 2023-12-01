import { dev } from '$app/environment'
import { PRIVATE_REDIS_SECRET, PRIVATE_REDIS_URL } from '$env/static/private'
import { IoRedisSessionStore } from '@ethercorps/sveltekit-redis-session'
import Redis from 'ioredis'

export const sessionManager = new IoRedisSessionStore({
  redisClient: new Redis(PRIVATE_REDIS_URL || 'redis://localhost:6379/0'),
  secret: PRIVATE_REDIS_SECRET,
  cookieName: 'KITSESSID',
  serializer: JSON,
  cookiesOptions: {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: !dev,
    maxAge: 60 * 60 * 24, // 1 day
  },
})
