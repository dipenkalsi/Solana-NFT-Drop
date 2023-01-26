import Logo from './logo'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Link from "next/link";
import { useRouter } from "next/router";
const styles = {
  wrapper: 'flex items-center space-x-10',
  container: 'flex flex-1 justify-between',
  navBar: 'flex items-center space-x-2',
  navItem:
    `cursor-pointer font-mono font-semibold text-xl hover:text-[#260033] hover:bg-gradient-to-br from-green-300 to-purple-600 transition-all duration-100 ease-in rounded-md px-4 py-2`,
  menuBox: 'relative inline-block text-left',
  menuButton:
    'flex items-center rounded-full  text-white hover:text-gray-200 focus:outline-none',
  menuIcon: 'h-5 w-5',
  menuItems:
    'absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
  menuItemsContainer: 'py-1',
  menuItem: 'block w-full px-4 py-2 text-left text-sm',
  buttonActive: 'bg-gray-100 text-gray-900',
  buttonInactive: 'text-gray-700',
}

const transitions = {
  menuEnter: 'transition ease-out duration-100',
  menuEnterFrom: 'transform opacity-0 scale-95',
  menuEnterTo: 'transform opacity-100 scale-100',
  menuLeave: 'transition ease-in duration-75',
  menuLeaveFrom: 'transform opacity-100 scale-100',
  menuLeaveTo: 'transform opacity-0 scale-95',
}

const Header = () => {
  const router = useRouter();
  console.log(router,"router")
  return (
    <header className={styles.wrapper}>
      {/* Your Collection logo can go inside this component */}
      <Logo />

      <div className={styles.container}>
        <ul className={styles.navBar}>
          <li className={`${styles.navItem} ${router.pathname == "/" ? "underline underline-offset-4 text-indigo-200" : "text-green-400"}`}><Link href='/'>Products</Link></li>
          <li className={`${styles.navItem} ${router.pathname == "/gallery" ? "underline underline-offset-4 text-indigo-200" : "text-green-400"}`}><Link href='/'>Gallery</Link></li>
          <li className={`${styles.navItem} ${router.pathname == "/marketplace" ? "underline underline-offset-4 text-indigo-200" : "text-green-400"}`}><Link href='/'>Marketplace</Link></li>
        </ul>
        {/* Wallet connect button goes here!  */}
        <WalletMultiButton/>
      </div>
    </header>
  )
}

export default Header
