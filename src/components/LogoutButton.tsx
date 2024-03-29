export default function LogoutButton({ selected }: { selected?: boolean }) {

    return (

        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15" stroke={selected ? 'white' : 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 17L15 12L10 7" stroke={selected ? 'white' : 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 12H3" stroke={selected ? 'white' : 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

}