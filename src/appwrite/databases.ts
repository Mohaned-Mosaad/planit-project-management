// import {
//   COLLECTION_ID_CATEGORIES,
//   COLLECTION_ID_TASKS,
//   DATABASE_ID,
// } from '@/constants/env'
// import { databases } from './config'
// import { ID } from 'appwrite'

// type DBCategories = 'tasks' | 'categories'

// type DBMethod = 'create' | 'update' | 'delete' | 'list' | 'get'

// const db = {}

// const collections: { dbId: string; id: string; name: DBCategories }[] = [
//   {
//     dbId: DATABASE_ID,
//     id: COLLECTION_ID_TASKS,
//     name: 'tasks',
//   },
//   {
//     dbId: DATABASE_ID,
//     id: COLLECTION_ID_CATEGORIES,
//     name: 'categories',
//   },
// ]

// collections.forEach((col) => {
//   db[col.name] = {
//     create: (payload, permissions, id = ID.unique()) =>
//       databases.createDocument(col.dbId, col.id, id, payload, permissions),
//     update: (id, payload, permissions) =>
//       databases.updateDocument(col.dbId, col.id, id, payload, permissions),
//     delete: (id) => databases.deleteDocument(col.dbId, col.id, id),

//     list: (queries = []) => databases.listDocuments(col.dbId, col.id, queries),

//     get: (id) => databases.getDocument(col.dbId, col.id, id),
//   }
// })

// export default db
