import Footers from './footers'
import Navbars from './navbars'

export default function RootLayout({children}: any) {
  return (
    <div className='h-full w-full'>
        <Navbars/>
        {children}
        <Footers/>
    </div>
  )
}
