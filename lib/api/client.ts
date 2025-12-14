const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function mockApiCall<T>(data: T, delayMs = 300): Promise<T> {
  await delay(delayMs)
  return data
}

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}
