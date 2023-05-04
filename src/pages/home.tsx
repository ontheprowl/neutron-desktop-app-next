import AppLayout from "@/components/layout/AppLayout";




export default function HomePage() {


    return (
            <div>
                hi
            </div>
        )
}

HomePage.getLayout = function getLayout(page) {
    return (
      <AppLayout>
        {page}
      </AppLayout>
    )
  }


