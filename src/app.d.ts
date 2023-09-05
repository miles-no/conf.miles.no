import type { User } from "$lib/types/user";

declare global {
  namespace App {
    interface Locals {
      user?: User;
    }
  }
}
 
export {};