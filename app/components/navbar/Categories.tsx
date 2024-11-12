'use client'
import React from 'react'
import Container from '../Container'
import { TbBeach, TbBuildingSkyscraper, TbMountain, TbPool, TbWindmill } from 'react-icons/tb'
import CategoryBox from '../CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'
import { GiBarn, GiBarrel, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland } from 'react-icons/gi'
import { FaSkiing } from 'react-icons/fa'
import { BsSnow } from 'react-icons/bs'
import { IoDiamond } from 'react-icons/io5'

export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Windmills',
    icon: TbWindmill,
    description: 'This property has windmills!',
  },
  {
    label: 'Modern',
    icon: TbBuildingSkyscraper,
    description: 'This property is modern!',
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'This property is in the countryside!',
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'This property has a pool!',
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is on an island!',
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This property is close to a lake!',
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This property has skiing activities!',
  },
  {
    label: 'Castles',
    icon: GiCastle,
    description: 'This property is a castle!',
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This property has camping activities!',
  },
  {
    label: 'Arctic',
    icon: BsSnow,
    description: 'This property is in the arctic!',
  },
  {
    label: 'Caves',
    icon: GiCaveEntrance,
    description: 'This property is in a cave!',
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: 'This property is in the desert!',
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: 'This property is in a barn!',
  },
  {
    label: 'Luxury',
    icon: IoDiamond,
    description: 'This property is luxurious!',
}




]
const Categories = () => {
    const params = useSearchParams();
    const pathname = usePathname();
    const category = params?.get('category');
    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }
    
  return (
    <Container>
      <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
        {categories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  )
}

export default Categories