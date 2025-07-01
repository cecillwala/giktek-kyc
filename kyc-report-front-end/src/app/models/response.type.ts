export type Response = {
    chatId: string | null
}

export type ChatId = {
    chatId: string | null
}

export type Text = {
    text: string
}

export type Message = {
    id: number,
    message: string,
    chatId: string | any,
    admin: boolean
}