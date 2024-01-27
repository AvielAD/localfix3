import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {Providers} from "./provider";
import TopNavBar from '../../Components/TopNavBar'
import { menunav, menuoption } from '@/DTOS/menuNav/menunav';

const inter = Inter({ subsets: ['latin'] })

const menusrutas: Array<menuoption> = [
  {
    nombreruta: "Diagnosticos", 
    urlruta: "/dashboard/diagnosticos"
  },
  {
    nombreruta: "Reparaciones", 
    urlruta: "/eventos/reparaciones"
  },
] 

export const metadata: Metadata = {
  title: 'LocalFix',
  description: 'Reparaciones Diagnosticos',
}

export default function Dashboard({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
        <TopNavBar rutas={menusrutas}/>
        <Providers>{children}</Providers> 
    </div>
  )
}
