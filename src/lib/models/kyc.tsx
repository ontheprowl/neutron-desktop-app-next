export enum KYCStatus {
    NotSubmitted,
    Submitted,
    Verified,
    Rejected
}


export const KYCVerificationStatus = ({ status }: { status?: KYCStatus }) => {

    switch (status) {
        case KYCStatus.NotSubmitted:
            return <p className="font-gilroy-regular text-black bg-white p-4 rounded-full my-2"> KYC details not submitted </p>;
        case KYCStatus.Submitted:
            return <p className="font-gilroy-regular text-white bg-green-500 p-4 rounded-full my-2"> KYC details submitted </p>;
        case KYCStatus.Verified:
            return <p className="font-gilroy-regular text-white bg-green-500 p-4 rounded-full my-2"> KYC details verified </p>;
        case KYCStatus.Rejected:
            return <p className="font-gilroy-regular text-white bg-red-600 p-4 rounded-full my-2"> KYC details Rejected </p>
        default:
            return <p className="font-gilroy-regular text-black bg-white p-4 rounded-full my-2"> KYC details not submitted </p>;
    }

}