export enum NeutronErrorCode {
    AuthError,
    ContractError,
    InternalServerError,
    ClientSideError,
    PayinError,
    PayoutError,
    EmailNotVerified,
    GeneralError
}

export function generateNeutronErrorForErrorCode(code: string) {
  switch (code) {
    case "auth/invalid-email":
      return {
        type: NeutronErrorCode.AuthError,
        message: "Invalid email ID",
      };
    case "auth/user-not-found":
      return {
        type:NeutronErrorCode.AuthError,
        message: "Not a valid Neutron user"
      };
    case "auth/wrong-password":
      return {
        type: NeutronErrorCode.AuthError,
        message: "Invalid password",
      };
    case "auth/internal-error":
      return {
        type: NeutronErrorCode.AuthError,
        message:
          "Internal server error - If this problem persists, please email us at connect@neutron.money",
      };
    case "neutron-auth/email-not-verified":
        return {
            type: NeutronErrorCode.AuthError,
            message:
              "This email has not been verified. Please try again after completing email verification",
          };
    case "auth/email-already-in-use":
      return {
        type:NeutronErrorCode.AuthError,
        message : "There is already a user mapped to this email ID. Please use a different email, or reset your password"
      }
    default:
        return {
            type: NeutronErrorCode.GeneralError,
            message:" Nothing in particular"
        }
  }
}
