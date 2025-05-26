export class AIError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class BadResponseAIError extends AIError {
  constructor(message = "La respuesta de la IA no es válida") {
    super(502, message);
  }
}
