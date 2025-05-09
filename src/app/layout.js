'use client'
import './globals.css'
import useAuthToken from './hooks/useAuthToken'

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout ({ children }) {
  const { token, id } = useAuthToken()

  console.log(token, id, 'token from layout')
  return (
    <html lang='en' data-arp=''>
      <body cz-shortcut-listen='true'>{children}</body>
    </html>
  )
}
