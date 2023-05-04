import AppLayout from "@/components/layout/AppLayout";




export default function VouchersPage() {


    return (
        <div>
            vouchers_page
        </div>
    )
}


VouchersPage.getLayout = function getLayout(page) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}
