export interface Message {
    id: number
    senderId: number
    senderUsername: string
    senderPhotoUrl: string
    recipeintId: number
    recipientUsername: string
    recipientPhotoUrl: string
    content: string
    dateRead?: Date
    messageSent: Date
  }
  