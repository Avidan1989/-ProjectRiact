import React from 'react'

function Main() {
    const products = [
        { id: 1, name: 'Milk', price: 100 },
        { id: 2, name: 'Bread', price: 50 },
        { id: 3, name: 'Cheese', price: 200 },
        { id: 4, name: 'Butter', price: 150 },
        ];
    const productsSorted = products.sort((a,b)=>a.price-b.price)

  return (
    <div>
       <ul>
            {productsSorted.map((elem, ind)=>{
                return <li key={`stud-${ind}`}>{elem.name} - {elem.price} </li>
            })}
       </ul>
        
    </div>
  )
}

export default Main