import React from 'react'
import "./Table.css"
import TBody from './TBody'
import THead from './THead'
import { AppContext } from '../../App'
import EditLayer from '../EditLayer/EditLayer'

export const EditContext = React.createContext(null)

function Table() {

    const {data, setData} = React.useContext(AppContext)
    const [editLayerId, setEditLayerId] = React.useState(null)

    // console.log(editLayerId) 
    // editLayerId is accessed in TBody.js to set EditLayerID by editbutton click event
  return (
    <div className='Table'>
        <EditContext.Provider value={{editLayerId, setEditLayerId}}>
        <table>
            <thead>
                <THead />
            </thead>

            <tbody>
                {data.map((row)=>(
                    <React.Fragment key={row.id}>
                        {editLayerId === row.id ? 
                            <EditLayer row={row} /> 
                            : 
                            <TBody row={row} /> }
                    </React.Fragment>
                ))}
            </tbody>
        </table>
        </EditContext.Provider>

    </div>
  )
}

export default Table

