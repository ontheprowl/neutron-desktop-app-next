



export default function BreadCrumbs({ segments }: { segments: { slug: string, name: string }[] }) {

    return (
        <div className="text-neutral-base">
            {segments.map((segment, index) => {
                if (index == segments.length - 1) {
                    return <span key={index} className="font-gilroy-bold text-black">{segment.name}</span>
                } else {
                    return <span key={index} className="text-neutral-base" >{segment.name} -</span>
                }
            })}
        </div>
    )

}