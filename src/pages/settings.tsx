import AppLayout from "@/components/layout/AppLayout";




export default function Settings() {


    return (
        <div>
            hi
        </div>
    )
}

Settings.getLayout = function getLayout(page) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}
