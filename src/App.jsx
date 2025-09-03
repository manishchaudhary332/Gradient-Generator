import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const [num, setNum] = useState(12)
  const [type, settype] = useState("linear")
  const [gradient, setgradient] = useState([])
  const [copiedIndex, setCopiedIndex] = useState(null)

  const getHexColorCode = () => {
    const rgb = 255 * 255 * 255;
    const random = Math.random() * rgb
    const int = Math.floor(random)
    const hexCode = int.toString(16)
    const colorHex = hexCode.padEnd(6, "0")
    return `#${colorHex}`
  }

  const gredientGenetor = () => {
    const colors = []
    for (let i = 0; i < num; i++) {
      const color1 = getHexColorCode()
      const color2 = getHexColorCode()
      const degree = Math.floor(Math.random() * 360)
      const degreestring = `${degree}deg`
      if (type === 'linear') {
        colors.push({
          gradient: `linear-gradient(${degreestring},${color1},${color2})`,
          css: `background:linear-gradient(${degreestring},${color1},${color2})`
        })
      } else {
        colors.push({
          gradient: `radial-gradient(circle,${color1},${color2})`,
          css: `background:radial-gradient(${degreestring},${color1},${color2})`
        })
      }
    }
    setgradient(colors)
    setCopiedIndex(null)
  }

  const onCopy = (css, index) => {
    navigator.clipboard.writeText(css)
    toast.success("Copy Done")
    setCopiedIndex(index)
  }

  useEffect(() => {
    gredientGenetor()
  }, [num, type])

  return (
    <div className='min-h-screen bg-white py-6 px-4'>
      <div className='max-w-6xl mx-auto'>
        
        
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
          <h1 className='text-2xl sm:text-3xl font-bold text-center sm:text-left'>
            Gradient Generator ({num}) {type}
          </h1>

          <div className='flex flex-col sm:flex-row gap-3'>
            <input
              value={num}
              className='border border-slate-300 bg-white rounded-lg w-full sm:w-[100px] p-2'
              placeholder='12'
              onChange={(e) => setNum(Number(e.target.value))}
              type="text"
            />
            <select
              value={type}
              onChange={(e) => settype(e.target.value)}
              className='border border-slate-300 bg-white rounded-lg w-full sm:w-[120px] p-2'
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>
            <button
              className='p-2 bg-green-600 rounded-lg text-white font-semibold'
              onClick={() => gredientGenetor()}
            >
              Generate
            </button>
          </div>
        </div>

       
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5 mt-4'>
          {gradient.map((item, index) => {
            return (
              <div
                key={index}
                className='h-[180px] rounded-xl relative shadow-md'
                style={{ background: item.gradient }}
              >
                {copiedIndex === index
                  ? <button className='absolute right-1 bottom-1 rounded text-white text-[18px]'>✅</button>
                  : <button
                      onClick={() => onCopy(item.css, index)}
                      className='bg-black/50 hover:bg-black absolute right-1 bottom-1 rounded text-white text-[12px] p-1'
                    >
                      COPY
                    </button>}
              </div>
            )
          })}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
