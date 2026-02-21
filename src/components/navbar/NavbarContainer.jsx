import React from 'react'
import Logo from './Logo'
import Menu from './Menu'

const NavbarContainer = () => {
  return (
    <header className='w-[100%] h-[70px] bg-slate-700  sticky top-0 z-10'>
        <article className='w-[95%] m-auto h-[100%] flex items-center justify-between '>
            <Logo/>
            <Menu/>
        </article>
    </header>
  )
}

export default NavbarContainer