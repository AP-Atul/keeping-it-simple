export type AuthAPIResponseCodes = 'email-exists' | 'logged-out' | 'invalid-credentials'

export interface SignUpUser {
  first_name: string
  last_name: string
  email: string
  password: string
}

export interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  password: string
  phone_number: string
  roles: string
  email_verified: boolean
  active: boolean
  metadata: object
  created_at: string
  updated_at: string
}

export interface SaveSession {
  user_id: string
}

export interface SaveRefreshToken {
  user_id: string
  session_id: string
  expiry: string
}

export interface Session {
  id: string
  user_id: string
  last_used_at: string
  created_at: string
}

export interface ReFreshToken {
  id: string
  user_id: string
  session_id: string
  expiry: string
  revoked: boolean
  created_at: string
}
