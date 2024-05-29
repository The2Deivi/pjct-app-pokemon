import { useEffect } from "react"
import useFetch from "../../hooks/useFetch"
import './styles/SelectType.css'

const SelectType = ({ setTypeSelected }) => {

  const [ types, getTypes ] = useFetch()

  useEffect(() => {
    const url = 'https://pokeapi.co/api/v2/type?offset=0&limit=100'
    getTypes(url)
  }, [])
  
  const handleChange = e => {
    setTypeSelected(e.target.value)
  }

  return (
    <select className="select" onChange={handleChange}>
      <option className="select__option" value='allPokemons'>All pokemons</option>
      {
        types?.results.map(typeInfo => (
          <option className="select__option-name" key={typeInfo.url} value={typeInfo.url}>{typeInfo.name}</option>
        ))
      }
    </select>
  )
}

export default SelectType