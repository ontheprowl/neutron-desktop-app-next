import { useNavigate } from '@remix-run/react';
import * as React from 'react'
import { AppStore } from '../stores/UIStore';

export default function WalletButton() {


  let navigate = useNavigate();
  return (
    <button className="p-1 transition-all"
      onClick={() => {
        AppStore.update((s) => {
          s.selectedTab = "Wallet";
          navigate('disputes')
        });
      }} >
      <svg
        className='h-full w-full'
        viewBox="0 0 29 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.58716 6.77279V21.7936C3.58716 23.8072 5.21945 25.4395 7.23299 25.4395H21.5247C23.5382 25.4395 25.1705 23.8072 25.1705 21.7936V11.5853C25.1705 9.82146 23.918 8.35018 22.2538 8.01237V6.91862C22.2538 5.54941 21.1439 4.43945 19.7747 4.43945H6.06633C4.74607 4.43945 3.66686 5.47146 3.59138 6.77279H3.58716ZM20.7955 6.91862V7.93945H6.06633C5.50253 7.93945 5.04549 7.48241 5.04549 6.91862C5.04549 6.35483 5.50253 5.89779 6.06633 5.89779H19.7747C20.3385 5.89779 20.7955 6.35483 20.7955 6.91862ZM18.8997 16.1061H21.5247C21.9274 16.1061 22.2538 16.4326 22.2538 16.8353C22.2538 17.238 21.9274 17.5645 21.5247 17.5645H18.8997C18.4969 17.5645 18.1705 17.238 18.1705 16.8353C18.1705 16.4326 18.4969 16.1061 18.8997 16.1061Z"
          fill="white"
        />
      </svg>
    </button>
  );
};
