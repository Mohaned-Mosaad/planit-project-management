import { ENDPOINT, PROJECT_ID } from '@/constants/env'
import { Client, Databases, Account } from 'appwrite'

const client = new Client()
client.setEndpoint(ENDPOINT).setProject(PROJECT_ID)
client.setProject(PROJECT_ID)

const databases = new Databases(client)

const account = new Account(client)

export { client, databases, account }
