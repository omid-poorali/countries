import * as React from "react";

export default function Arrowdown(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width='8'
            height='5'
            viewBox='0 0 8 5'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}>
            <path d='M7.5 0.5L4 4L0.5 0.5' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}