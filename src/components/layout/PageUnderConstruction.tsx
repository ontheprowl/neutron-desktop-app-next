
import PageUnderConstruction from '~/assets/images/pageUnderConstruction.svg';



export default function PageUnderConstructionComponent() {
    return (
        <div className='flex flex-row h-full w-full justify-center items-center'>
            <div className='flex flex-col justify-center space-y-8  h-full w-full items-center'>
                <img alt="page_under_construction" src={PageUnderConstruction}></img>
                <span className=' text-3xl'>Feature under Construction</span>
            </div>
        </div>)
}