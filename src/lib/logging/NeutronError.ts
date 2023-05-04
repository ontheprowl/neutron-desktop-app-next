import type { NeutronErrorCode } from "@/lib//logging/errors";
import { generateNeutronErrorForErrorCode } from "@/lib/logging/errors";

export class NeutronError extends Error {
  type: NeutronErrorCode;
  message: string;
  constructor(error: any) {
    
    const { type, message } = error?.code
      ? generateNeutronErrorForErrorCode(error.code)
      : generateNeutronErrorForErrorCode(error.message);
      

    
    
    


    super(message);
    this.type = type;
    this.message = message;
  }
}
