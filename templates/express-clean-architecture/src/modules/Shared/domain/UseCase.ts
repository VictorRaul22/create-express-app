export interface UseCase<Request, Response> {
  execute: (request: Request) => Response;
}