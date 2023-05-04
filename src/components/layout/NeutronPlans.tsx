
import Tick from '~/assets/images/plans_tick.svg';




export const NeutronPlan = ({ slabs, title, description, price, period }: { slabs: { category: string, benefits: string[] }[], title: string, description: string, price: { "Monthly": { original: string, current: string }, "Annually": { original: string, current: string } } | string, period?: string }) => {

    return (
        <div id="starter_plan" className="h-full min-h-[1200px] w-1/3 bg-primary-base text-white rounded-xl flex flex-col space-y-4 p-6">
            <h1 className=" text-2xl">{title}</h1>
            <span className="font-gilroy-regular h-24 opacity-80">{description}</span>
            {typeof price != "string" ?
                <div className="flex flex-col space-y-4 font-gilroy-medium">
                    <div className="flex font-gilroy-medium flex-row items-end space-x-1">
                        <span  className='text-4xl'>₹</span>
                        <span className=" line-through text-4xl">{period === "Annually" ? price.Annually.original : price.Monthly.original}</span>
                        <span className='text-md'>{period === "Annually" ? "/year" : "/month"}</span>
                    </div>
                    <div className="flex flex-row items-end space-x-1">
                        <span  className='text-4xl'>₹</span>
                        <span className="text-4xl">{period === "Annually" ? price.Annually.current : price.Monthly.current}</span>
                        <span className='text-md'>{period === "Annually" ? "/year" : "/month"}</span>
                    </div>
                </div> :
                <h1 className=" text-4xl font-gilroy-medium">{price}</h1>
            }

            {slabs.map((slab) => {
                return (<NeutronPlanSlab key={slab.category} category={slab.category} benefits={slab.benefits} />)
            })}
        </div>
    )

}



export const NeutronPlanSlab = ({ category, benefits }: { category: string, benefits: string[] }) => {



    return (
        <div className="flex flex-col space-y-4 w-4/5 ">
            <span>{category}</span>
            <ul className="w-full font-gilroy-medium">
                {benefits.map((benefit) => {
                    return (
                        <li key={benefit} className="flex flex-row space-x-6 items-center  justify-start w-full">
                            <img src={Tick} alt="plans_tick"></img>
                            <span>{benefit}</span>
                        </li>
                    )

                })}
            </ul>
        </div>
    )
}