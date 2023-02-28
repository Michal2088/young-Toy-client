export interface UserMessage {
    _id?: string;
    name: string;
    email: string;
   phone?: string;
   message?: string;
   date?:string;
   alreadyBeenRead?:string;
  }