import { PRIVATE_REDIS_SECRET, PRIVATE_REDIS_URL } from '$env/static/private'
import { IoRedisSessionStore } from '@ethercorps/sveltekit-redis-session'
import Redis from 'ioredis'

export const sessionManager = new IoRedisSessionStore({
  redisClient: new Redis(PRIVATE_REDIS_URL || 'redis://localhost:6379'),
  secret: PRIVATE_REDIS_SECRET,
  cookieName: 'KITSESSID',
})
