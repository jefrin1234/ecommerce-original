import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

function Home() {
  return (
    <div>
     <CategoryList/>
     <BannerProduct/>
     <HorizontalCardProduct category={'airpodes'} heading={"Top Airpodes"}/>
     <HorizontalCardProduct category={'watches'} heading={"watches"}/>
    
     <VerticalCardProduct  category={'mobiles'} heading={"Popular mobiles"}/>
     <VerticalCardProduct  category={'mouse'} heading={"Mouses"}/>
     <VerticalCardProduct  category={'television'} heading={"Newest Television"}/>
     <VerticalCardProduct  category={'camera'} heading={"Camera & photography"}/>
    
     <VerticalCardProduct  category={'earphones'} heading={"New Earphones"}/>
     <VerticalCardProduct  category={'speakers'} heading={"Bluetooth Speakers"}/>
     <VerticalCardProduct  category={'refrigerator'} heading={"Refrigerator"}/>
     <VerticalCardProduct  category={'trimmers'} heading={"Grooming"}/>
     <VerticalCardProduct  category={'printers'} heading={"Printers"}/>
     <VerticalCardProduct  category={'processor'} heading={"Processors"}/>
     
    </div>
  )
}

export default Home
