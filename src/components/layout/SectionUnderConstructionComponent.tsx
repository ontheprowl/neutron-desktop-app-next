
import SectionUnderConstruction from '~/assets/images/sectionUnderConstruction.svg';




export default function SectionUnderConstructionComponent(){


    return (
        <div className='flex flex-col h-full w-full  justify-center items-center'>
            <div className='flex flex-row justify-center space-x-6  h-full w-full items-center'>
                <img alt="page_under_construction" src={SectionUnderConstruction}></img>
                <span className=' text-3xl'>Feature under Construction</span>
            </div>
        </div>)
}

