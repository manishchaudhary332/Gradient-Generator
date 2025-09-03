import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

const App = () => {
  const [num, setNum] = useState(12)
  const [type, settype] = useState("linear")
  const [gradient, setgradient] = useState([])
  const [copyIndex, setcopyIndex] = useState(null)


  const getHexColorCode =()=>{
    const rgb = 255*255*255;
    const random = Math.random() * rgb
    const int = Math.floor(random)
    const hexCode = int.toString(16)
    const colorHex = hexCode.padEnd(6,"0")   
    
    return `#${colorHex}`
  }

  const gredientGenetor =()=>{
    const colors = []
        for(let i=0; i<num; i++){
          const color1 = getHexColorCode()
          const color2 = getHexColorCode()
          const degree = Math.floor(Math.random() * 360)
          const degreestring = `${degree}deg`
          if(type === 'linear'){
            colors.push({
            gradient:`linear-gradient(${degreestring},${color1},${color2})`,
            css:`background:linear-gradient(${degreestring},${color1},${color2})`
          })
          }else{
            colors.push({
            gradient:`radial-gradient(circle,${color1},${color2})`,
            css:`background:radial-gradient(${degreestring},${color1},${color2})`
          })
          }
          
        }
        setgradient(colors)
        setcopyIndex(null)
        
  }

  const onCopy = (css,index)=>{
    navigator.clipboard.writeText(css)
    toast.success("Copy Done")
    setcopyIndex(index)
  }

  useEffect(()=>{
      gredientGenetor()
  },[num,type])

  return (
    <div className='min-h-screen bg-white py-12'>
      <div className='w-9/12 mx-auto'>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-bold'>Gradient Generator {num} {type}</h1>
        <div className='flex gap-4'>
            <input 
            value={num}
            className='border border-slate-300 bg-white rounded-lg w-[100px] p-2'
            placeholder='12'
            onChange={(e)=>setNum(Number(e.target.value))}
             type="text" />
             <select value={type} onChange={(e)=>settype(e.target.value)} className='border border-slate-300 bg-white rounded-lg w-[100px] p-2' >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
             </select>
             <button className='p-2 bg-green-600 rounded-2xl text-white' onClick={()=>gredientGenetor()}>Generate</button>
        </div>
      </div>

      <div className='grid grid-cols-4 gap-4 p-5 mt-2 '>
            {gradient.map((item,index)=>{
              return <div key={index} className='h-[180px] rounded-xl relative 'style={{background:item.gradient}}>
           {copyIndex === index 
                ?<button className=' absolute right-1 bottom-1 rounded text-white text-[18px] '>✅</button>
                : <button onClick={()=>onCopy(item.css,index)} className='bg-black/50 hover:bg-black absolute right-1 bottom-1 rounded text-white text-[12px] p-1 '>COPY</button>
           }
            </div>
            })}
      </div>

      </div>
      <ToastContainer/>

    </div>
  )
}

export default App