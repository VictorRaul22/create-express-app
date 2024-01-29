import { BackendApp } from "@/BackendApp";
async function main(): Promise<void> {
  const app = new BackendApp();
  await app.start();
}
void main();
